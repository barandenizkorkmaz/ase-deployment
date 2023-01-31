import { toast } from 'react-toastify';

export const showError = (error) =>{
    if(error != null && error.name === "AxiosError"){
        toast("Something went wrong!");
    }
}