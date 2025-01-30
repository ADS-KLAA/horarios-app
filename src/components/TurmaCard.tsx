import { ClassFiledSVG } from "./ClassSVG"

interface TurmaCardProps {
    name:string,
    curso:string,
    uc:string,
    studentCount:number
}



function TurmaCard({name,uc,curso,studentCount} : TurmaCardProps) {
  return (
    <li className="w-full relative h-32 rounded-xl bg-white px-4 py-5 shadow-sm" >
    <span className="bock font-semibold text-lg ">{name}</span>
    <span className="block font-semibold mt-2 text-gray-600">{uc}</span>
    <span className="block font-semibold mt-1 text-gray-600">{curso}</span>

    <figure className="w-12 flex items-center h-6 absolute right-4 bottom-2  ">
      {studentCount}
      <ClassFiledSVG className="h-6 inline-block ml-1" />
    </figure>
</li>
  )
}
export default TurmaCard