import axiosInstance from "../utils/axiosConfig";


export const getCompanies = async () => {
    const response = await axiosInstance.get('/empresas');
    return response.data
    
}

export const addCompany = async () => {
    const response = await axiosInstance.post('/empresas');
    return response.data
    
}