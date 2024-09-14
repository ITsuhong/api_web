import {getax, postax} from "@/server";

export interface IVariable {
    id: number;
    name: string
    value: string
    description: string
    environmentId?: number
}

export interface IServiceUrl {
    name: string;
    url: string;
}

// export  interface IEnvironment{
//     name:string
// }
export interface ICreateEnv {
    name: string;
    projectId: number;
    variableDataList: IVariable[]
    serviceUrlDataList: IServiceUrl[]
}

export interface IEnvironment {
    id: number;
    name: string;
    projectId: number;
    variableDataList: IVariable[]
    serviceUrlDataList: IServiceUrl[]
}

export const createEnv = (data: ICreateEnv) => {
    return postax("/environment/create", data)
}


export const updateEnv = (data: IEnvironment) => {
    return postax("/environment/update", data)
}

export const createGloVariable = (data: IVariable) => {
    return postax("/variable/creatGlobal", data)
}

export async function selectAllEnvironment() {
    const res = await getax<IEnvironment[]>("/environment/selectAll")
    return res.data
}

export async function selectGlobalVariable() {
    const res = await getax<IVariable[]>("/variable/selectGlobal")
    return res.data
}

export const deleteEnv = (data: {
    id: number
}) => {
    return postax("/environment/delete", data)
}

