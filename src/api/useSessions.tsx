import { useQuery } from "@tanstack/react-query";
import { Aula } from "../types";

const STALE_SECONDS = 240;


const fetchSessions = async () : Promise<Aula[]> => {
    return [
        {
            uc:"EUVI",turma:"LEI-1",id:"1",
            inicio: new Date().toDateString(),dia: new Date().toISOString() ,fim: new Date().toDateString(),curso:"LEI",confirmados:[{ye:"ye"}],inscritos:1,
        }
    ]
}

export const useSessions = () => {
    return useQuery({
        queryKey:['sessions'],
        queryFn: () => fetchSessions(),
        staleTime:1000*STALE_SECONDS
    });
}; 

