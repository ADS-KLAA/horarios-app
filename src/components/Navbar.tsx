import { useLocation, useNavigate } from "react-router"
import CalendarSVG from "./CalendarSVG"
import CalendarFillSVG from "./CalendarFilledSVG";
import ClassSVG, { ClassFiledSVG } from "./ClassSVG";
import UserCard from "./UserCard";

const pages = [
  {
    name:"Calendar",
    icon:<CalendarSVG className="h-6"/>,
    selectedIcon:<CalendarFillSVG className="h-6"/>,
    navigatesTo:"/"
  },
  {
    name:"Classes",
    icon:<ClassSVG className="h-6"/>,
    selectedIcon:<ClassFiledSVG className="h-6"/>,
    navigatesTo:"/turmas"
  }
]


function Navbar() {

  const {pathname} = useLocation();
  const navigate= useNavigate();
  return (
    <aside className="w-1/4 h-full flex flex-col justify-start px-6 lg:px-8 py-6 items-center">
        <h1 onClick={()=> navigate("/")} className="w-full h-36 pt-12 pl-0 flex items-center text-3xl font-semibold ">Attendance</h1>
        <hr className="h-0.5 shadow-xl  bg-gray-300 w-full"></hr>
        <span className="mt-10 w-full pl-6 text-gray-400 text-lg mb-6">GENERAL</span>
        <ul className="flex flex-col flex-grow  w-full gap-2 items-center">
            {pages.map((page) => (
              <li onClick={() => navigate(page.navigatesTo)} 
              className={`flex w-full text-primaryBlack  rounded-lg py-2 font-medium px-4 justify-start gap-4 text-lg 
                ${page.navigatesTo === pathname && "shadow-md bg-secondaryGray text-blue-700"}
                hover:shadow-md hover:bg-secondaryGray hover:text-blue-700 transition-all duration-200 ease-in-out cursor-pointer
                `}
              >
                  {page.navigatesTo === pathname ? page.selectedIcon : page.icon}
                  <span>{page.name}</span>
              </li>
            )
          )}
          <UserCard/>
        </ul>
    </aside>
  )
}
export default Navbar