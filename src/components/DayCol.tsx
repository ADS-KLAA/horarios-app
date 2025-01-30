import { useState } from "react";
import { Aula } from "../types";
import ClassModal from "./ClassModal";

 interface DayColProps {
    hours: string[],
    isToday?: boolean,
    aulas: Aula[] 
}

function DayCol({hours,aulas} : DayColProps) {

  const [selectedClass, setSelectedClass] = useState<Aula | null>(null);

  return (
    <div className="flex-grow relative pt-3 min-h-min">

    <ul className={`  flex flex-col min-h-min rounded-lg bg-transparent text-primaryBlack`}>
        {hours.map((index)=> (
          <div key={index} className="w-full border-t border-t-slate-300 min-h-32 ">
                
            </div>        
        ))} 
    </ul>
        {aulas.length > 0 && aulas.map((aula) => {
          
          const dur = Math.abs( new Date(`1 ${aula.fim}`).getTime() - new Date(`1 ${aula.inicio}`).getTime() ) / 60000; 
          const durTop = (new Date(`1 ${aula.inicio}`).getTime() - new Date(`1 ${hours[0]}`).getTime()) / 60000;
          console.log(durTop);
          const percent = (dur * 128 / 60);
          const top =  (durTop * 128 / 60) + 12;
          return (
              <div onClick={() => setSelectedClass(aula)} style={{height:`${percent}px`,top:`${top}px`}} className={`absolute hover:scale-105 ease-in-out duration-300 overflow-clip  p-3 w-full bg-blue-700 rounded-2xl shadow-lg left-0`}>
                <p className="text-white overflow-hidden">{aula.uc}</p>
              </div>
        )})}
     {selectedClass && <section onClick={() => setSelectedClass(null)} className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <ClassModal class={selectedClass}/>
      </section>}
    </div>
  )
}
export default DayCol