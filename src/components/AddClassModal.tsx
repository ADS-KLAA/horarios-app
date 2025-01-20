import { useState} from "react"
import {useCursos} from "../api/useCursos.ts";
import {useDisciplinas} from "../api/useDisciplinas.ts";
import {useTurmas} from "../api/useTurmas.ts";
import {useMutation} from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";


function AddClassModal({onClose} : {onClose: () => void}) {


  //type Option = {name:string, value:string | number}

  const [course, setCourse] = useState<string | null>(null);
  const { data: cursos, isLoading: isLoadingCursos } = useCursos();



  const { data: disciplinas, isLoading: isLoadingDisciplinas } = useDisciplinas(course || "");

  const [uc, setUc] = useState<string | null>(null);

  const { data: turmas, isLoading: isLoadingTurmas } = useTurmas(uc || "");

  const [selectedClass, setSelectedClass] = useState<string | null>(null);


  async function registerClass() {

    const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Unauthorized");

        const response = await fetch(API_BASE_URL + "/professor/register/aulas", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            curso: course,
            uc: uc,
            turma: selectedClass,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to register class: ${response.statusText}`);
        }

        return await response.json();
  }


  const {mutateAsync} = useMutation({ mutationFn: registerClass });

  const handleAdd = async () => {
    try {
      const response = await mutateAsync()
      console.log(response);
    } catch (error) {
      console.error(error)
    } finally {
      console.log('done')
    }
  }



  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <section
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Choose a Your Class</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="dropdown1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course
            </label>
            <select disabled={isLoadingCursos} onChange={(e) => setCourse(e.target.value)}
              id="dropdown1"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option 1</option>
              {cursos?.map((curso,index) => (
                <option key={index} value={curso}>
                  {curso}
                </option>
              ))}
            </select>
          </div>

         {course && !isLoadingDisciplinas && <div>
            <label
              htmlFor="dropdown2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Curricular Unit
            </label>
            <select
              onChange={(e) => setUc(e.target.value)}
              id="dropdown2"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option 2</option>
              {disciplinas?.map((disc) => (
                <option key={disc} value={disc}>
                  {disc}
                </option>
              ))}
            </select>
          </div>}

         {uc && !isLoadingTurmas && <div>
            <label
              htmlFor="dropdown3"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              onChange={(e) => setSelectedClass(e.target.value)}
              id="dropdown3"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option 3</option>
              {turmas?.map((turma,index) => (
                <option key={index} value={turma}>
                  {turma}
                </option>
              ))}
            </select>
          </div>}
        </div>
        <div className="mt-6 flex gap-4 justify-end">
          <button
            className="bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </section>

    </main>
  )
}
export default AddClassModal