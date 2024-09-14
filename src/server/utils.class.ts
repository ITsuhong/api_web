import {AxiosInstance} from "axios";

export default class AxiosUtils {
    private readonly instance: AxiosInstance | null = null
    constructor(instance: AxiosInstance) {
        this.instance = instance
        this.response()
        // this.request()
    }
    /**
     * 响应拦截器
     */
    private response() {
        if (this.instance === null) return
        this.instance.interceptors.response.use(
            (response) => {

                return response
            },
            (error) => {
                // const status = error.toString()

                // if (status.includes('500')) {
                //   ElMessage.error('request error')
                // }
                // if (status.includes('404')) {
                //   ElMessage.error('request notfound')
                // }
                // if (status.includes('timeout')) {
                //   ElMessage.error('request timeout')
                // }
                return Promise.reject()
            }
        )
    }
    /**
     * 请求拦截器
     */
    // private request() {
    //     if (this.instance === null) return
    //     this.instance.interceptors.request.use((request) => {
    //         // const token = getToken()
    //         request.headers['Authorization'] = !token ? '' : `Bearer ${token}`
    //         return request
    //     })
    // }
}