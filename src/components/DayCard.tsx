import { useMemo } from "react"

interface DayCardProps {
    date:Date
}

function DayCard({date} : DayCardProps) {
    const isToday = useMemo(() => date.setHours(0,0,0,0) == new Date().setHours(0,0,0,0) ,[date])
  return (
    <li 
    className={`shadow-sm py-4 flex-grow flex flex-col items-center justify-center max-w-44 min-w-20 rounded-lg ${isToday ? 'bg-primaryBlack text-gray-50' : 'bg-primaryGray text-primaryBlack'}`}>
        <span className="w-full text-center text-lg">{date.toLocaleDateString("en-En", { weekday: 'long' })}</span>
        <span className="font-bold text-2xl"> {date.getDate()} </span>
    </li>
  )
}
export default DayCard