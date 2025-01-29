import { useMemo, useState } from "react"
import AddIcon from "../components/AddIcon"
import AddClassModal from "../components/AddClassModal";
import { useAuth } from "../auth/AuthProvider";
import { Aula } from "../types";
import TurmaCard from "../components/TurmaCard";

function Turmas() {

  const {session} = useAuth();
  const seen = new Set<string>();
  const turmas = useMemo(() => {
    
    return (session?.aulas ?? [] as Aula[])
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
  }
    
    ,[session])

    console.log(turmas)

  const [addTurmaModalOpen, setAddTurmaModaOpen] =useState(false);
  return (
    <main className="flex items-center h-full gap-2 flex-grow justify-center">
      {addTurmaModalOpen && <AddClassModal onClose={() => setAddTurmaModaOpen(false)}/>}
      <section className="border bg-opacity-80 border-gray-300 border-opacity-40 rounded-[28px] h-full flex-grow flex flex-col bg-secondaryGray shadow-sm">
        <header className="h-20 bg-white shadow-sm px-10 flex justify-between items-center rounded-t-[28px] w-full">
        <h1 className="text-2xl w-1/5 font-semibold">Classes</h1>
          <button onClick={() => setAddTurmaModaOpen(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            <AddIcon className="h-8 w-8 text-white -ml-3"/>
            Add Class
          </button>
        </header>
        <ul className="w-full flex flex-col gap-6 items-center py-5 px-8">
        {turmas.length > 0 && turmas.map(({uc,curso,studentCount,turma}) => <TurmaCard uc={uc} name={turma} curso={curso} studentCount={studentCount ?? 0} />)}
        </ul>
        {/* <ComboBox label="Matita" options={["cao","gato","tartaruga"]}/> */}
      </section>
      {/* <section className="border bg-opacity-80 w-1/4 border-gray-300 border-opacity-40 rounded-[28px] h-full  flex flex-col bg-secondaryGray shadow-sm">
      
      </section> */}
    </main>
  )
}
export default Turmas