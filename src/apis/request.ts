import {getax, postax} from "@/server";

export interface RequestTableType {
    id: number
    name: string,
    value: string,
    type: number,
    desc: string

}

export interface RequestDataType {
    requestType: number
    path: string
    params?: RequestTableType[],
    bodyData?: Record<any, any>,
    headers?: string
}

export interface RequestResult {
    body: string,
    duration: number,
    headers: Record<string, Array<any>>,
    requestData: RequestDataType,
    requestHeaders: Record<string, []>,
    statusCodeValue: number
}

export interface IInterface {
    id?: number;
    pid: number;
    projectId: number;
    userId: number;
    directoryId: number;
    serviceId: number;
    headerId: number;
    status: number;
    restfulType: number;
    name:string;
    labels: string;
    path: string;
    des: string;
    requestHeader: string;
    params: string;
    body: string;
    responseBody: string;
}

export const getRequest = async (data: RequestDataType) => {
    const result = await postax<RequestResult>("/request", data)
    return result.data
}


export const createInterface = async (data: IInterface) => {
    await postax("/request/create_interface", data)
}

export const selectInterface = async () => {
    const {data} = await getax<IInterface[]>('/request/select_interface')
    return data
}