import { toast } from 'react-toastify';

export const showError = (error) =>{
    if(error != null && error.name === "AxiosError"){
        toast("Invalid Request: Please ensure that your request is correct!");
    }
}