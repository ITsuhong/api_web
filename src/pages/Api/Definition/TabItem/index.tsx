import React, {useRef, useState, useEffect, useCallback} from "react";
import {Button, Input, Select, Tabs, Spin, Skeleton} from 'antd';
import {RequestMethod} from "@/utils/RequestMethod"

import Body from "@/pages/Api/Definition/TabItem/Body";
import ViewJson from "@/components/ViewJson";
import {getRequest} from "@/apis/request";
import type {RequestDataType, RequestResult} from "@/apis/request"
import type {IRef} from "./type"
import ResponseHead from "@/pages/Api/Definition/TabItem/ResponseHead";
import ActualRequest from "@/pages/Api/Definition/TabItem/ActualRequest";
import {SmallDashOutlined} from "@ant-design/icons"
import FormTable from "@/components/FormTable"
import EnvironmentStore from "@/stores/environment"

const {Option} = Select;
const headerColumns = [
    {
        name: "参数名",
        value: "name",

    },
    {
        name: "参数值",
        value: "value",
        width: 400,
        modal: true,
        variable: true,

    }, {
        name: "说明",
        value: "desc",
        modal: true

    }
]
const Tabitem: React.FC = () => {
    const [jsonData, setJsonData] = useState('')
    const paramsRef = useRef<IRef>()
    const requestHeadRef = useRef<IRef>()
    const bodyRef = useRef<IRef>(null)
    const isMoving = useRef(false)
    const [startY, setStartY] = useState(0); // 用于记录鼠标初始Y位置
    const lastY = useRef(0);
    const [path, setPath] = useState("")
    const [requestDate, setRequestDate] = useState<RequestDataType>({
        requestType: 0,
        path: '',
        params: [],
        bodyData: {},
        headers: '',
    });
    const [responseHeadData, setResponseHeadData] = useState([]);
    const [requestHeaderValues, setRequestHeaderValues] = useState<any>()
    const [methodType, setMethodType] = useState<number>(RequestMethod[0].value)
    const [showSpinning, setShowSpinning] = useState(false);
    const [responseSize, setResponseSize] = useState(0);
    const [responseData, setResponseData] = useState<RequestResult>()
    const [status, setStatus] = useState<'noStart' | 'success' | 'error'>('noStart');
    const maxHeight = useRef(300);
    const [settingHeight, setSettingHeight] = useState(0)
    // const handelOptionHeadValue=useCallback((record)=>{
    //     console.log("改变")
    //     setRequestHeaderValues(record)
    // },[])
    const handelOptionHeadValue = (record: any) => {
        console.log("record", record)
        setRequestHeaderValues(record)
    }

    const RequestHeadForm = () => {
        return (
            <div>
                <FormTable columns={headerColumns} onChangeValue={handelOptionHeadValue}/>
            </div>
        )
    }
    const requestTabs = [
        {
            key: '1',
            label: '请求头',
            children: <FormTable columns={headerColumns} onChangeValue={(e) => {
                console.log("过来了", e)
                const tem = e.map((item: any) => ({
                    id: item.id,
                    name: item.name.value,
                    value: item.value.value,
                    desc: item.desc.value
                }))
                console.log(tem, 'tem')
                setRequestHeaderValues(tem)

            }}/>

        },
        {
            key: '2',
            label: 'Params参数',
            // children: <FormTable columns={headerColumns} onChangeValue={handelOptionHeadValue}/>
        },
        {
            key: '3',
            label: 'Body请求体',
            children: <Body ref={bodyRef}/>,
        },
    ];
    const responseTabs = [
        {
            key: '1',
            label: '响应体',
            // children: <ViewJson data={jsonData}/>,
        },
        {
            key: '2',
            label: '响应头',
            // children: <ResponseHead data={responseHeadData}/>,
        },
        {
            key: '3',
            label: '实际请求',
            // children: <ActualRequest data={responseData}/>,
        },
    ]
    const handleMethodChange = (value: number) => {

        setMethodType(value)
    }
    const [responseActive, setResponseActive] = useState("1")
    const selectBefore = (
        <Select defaultValue={methodType} className="w-24" onChange={handleMethodChange}>
            {
                RequestMethod.map(item => {
                    return (
                        <Option value={item.value} key={item.value}>
                            <div className="font-bold" style={{color: item.color}}>{item.name}</div>
                        </Option>
                    )
                })
            }

        </Select>
    );
    const handleOptionChangeInput = (e: any) => {
        setPath(e.target.value.trim())
        setRequestDate({...requestDate, path: e.target.value.trim()})
    }

    const handleOptionSend = () => {
        console.log(requestHeaderValues, "info")
        let url = ''
        // console.log(EnvironmentStore.selectEnvironment.serviceUrlDataList[0].url)


        setResponseActive("1")
        setShowSpinning(true)
        // setTimeout()
        try {
            const temData = requestDate
            temData.requestType = methodType
            temData.params = paramsRef.current?.getInfo().info

            temData.bodyData = bodyRef.current?.getInfo()
            // temData.headers = JSON.stringify(requestHeaderValues)

            if (EnvironmentStore.selectEnvironment) {
                url = EnvironmentStore.selectEnvironment.serviceUrlDataList[0].url
                temData.path = url + path
                console.log(url + requestDate.path)
            }
            if (requestHeaderValues?.length) {
                console.log(requestHeaderValues, '进来')
                temData.headers = JSON.stringify(requestHeaderValues)

            } else {
                temData.headers = "{}"
            }
            if (temData.requestType === 0) {

                temData.params?.forEach((item, index) => {
                    if (item.name && item.value) {

                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        (index === 0 && !temData.path.includes("?")) ? temData.path += `?${item.name}=${item.value}` : temData.path += `&${item.name}=${item.value}`
                    }

                })
                // temData.path=requestDate.path+"?"
            }

            setRequestDate(temData)

            getRequest(requestDate).then(res => {
                console.log(res, "haha")
                if (res.data) {
                    setJsonData(res.data.body)
                    setResponseData(res.data)
                    if (Array.isArray(res.data.headers?.["Content-Length"]) && res.data.headers?.["Content-Length"].length > 0) {
                        setResponseSize(res.data.headers?.["Content-Length"]?.[0] || 0)
                    }

                    const temHeadData: any = [];
                    for (const key in res.data.headers) {
                        console.log(key)
                        temHeadData.push({
                            key,
                            value: res.data.headers[key]?.[0]
                        })
                    }
                    setResponseHeadData(temHeadData)
                    const code = res.data?.statusCodeValue;
                    if (code > 0 && code < 400) {
                        setStatus("success")
                    } else {
                        setStatus("error")
                    }
                }

            });
        } finally {
            setTimeout(() => {
                setShowSpinning(false)
            }, 500)
        }
    }
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {

        setStartY(e.clientY);
        lastY.current = e.clientY
        isMoving.current = true;
        document.onmousemove = (e) => {
            if (!isMoving.current) return
            const currentY = e.clientY;
            const deltaY = lastY.current - currentY;
            lastY.current = currentY
            maxHeight.current = maxHeight.current - deltaY;
            setSettingHeight(currentY)
            // console.log(maxHeight.current, "数据")
        }
        document.onmouseup = () => {

            isMoving.current = false;
        }
    }

    // useEffect(() => {
    //     // document.addEventListener('mousemove', (e) => {
    //     //     handleMouseMove(e)
    //     // })
    //     console.log(maxHeight.current, "数据")
    // }, [settingHeight])
    return (
        <>
            <Spin size="large" spinning={showSpinning} fullscreen/>

            <div className="bg-white h-full border-[1px] p-3  flex flex-col">
                <div>
                    <div className="mb-7">
                        <div className="flex items-center mb-4">
                            <div className="w-1 h-6 bg-primary mr-2"></div>
                            <div>基础信息</div>
                        </div>
                        <div className="flex">
                            <div className="flex items-center">
                                <div className="text-red-600 mr-1">*</div>
                                <div className="text-[16px] text-textPrimary">请求</div>
                            </div>
                            <div className="w-2/4 ml-3">
                                <Input onChange={(e) => handleOptionChangeInput(e)}
                                       addonBefore={selectBefore}
                                />
                            </div>
                            <div className="ml-3">
                                <Button type="primary" onClick={() => handleOptionSend()}>发送</Button>
                            </div>
                        </div>
                    </div>

                    <div className="select-none">
                        <div className="flex items-center mb-4">
                            <div className="w-1 h-6 bg-primary mr-2"></div>
                            <div>请求参数</div>
                        </div>
                        <div className="px-3 border-[1px] overflow-auto" style={{height: maxHeight.current + 'px'}}>
                            <div>
                                <Tabs defaultActiveKey="1" items={requestTabs}/>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full flex-1  flex flex-col h-0 ">
                    <div
                        onMouseDown={(e) => handleMouseDown(e)}


                        className="cursor-ns-resize w-full h-2 bg-[#f2f4f7] mb-2 hover:bg-primary flex justify-center">
                        <SmallDashOutlined/>
                    </div>
                    <div className="flex items-center mb-4 select-none">
                        <div className="w-1 h-6 bg-primary mr-2"></div>
                        <div>响应内容</div>
                    </div>

                    {
                        showSpinning ? <Skeleton/> :
                            <div className="flex-1 flex flex-col h-0 select-none">
                                <div className="flex items-center justify-between pr-80 pl-6">
                                    <div className="flex items-center">
                                        <div className="text-[14px] text-[#999]">状态码：</div>
                                        {
                                            status === 'noStart' && <div className="text-[14px] text-[#999]">-</div>
                                        }
                                        {
                                            status === 'error' && <div
                                                className="text-red-600 text-[14px]">{responseData?.statusCodeValue ? responseData?.statusCodeValue : 0}</div>
                                        }
                                        {
                                            status === 'success' && <div
                                                className="text-green-400 text-[14px]">{responseData?.statusCodeValue}</div>
                                        }

                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-[14px] text-[#999]">响应时间(ms)：</div>
                                        {
                                            status === 'noStart' && <div className="text-[14px] text-[#999]">-</div>
                                        }
                                        {
                                            status === 'error' &&
                                            <div
                                                className="text-[14px] text-red-600">{responseData?.duration || 0}ms</div>
                                        }{
                                        status === 'success' &&
                                        <div
                                            className="text-green-400 text-[14px]">{responseData?.duration || 0}ms</div>
                                    }

                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-[14px] text-[#999]">响应大小：</div>
                                        {
                                            status === 'noStart' && <div className="text-[14px] text-[#999]">-</div>
                                        }
                                        {
                                            status === 'error' &&
                                            <div className="text-[14px] text-red-600">{responseSize || 0}bytes</div>
                                        }{
                                        status === 'success' &&
                                        <div className="text-green-400 text-[14px]">{responseSize || 0}bytes</div>
                                    }
                                    </div>
                                </div>
                                <div className="px-3 flex-1 flex flex-col h-0 ">
                                    <div className="max-w-full flex-1 flex flex-col  h-0 ">
                                        {/*<ViewJson data={responseData?.bodyValue}></ViewJson>*/}
                                        <div>
                                            <Tabs onTabClick={(e) => {
                                                setResponseActive(e)

                                            }} defaultActiveKey="1" items={responseTabs}/>
                                        </div>
                                        <div className="flex-1 overflow-auto h-0">
                                            {
                                                responseActive == '1' && <ViewJson data={jsonData}/>
                                            }
                                            {
                                                responseActive == '2' && <ResponseHead data={responseHeadData}/>
                                            }
                                            {
                                                responseActive == '3' && <ActualRequest data={responseData}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}


export default Tabitem