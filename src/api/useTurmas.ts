import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const fetchTurmas = async (disciplina: string): Promise<string[]> => {
  const token = localStorage.getItem("token"); // Retrieve token from storage
  if (!token) throw new Error("Unauthorized");

 // const url = new URL(`${API_BASE_URL}/aula/turmas`, window.location.origin);
 // url.searchParams.append("disciplina", disciplina); // Add query parameter

  const url = `${API_BASE_URL}/aula/turmas?disciplina=${encodeURIComponent(disciplina)}`
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch turmas: ${response.statusText}`);
  }

  const data = await response.json();
  return data.turmas;
};

export const useTurmas = (disciplina:string) => {
    return useQuery<string[], Error>({
        queryKey:['turmas',disciplina],
        queryFn: () => fetchTurmas(disciplina),
        enabled:!!disciplina,
        staleTime:5 * 60 * 1000
    });
};
