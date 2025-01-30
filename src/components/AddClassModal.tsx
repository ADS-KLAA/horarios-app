import { useEffect, useState} from "react"
import {useCursos} from "../api/useCursos.ts";
import {useDisciplinas} from "../api/useDisciplinas.ts";
import {useTurmas} from "../api/useTurmas.ts";
import {useMutation} from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider.tsx";
import { useNavigate } from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";


function AddClassModal({onClose} : {onClose: (success?:boolean) => void }) {

  const {refreshSession} = useAuth();

  const [course, setCourse] = useState<string | null>(null);
  const { data: cursos, isLoading: isLoadingCursos } = useCursos();

  const { data: disciplinas, isLoading: isLoadingDisciplinas } = useDisciplinas(course || "");

  const [uc, setUc] = useState<string | null>(null);

  const { data: turmas, isLoading: isLoadingTurmas } = useTurmas(uc || "");

  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    if(cursos && cursos.length > 0){
      setCourse(cursos[0]);
    }
  },[cursos])

  useEffect(() => {
    if(disciplinas && disciplinas.length > 0){
      setUc(disciplinas[0]);
    }
  },[disciplinas])

  useEffect(() => {
    if(turmas && turmas.length > 0){
      setSelectedClass(turmas[0]);
    }
  },[turmas])



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

  const nav = useNavigate();

  const {mutate, isPending} = useMutation({ mutationFn: registerClass, onSettled: async () => {
    await refreshSession();
    console.log("refreshed")
    onClose(true);
    console.log("navi")
    nav("/turmas");
  }, });


  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <section
        className="bg-white relative rounded-lg shadow-lg p-6 min-w-96 w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Find Your Class</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cursodrop"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course
            </label>
            {
            !isLoadingCursos ? <select disabled={isLoadingCursos} onChange={(e) => {
              setCourse(e.target.value);
              setUc(null);
              setSelectedClass(null);
            }}
              id="cursodrop"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cursos?.map((curso,index) => (
                <option key={index} value={curso}>
                  {curso}
                </option>
              ))}
            </select> :    <div className="fixed animate-spin ease border-t-4 border-blue-500 rounded-full h-4 w-4"></div>
            }
          </div>

         {course && ( !isLoadingDisciplinas ? <div>
            <label
              htmlFor="ucdrop"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Curricular Unit
            </label>
            <select
              onChange={(e) => {
                setUc(e.target.value);
                setSelectedClass(null);
              }}
              id="ucdrop"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {disciplinas?.map((disc) => (
                <option key={disc} value={disc}>
                  {disc}
                </option>
              ))}
            </select>
          </div>
          :    
           <div className="fixed animate-spin ease border-t-4 border-blue-500 rounded-full h-4 w-4"></div>
        )}

         {uc && (!isLoadingTurmas ? <div>
            <label
              htmlFor="turmadrop"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              onChange={(e) => setSelectedClass(e.target.value)}
              id="turmadrop"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {turmas?.map((turma,index) => (
                <option key={index} value={turma}>
                  {turma}
                </option>
              ))}
            </select>
          </div> :
          <div className="fixed animate-spin ease border-t-4 border-blue-500 rounded-full h-4 w-4"></div>
          )}
        </div>
        <div className="mt-6 flex gap-4 justify-end">
          <button
            className="bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => mutate()}
          >
            Add
          </button>
        </div>

        {isPending && <div className="absolute top-0 w-full h-full flex items-center justify-center left-0">
          <div className="animate-spin ease border-t-4 border-blue-500 rounded-full h-12 w-12"></div>
        </div>}
      </section>

    </main>
  )
}
export default AddClassModal