import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const fetchDisciplinas = async (curso:string): Promise<string[]> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Unauthorized");

  const response = await fetch(`${API_BASE_URL}/aula/disciplinas?curso=${curso}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch subjects: ${response.statusText}`);
  }

  const data = await response.json();
  return data.disciplinas;
};


export const useDisciplinas = (curso:string) => {
    return useQuery({
        queryKey:['disciplinas',curso],
        queryFn: () => fetchDisciplinas(curso),
        enabled:!!curso,
        staleTime:5 * 60 * 1000
    });
};
