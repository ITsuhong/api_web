import {CreateAxiosOptions} from "./types.ts";
import {AxiosInstance} from "axios"

import axios from 'axios'

export class VAxios {

    private options: CreateAxiosOptions

    private readonly axiosInstance: AxiosInstance

    constructor(options: CreateAxiosOptions) {
        this.options = options
        this.axiosInstance = axios.create(options);
        this.response();
    }

    getAxios(): AxiosInstance {
        return this.axiosInstance
    }

    private response() {

        return this.axiosInstance.interceptors.response.use((response) => {
            return response.data
        })
    }

}