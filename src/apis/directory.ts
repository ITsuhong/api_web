import {getax, postax} from "@/server";

export interface IDirectory {
    id: number;
    name: string;
    pid: number;
    serviceId: number;
    projectId: number;
    des: string
}


export const createDirectory = (data: Partial<IDirectory>) => {
    return postax("/directory/create", data)
}

export const selectAllDirectory = async () => {
    const {data} = await getax<IDirectory[]>("/directory/selectAll")
    return data
}