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
    name: string;
    labels: string;
    path: string;
    des: string;
    requestHeader: string;
    params: string;
    body: string;
    responseBody: string;
    createTime?: string;
    updateTime?: string
}

export const getRequest = async (data: RequestDataType) => {
    const result = await postax<RequestResult>("/request", data)
    return result.data
}


export const createInterface = async (data: IInterface) => {
    const result = await postax<number>("/request/create_interface", data)
    return result.data
}
export const updateInterface = async (data: IInterface) => {
    const result = await postax<number>("/request/update_interface", data)
    return result.data
}
export const selectInterface = async () => {
    const {data} = await getax<IInterface[]>('/request/select_interface')
    return data
}
export const detailInterface = async (data: { id: number }) => {
    const result = await getax<IInterface>("/request/detail_interface", data)
    return result.data
}

export const deleteInterface = async (data: { id: number }) => {
    await getax("/request/delete_interface", data)
}