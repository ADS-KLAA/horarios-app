 interface DayColProps {
    hours: string[],
    isToday?: boolean,
    aulas:any 
}

function DayCol({hours,aulas} : DayColProps) {
  return (
    <div className="flex-grow relative pt-3 min-h-min">

    <ul className={`  flex flex-col min-h-min rounded-lg bg-transparent text-primaryBlack`}>
        {hours.map((index)=> (
          <div key={index} className="w-full border-t border-t-slate-300 min-h-32 ">
                
            </div>        
        ))} 
    </ul>
        {aulas.length > 0 && aulas.map(() => {
          const duracao = 45;
          const percent = (duracao * 128 / 60);
          const top =(150 * 128 / 60) + 12;
          return (
              <div style={{height:`${percent}px`,top:`${top}px`}} className={`absolute  overflow-clip  p-3 w-full bg-blue-700 rounded-2xl shadow-lg left-0`}>
                <p className="text-white overflow-hidden">EUVI - Experiência do utiliador e visualização de dados</p>
              </div>
        )})}

    </div>
  )
}
export default DayCol