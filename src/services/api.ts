// src/api/index.ts
import axiosInstance from "../utils/axiosConfig";

export const getCompanies = async () => {
    const response = await axiosInstance.get('/empresas');
    return response.data;
}

export const addCompany = async (formData: any) => {
    const response = await axiosInstance.post('/empresas', formData);
    return response.data;
}

export const deleteCompany = async (id:number) => {
    const response = await axiosInstance.delete(`/empresas/${id}`);
    return response.data;
}

export const getApplications = async () => {
    const response = await axiosInstance.get('/applications');
    return response.data;
}
export const addApplications = async (newApplication: {name:string}) => {
    const response = await axiosInstance.post('/applications', newApplication);
    return response.data;
}
export const deleteApplication = async (id:number) => {
    const response = await axiosInstance.delete(`/applications/${id}`);
    return response.data;
}


export const getUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
}


export const getModules = async () => {
    const response = await axiosInstance.get('/modules');
    return response.data;
}

export const addModule = async (newModule: { name: string, applications_id: number }) => {
    const response = await axiosInstance.post('/modules', newModule);
    return response.data;
}

export const updateModule = async (id: string, moduleData: { name: string; applications_id: number }) => {
    const response = await axiosInstance.put(`/modules/${id}`, moduleData);
    return response.data;
  };

export const deleteModule = async (id: number) => {
    const response = await axiosInstance.delete(`/modules/${id}`);
    return response.data;
}