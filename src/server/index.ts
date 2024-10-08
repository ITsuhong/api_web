import {VAxios} from "./Axios";
import {ContentTypeEnum, ResultEnum} from "@/utils/httpEnum";
import {AxiosTransform} from "@/server/axiosTransform";
import type {RequestOptions, Result} from "@/server/types";
import {AxiosResponse} from "axios";
// import {AxiosResponse} from "axios";
// import {RequestOptions, Result} from "@/server/types";

const isDev = import.meta.env.MODE === 'development'
const baseUrl = isDev ? "/dev" : import.meta.env.VITE_APP_URL

// const transform: AxiosTransform = {
//     /**
//      * @description: 处理请求数据
//      */
//     transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
//         // const { $message: Message, $dialog: Modal } = window;
//         const {
//             isShowMessage = true,
//             isShowErrorMessage,
//             isShowSuccessMessage,
//             successMessageText,
//             errorMessageText,
//             isTransformResponse,
//             isReturnNativeResponse
//         } = options
//         console.log(res,'limian')
//         // 是否返回原生响应头 比如：需要获取响应头时使用该属性
//         if (isReturnNativeResponse) {
//             return res
//         }
//         // 不进行任何处理，直接返回
//         // 用于页面代码可能需要直接获取code，data，message这些信息时开启
//         if (!isTransformResponse) {
//             return res.data
//         }
//
//         const reject = Promise.reject
//
//         if (!res.data) {
//             // return '[HTTP] Request has no return value';
//             // if(res?.data?.code === '9') {
//
//             // }
//             return
//         }
//         //  这里 code，data，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
//
//         const {code, message} = res.data
//         // 请求成功
//         const hasSuccess = res.data && Reflect.has(res.data, 'code') && code === ResultEnum.SUCCESS
//         // 是否显示提示信息
//         if (isShowMessage) {
//             if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
//                 // 是否显示自定义信息提示
//                 Message.success(successMessageText || message || '操作成功！')
//             } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
//                 // 是否显示自定义信息提示
//                 Message.error(message || errorMessageText || '操作失败！')
//             } else if (!hasSuccess && options.errorMessageMode === 'modal') {
//                 // errorMessageMode=‘custom-edit’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
//                 Modal.info({
//                     title: '提示',
//                     content: message,
//                     okText: '确定',
//                     onOk() {
//                         console.log('ok')
//                     }
//                 })
//             }
//         }
//
//         // 接口请求成功，直接返回结果
//         if (code === ResultEnum.SUCCESS) {
//             return res.data
//         }
//
//         if (code >= 400 && code < 500) {
//             Message.error(res?.data?.message || '系统内部错误')
//             return Promise.reject(res?.data?.message || '系统内部错误')
//         }
//         // 接口请求错误，统一提示错误信息
//         if (code === ResultEnum.MSGERROR) {
//             if (message) {
//                 Message.error(message || '系统内部错误')
//                 return Promise.reject(message || '系统内部错误')
//             }
//             const msg = '操作失败,系统异常!'
//             Message.error(msg)
//             return reject(message)
//         }
//
//         // 登录超时
//         if (code === ResultEnum.TIMEOUT) {
//             // const LoginName = PageEnum.BASE_LOGIN_NAME;
//             // if (location.pathname == '/login') return;
//             // 到登录页
//             const timeoutMsg = '登录超时,请重新登录!'
//             Modal.warning({
//                 title: '提示',
//                 content: '登录身份已失效，请重新登录!',
//                 okText: '确定',
//                 cancelText: '取消',
//                 onOk: () => {
//                     storage.clear()
//                     // history.replace('/login', location.pathname);
//                 },
//                 onCancel: () => {
//                     console.log('cancel')
//                 }
//             })
//             return reject(new Error(timeoutMsg))
//         }
//
//         // 这里逻辑可以根据项目进行修改
//         if (!hasSuccess) {
//             return reject(new Error(message))
//         }
//
//         return res.data
//     },
//
//     // 请求之前处理config
//     beforeRequestHook: (config, options) => {
//         const {apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true} = options
//
//         if (joinPrefix) {
//             config.url = `${urlPrefix}${config.url}`
//         }
//
//         if (apiUrl && isString(apiUrl)) {
//             config.url = `${apiUrl}${config.url}`
//         }
//         const params = config.params || {}
//         const data = config.data || false
//         if (config.method?.toUpperCase() === RequestEnum.GET) {
//             if (!isString(params)) {
//                 // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
//                 // config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
//             } else {
//                 // 兼容restful风格
//                 config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
//                 config.params = undefined
//             }
//         } else {
//             if (!isString(params)) {
//                 // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//                 formatDate && formatRequestDate(params)
//                 config.data = data
//                 config.params = params
//                 if (joinParamsToUrl) {
//                     config.url = setObjToUrlParams(
//                         config.url as string,
//                         Object.assign({}, config.params, config.data)
//                     )
//                 }
//             } else {
//                 // 兼容restful风格
//                 config.url = config.url + params
//                 config.params = undefined
//             }
//         }
//         return config
//     },
//
//     /**
//      * @description: 请求拦截器处理
//      */
//     requestInterceptors: config => {
//         // 请求之前处理config
//         const token = storage.get('token')
//         if (token) {
//             // jwt token
//             config.headers = {
//                 Authorization: 'Bearer ' + token,
//                 ...config.headers
//             }
//         }
//         if (config.headers) {
//             config.headers.source = 'simcere_back'
//         }
//         return config
//     },
//
//     /**
//      * @description: 响应错误处理
//      */
//     responseInterceptorsCatch: (error: any) => {
//         const {response, code, message} = error || {}
//         // TODO 此处要根据后端接口返回格式修改
//         const msg: string =
//             response && response.data && response.data.message ? response.data.message : ''
//         const err: string = error.toString()
//         try {
//             if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
//                 Message.error('接口请求超时,请刷新页面重试!')
//                 return
//             }
//             if (err && err.includes('Network Error')) {
//                 Modal.info({
//                     title: '网络异常',
//                     content: '请检查您的网络连接是否正常!',
//                     okText: '确定',
//                     onOk: () => {
//                         console.log('ok')
//                     }
//                 })
//                 return
//             }
//         } catch (e) {
//             throw new Error(e as string)
//         }
//         if (response && response.status === 401) {
//             storage.clear()
//             /** 未登陆逻辑后续再补充 */
//             notification.error({
//                 message: message,
//                 description: 'token过期或未登录或没有权限'
//             })
//             window.location.href = '/login'
//         }
//         // 请求是否被取消
//         const isCancel = axios.isCancel(error)
//         if (!isCancel) {
//             checkStatus(error.response && error.response.status, msg, Message)
//         } else {
//             console.warn(error, '请求被取消！')
//         }
//         return error
//     }
// }

const transform: AxiosTransform = {
    transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
        console.log(options, 'options')
        return res;
    }

}
const Axios = new VAxios({
    baseURL: baseUrl,
    timeout: 100 * 1000,
    withCredentials: true,
    headers: {'Content-Type': ContentTypeEnum.JSON},
    // transform,

}).getAxios()


export function getax<T>(url: string, params = {}, config = {}) {
    return Axios.get<Result<T>>(url, {
        params,
        ...config
    })
}

export function postax<T>(url: string, params = {}, config = {}) {
    return Axios.post<Result<T>>(url, params, config)
}