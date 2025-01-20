import { useState } from "react"
import AddIcon from "../components/AddIcon"
import { ClassFiledSVG } from "../components/ClassSVG"
import AddClassModal from "../components/AddClassModal";

function Turmas() {

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
          <li className="w-full relative h-32 rounded-xl bg-white px-4 py-5 shadow-sm" >
              <span className="bock font-semibold text-lg ">Experiência do utilizador e visualização de informação</span>
              <span className="block font-semibold mt-2 text-gray-600">LEI</span>
              <figure className="mt-4">
              <svg className="w-5 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 7v5h3m6 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
              </svg>
              </figure>
              <figure className="w-12 flex items-center h-6 absolute right-4 bottom-2  ">
                20          
                <ClassFiledSVG className="h-6 inline-block ml-1" />
              </figure>
          </li>
        </ul>
        {/* <ComboBox label="Matita" options={["cao","gato","tartaruga"]}/> */}
      </section>
      {/* <section className="border bg-opacity-80 w-1/4 border-gray-300 border-opacity-40 rounded-[28px] h-full  flex flex-col bg-secondaryGray shadow-sm">

      </section> */}
    </main>
  )
}
export default Turmas