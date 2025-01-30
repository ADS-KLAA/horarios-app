import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Aula } from "../types"
import CalendarSVG from "./CalendarSVG"
import ClassSVG from "./ClassSVG"
import QRCodeSVG from "./QRCodeSVG"

function ClassModal({class:aula} : {class:Aula}) {


    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

    const queryClient = useQueryClient();
    const fetchQRCode = async (id:string): Promise<string> => {
        const token = localStorage.getItem("authToken");

        const response = await fetch(`${API_BASE_URL}/qrcode/generate/${id}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "	image/png",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch QRCode: ${response.statusText}`);
        }

        const blob = await response.blob(); 
        return URL.createObjectURL(blob); 
    };
    
    const {mutate, isPending} = useMutation({
        mutationFn:() => fetchQRCode(aula.id),
        onSuccess:(data) => queryClient.setQueryData(['qrcode',aula.id],data)
    });

    const cachedData = queryClient.getQueryData(["qrcode", aula.id]) as string;


  return (
    <div
    className="bg-white rounded-lg shadow-sm p-6 w-1/2 w-min-[700px]"
    onClick={(e) => e.stopPropagation()}
    >
    
    <header className="flex justify-between mb-20 items-start">
        <section>
            <span className="bock font-semibold text-xl ">{aula.uc}</span>
            <span className="block font-semibold mt-2 text-gray-600">{aula.curso}</span>
            <span className="block font-semibold text-gray-600">{aula.turma}</span>
            <div className="inline-flex mt-3 gap-2"><CalendarSVG className="text-gray-600 w-4"/> <span>{new Date(aula.dia).toDateString().slice(0,-5)} {new Date(`1 ${aula.inicio}`).toTimeString().slice(0,5)}</span> </div>
        </section>
        <section className="flex flex-col justify-end">
            <span className="text-xl">Confirmações</span>
            <figure className="inline-flex justify-end items-center text-xl gap-2"> 
                <ClassSVG className="w-8 h-8"/> <span className="text-blue-700">{aula.confirmados?.length}</span> / {aula.inscritos} 
            </figure>
            <span className="text-xl mt-6">Presenças</span>
            <figure className="inline-flex justify-end items-center text-xl gap-2"> 
                <ClassSVG className="w-8 h-8"/> <span className="text-blue-700">{aula.presencas?.length}</span> / {aula.confirmados?.length} 
            </figure>
        </section>
    </header>

    <section className="flex justify-center mb-12">
        {!cachedData && <button onClick={() => mutate()} disabled={isPending} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            QR Code
            <QRCodeSVG className="h-4 w-4 text-white ml-2"/>
          </button>}

          {!!cachedData && <img className="scale-125" src={cachedData} alt="Generated QR Code" />}
    </section>

  </div>
  )
}
export default ClassModal