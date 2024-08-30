import {postax} from "@/server";

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
    headers: Record<string, []>,
    requestData: RequestDataType,
    requestHeaders: Record<string, []>,
    statusCodeValue: number
}

export const getRequest = (data: RequestDataType) => {
    return postax<RequestResult>("/request", data)
}