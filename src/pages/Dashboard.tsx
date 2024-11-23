import CalendarSVG from "../components/CalendarSVG"
import DayCard from "../components/DayCard";

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
const dates = getRestOfWeekDates(today);

function Dashboard() {

  return (
    <main 
    className="border bg-opacity-80 border-gray-300 border-opacity-40 rounded-[28px] h-full flex-grow bg-secondaryGray shadow-sm">
        <header className="bg-white w-full px-10 h-48 flex flex-col items-center rounded-t-[28px]">
            <div className="w-full flex items-center h-16">
                <h1 className="text-2xl">{today.toLocaleDateString( "en",{ month: 'long', year: 'numeric' })}</h1>
            </div>
            <ul className="flex justify-around flex-grow pb-6 gap-2 w-full"> 
                <CalendarSVG className="text-primaryBlack w-16 px-4 "/>
                {dates.map((date) =>  <DayCard date={date}/>)}
            </ul>
        </header>
    </main>
  )
}
export default Dashboard