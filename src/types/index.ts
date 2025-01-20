export interface ClassSession {
    curso:string,
    uc:string,
    class:string,
    startTime:Date,
    endTime:Date,
    attendance?:number
}

export interface Aula {
    id: string; // Unique identifier for the Aula
    curso: string; // Course name or identifier
    uc: string; // Subject or "Unidade Curricular"
    turma: string; // Class identifier
    inscritos: number; // Number of enrolled students
    confirmados: unknown[]; // List of confirmed attendees (can be empty)
    diaSemana: string; // Day of the week (e.g., "Ter" for Tuesday)
    inicio: string; // Start time in HH:mm:ss format
    fim: string; // End time in HH:mm:ss format
    dia: string; // Date in MM-DD-YY format
    sala: string | null; // Room (can be null)
};