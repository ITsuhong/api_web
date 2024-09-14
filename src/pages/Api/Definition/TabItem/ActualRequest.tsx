import type {RequestDataType, RequestResult} from "@/apis/request"
import {RequestMethodColor} from "@/utils/RequestMethod";
import {useEffect, useState} from "react"

const ActualRequest = ({data}: {
    data?: RequestResult
}) => {
    const [headerData, setHeaderData] = useState<{ key: string, value: string }[]>()
    useEffect(() => {
        const temData: any = []
        for (const key in data?.requestHeaders) {
            temData.push({
                key,
                value: data.requestHeaders[key]
            })
        }
        setHeaderData(temData)
    }, [data])
    return (
        data?.requestData ? <div className="select-text">
            <div className="text-[16px] font-semibold ">请求 URL：</div>
            <div className="flex items-center ml-2 mt-2">
                <div className="font-bold text-[15px] mr-3"
                     style={{color: RequestMethodColor[String(data?.requestData?.requestType) as keyof typeof RequestMethodColor] || "#20b570"}}>{data.requestData?.requestType}</div>
                <div>{data.requestData?.path}</div>
            </div>
            <div className="mt-3">
                <div className="text-[16px] font-semibold">Header：</div>
                <div className="border-[1px] w-full rounded-md border-b-0 mt-2">
                    <div className="flex items-center border-b-[1px]">
                        <div className=" flex-[2] border-r-[1px] py-2 pl-3">名称</div>
                        <div className=" flex-[6] py-1 pl-3">值</div>
                    </div>
                    {
                        headerData?.map(item => {
                            return <div className="flex items-center border-b-[1px] hover:bg-[#f6f6f7]">
                                <div className="flex-[2]  py-2 pl-3">{item.key}</div>
                                <div className=" flex-[6] border-l-[1px] py-2 pl-3  break-all whitespace-normal">
                                    {item.value}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="mt-3">
                <div className="text-[16px] font-semibold">Body：</div>
                <div className="mt-2">
                    {JSON.stringify(data.requestData?.bodyData)}
                </div>
            </div>
        </div> : <div className="text-textSecondary">暂无数据</div>
    )
}

export default ActualRequest