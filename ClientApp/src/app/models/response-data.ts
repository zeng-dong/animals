import { Animal } from "./animal";

export interface IResponseData {

  succeeded: boolean;
  message: string;
   
  animals: Animal[];
  categories: string[];
  species: string[];
}
