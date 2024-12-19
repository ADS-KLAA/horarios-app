import { useQuery } from "@tanstack/react-query";
import { ClassSession } from "../types";

const STALE_SECONDS = 240;


const fetchSessions = async () : Promise<ClassSession[]> => {
    return [
        {
            uc:"EUVI",class:"LEI-1",
            startTime: new Date(),endTime: new Date(),curso:"LEI"
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

