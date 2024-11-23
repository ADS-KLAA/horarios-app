interface WeekChangerProps{
    currDate:Date,
    changeDate:(date:Date) => void
}

function WeekChanger({currDate,changeDate} : WeekChangerProps) {

    function forwardOrBackAWeek(signum : -1 | 1) {
        let newDate = new Date(currDate);
        newDate.setDate(newDate.getDate() + signum*7);
        changeDate(newDate);
    }

  return (
    <section className="h-10 flex gap-2">
        <button onClick={()=> forwardOrBackAWeek(-1)} className="bg-primaryGray w-12  font-semibold text-lg rounded-xl">
            {"<"}
        </button>
        <button onClick={()=> changeDate(new Date())} className="bg-primaryGray px-6 font-semibold text-md rounded-xl">
            {"Today"}
        </button>
        <button onClick={()=> forwardOrBackAWeek(1)} className="bg-primaryGray w-12 text-lg font-semibold rounded-xl">
            {">"}
        </button>
    </section>
  )
}
export default WeekChanger