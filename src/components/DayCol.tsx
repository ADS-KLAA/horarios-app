interface DayColProps {
    hours: string[],
    isToday?: boolean
}

function DayCol({hours} : DayColProps) {
  return (
    <ul className={`pt-3 flex-grow flex flex-col min-h-min rounded-lg bg-transparent text-primaryBlack`}>
        {hours.map(()=> (
            <div className="w-full border-t border-t-slate-300 min-h-32">
                
            </div>        
        ))} 
    </ul>
  )
}
export default DayCol