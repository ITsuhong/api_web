import {getax, postax} from "@/server";

export const getlist = () => {
    return getax("/user/list", {
        pageSize: 1,
        pageNum: 1
    })
}

export const ApiTest = () => {
    return postax("/user/test", {
        path: 'http://localhost:8080/user/list',
        pageNum: 1
    })
}