import {getax, postax} from "@/server";

export interface IVariable {
    name: string
    value: string
    description: string
}

// export  interface IEnvironment{
//     name:string
// }
export interface ICreateEnv {
    name: string;
    projectId:number;
    variableDataList: IVariable[]
}

export const createEnv = (data: ICreateEnv) => {
    return postax("/environment/create", data)
}