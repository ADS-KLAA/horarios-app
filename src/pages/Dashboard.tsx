import { useMemo, useState } from "react";
import CalendarSVG from "../components/CalendarSVG"
import DayCard from "../components/DayCard";
import DayCol from "../components/DayCol";
import WeekChanger from "../components/WeekChanger";
import RangeSelector from "../components/RangeSelector";
import { useSessions } from "../api/useSessions";

const today = new Date();

function getRestOfWeekDates(today : Date) {
    const restOfWeek = [];
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Loop through the rest of the days of the week
    for (let i = 0; i < 6; i++) {
        const nextDate = new Date(today); // Clone the startDate
        nextDate.setDate(today.getDate() - (dayOfWeek-1) + i);
        restOfWeek.push(nextDate);
    }
    return restOfWeek;
}




function Dashboard() {

  const {data:aulas,isLoading} = useSessions();

  const [weekreference,setWeekreference] = useState<Date>(today);   
  const dates = useMemo(() =>  getRestOfWeekDates(weekreference),[weekreference]); 
  const [range, setRange] = useState([8, 22]); 
  const hours = useMemo(() => Array.from({ length: range[1] - range[0] + 1 }, (_, i) => `${range[0] + i}:00`) ,[range]) ; // Generate hours from 8:00 to 22:00
 /*const dayProgress = useMemo(()=> {
    if(today.getHours() < range[0] || today.getHours() > range[1] || range[0] === range[1]) return 0;
    return ((today.getHours()*60 +today.getMinutes()) / ((range[1] - range[0])*60) ) *( 128+28);
  },[range,today]);
  console.log(Number.parseInt(dayProgress.toFixed(0)));*/

  return !isLoading && (
    <main 
    className="border bg-opacity-80 border-gray-300 border-opacity-40 rounded-[28px] h-full flex-grow flex flex-col bg-secondaryGray shadow-sm">
        <header className="bg-white w-full shadow-sm px-10  flex flex-col items-center rounded-t-[28px]">
            <div className="w-full flex items-center h-16 justify-between">
                <h1 className="text-2xl w-1/5 font-semibold">{weekreference.toLocaleDateString( "en",{ month: 'long', year: 'numeric' })}</h1>
                <WeekChanger currDate={weekreference} changeDate={setWeekreference}/>
                <RangeSelector range={range} onRangeChange={setRange} />
            </div>
            <ul className="flex justify-around flex-grow pb-6 gap-2 w-full"> 
                <CalendarSVG className="text-primaryBlack w-20 px-7 "/>
                {dates.map((date,index) =>  <DayCard key={index} date={date}/>)}
            </ul>
        </header>
        <section className="pl-10 pr-5 pt-6 flex-grow overflow-y-auto flex relative justify-around  w-full ">
            <aside className="w-20">
                {hours.map((hour,index) =>
                    (
                        <div key={index} className="h-32">{hour}</div>
                    )
                )}
            </aside>
            {dates.map((_,index) => ( <DayCol key={index} aulas={aulas!.filter((aula) => aula.startTime.getDate() === _.getDate() && aula.startTime.getMonth() === _.getMonth())} hours={hours} isToday={today.getDay()===index+1}/> ))}
            {/*dayProgress > 0 && <hr className={`absolute w-full h-2 bg-black top-[${Number.parseInt(dayProgress.toFixed(0))}px]`}></hr>*/}
        </section>
    </main>
  )
}
export default Dashboard