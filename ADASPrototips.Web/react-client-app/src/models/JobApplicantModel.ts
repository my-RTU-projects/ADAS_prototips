import { JobVacancyResponse } from "./JobVacancyResponse";

export interface JobApplicantModel {
    id: number;
    vacancyId: number;
    positionId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    skills: string;
    salary: number;
    birthDay: string;
    response: JobVacancyResponse;
}