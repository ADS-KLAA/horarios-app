import { useEffect, useState } from "react"
import AddIcon from "../components/AddIcon"
import AddClassModal from "../components/AddClassModal";
import { Aula } from "../types";
import TurmaCard from "../components/TurmaCard";
import { useQueryClient } from "@tanstack/react-query";

interface TurmaInfo {
  turma:string,uc:string,curso:string,studentCount:number
}

function Turmas() {

  const queryClient = useQueryClient();

  const [turmas, setTurmas] = useState<TurmaInfo[]>([]);

  const aulasList = ((queryClient.getQueryData(['aulas']) ?? []) as Aula[])

  useEffect(() => {
    const seen = new Set<string>();
    const turmasList =  aulasList
          .filter(aula => {
              const key = `${aula.turma}-${aula.uc}-${aula.curso}`;
              if (seen.has(key)) {
                  return false;
              }
              seen.add(key);
              return true;
          })
          .map(aula => ({
              turma: aula.turma,
              uc: aula.uc,
              curso: aula.curso,
              studentCount: aula.inscritos,
          }));
    setTurmas(turmasList);
  }, [aulasList,queryClient])



  const [notification, setNotification] =useState<null | string>(null);
  const [addTurmaModalOpen, setAddTurmaModaOpen] =useState(false);
  return (
    <main className="flex items-center h-full gap-2 flex-grow justify-center">
      {addTurmaModalOpen && <AddClassModal onClose={(success?:boolean) => {
        setAddTurmaModaOpen(false);
        if(!!success){
          setNotification("Added New Class Successfuly");
          setTimeout(() => setNotification(null),3000);
        }
        }}/>}
      <section className="border bg-opacity-80 border-gray-300 border-opacity-40 rounded-[28px] h-full flex-grow flex flex-col bg-secondaryGray shadow-sm">
        <header className="h-20 bg-white shadow-sm px-10 flex justify-between items-center rounded-t-[28px] w-full">
        <h1 className="text-2xl w-1/5 font-semibold">Classes</h1>
          <button onClick={() => setAddTurmaModaOpen(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            <AddIcon className="h-8 w-8 text-white -ml-3"/>
            Add Class
          </button>
        </header>
        <ul className="w-full flex flex-col gap-6 overflow-y-scroll items-center py-5 px-8">
        {turmas.length > 0 &&  turmas.map(({uc,curso,studentCount,turma}) => <TurmaCard key={turma} uc={uc} name={turma} curso={curso} studentCount={studentCount ?? 0} />) }
        </ul>
      </section>
        {notification != null && <div className="absolute bottom-2 right-8 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 " role="alert">
          <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Success!</span> {notification}
          </div>
        </div>}
    </main>
  )
}
export default Turmas