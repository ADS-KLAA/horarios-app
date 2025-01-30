import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";


export const fetchCursos = async (): Promise<string[]> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Unauthorized");

  const response = await fetch(`${API_BASE_URL}/aula/cursos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cursos: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data.cursos);
  return data.cursos;
};


export const useCursos = () => {
    return useQuery({
        queryKey:['cursos'],
        queryFn: () => fetchCursos(),
        staleTime:Infinity
    });
};
