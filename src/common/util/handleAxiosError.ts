/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

//captura o erro e mostra no toast
const handleAxiosError = (error: any, message: string): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const responseData = axiosError.response?.data;

    if (
      responseData &&
      typeof responseData === "object" &&
      "message" in responseData
    ) {
      toast.error(String(responseData.message));
    } else {
      toast.error(message);
    }
  } else {
    toast.error(message);
  }
};

export default handleAxiosError;
