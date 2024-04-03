import axios from "axios";
import { AddressViaCep } from "../model/address";

export async function getAddressViaCep(
  cep: string
): Promise<AddressViaCep | undefined> {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.status === 200) {
      const data = response.data;
      if (data.erro) {
        throw new Error("CEP inválido.");
      } else {
        return data;
      }
    } else {
      console.log("Erro ao consultar a API ViaCEP:", response.statusText);
    }
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}
