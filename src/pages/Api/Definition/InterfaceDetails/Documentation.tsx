import {Button, Space, Select} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import Icon from "@/components/Global/Icon";
import React, {useState, useEffect} from "react";
import {RequestMethod, RequestMethodColor} from "@/utils/RequestMethod";
import ReactJson from 'react-json-view';
import CodeMirror from '@uiw/react-codemirror';
import {json} from '@codemirror/lang-json';
import {vscodeDark} from "@uiw/codemirror-theme-vscode"
import {detailInterface} from "@/apis/request"
import type {IInterface} from "@/apis/request"

const Documentation = ({data}: { data: any }) => {
    // const [json, setJson] = useState<any>();
    const [interfaceData, setInterfaceData] = useState<IInterface>()
    const [params, setParams] = useState<any>([])
    const [headerParams, setHeaderParams] = useState([])
    useEffect(() => {
        detailInterface({id: data?.id}).then(res => {
            console.log(res.data)
            setInterfaceData(res.data)
            if (res.data?.params) {
                setParams(JSON.parse(res.data.params))
            }
            if (res.data?.requestHeader) {
                setHeaderParams(JSON.parse(res.data.requestHeader))
            }

        })
    }, []);
    return (
        <div>
            <div className="flex justify-between mb-2">
                <div className="text-base font-semibold">{interfaceData?.name}</div>
                <div>
                    <Space>
                        <Button type="primary" icon={<Icon name="icon-kuaijiejiaoyi"/>}>运行</Button>
                        <Button>删除</Button>
                    </Space>
                </div>
            </div>
            <div className="flex items-center text-base">
                <div className="px-2  rounded-md text-white mr-2"
                     style={{background: RequestMethodColor["POST"]}}>{RequestMethod.find(item => item.value == interfaceData?.restfulType)?.name}
                </div>
                <div className="font-sans">{interfaceData?.path}</div>
                <div>
                    <Select
                        placeholder="Borderless"
                        variant="filled"
                        style={{
                            width: '150px',
                            marginLeft: "12px"
                        }}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                            },
                        ]}
                    />
                </div>
            </div>

            <div className="flex items-center mt-2 justify-between w-2/3">
                <div className="flex items-center">
                    <div className="mr-1">创建时间</div>
                    <div>{interfaceData?.createTime}</div>
                </div>
                <div className="flex items-center">
                    <div className="mr-1">修改时间</div>
                    <div>{interfaceData?.updateTime}</div>
                </div>
                <div className="flex items-center">
                    <div className="mr-1">修改者</div>
                    <div>这是名字</div>
                </div>
                <div className="flex items-center">
                    <div className="mr-1">创建者</div>
                    <div>这是名字</div>
                </div>
                <div className="flex items-center">
                    <div className="mr-1">责任人</div>
                    <div>未设置</div>
                </div>
                <div className="flex items-center">
                    <div className="mr-1">目录</div>
                    <div>测试接口</div>
                </div>
            </div>

            <div className="mt-5">
                <div className="text-base font-sans mb-2">请求参数</div>
                {
                    params?.length > 0 && <div className="border-[1px] rounded-md">
                        <div className="border-b-[1px] p-2">Query参数</div>
                        <div className="p-3">
                            {
                                params?.map((item: any) => {
                                    return (<div key={item.id}>
                                        <div className="flex">
                                            <div
                                                className="px-1 bg-[#f6fbff] text-[#7290ff] rounded-sm">{item?.name}</div>
                                            <div className="mx-2 font-[600]">string</div>
                                            <div className="text-textPrimary">{item?.desc}</div>
                                            <div className="text-red-500 ml-2">必需</div>
                                        </div>
                                        <div className="flex items-center mt-2 ml-1">
                                            <div className="text-textPrimary">示例值：</div>
                                            <div
                                                className="px-1 rounded-md ml-3 text-[12px] bg-[#fcfcfd] border-[1px] text-textPrimary">{item?.value}
                                            </div>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                }
                {
                    headerParams?.length > 0 && <div className="border-[1px] rounded-md">
                        <div className="border-b-[1px] p-2">header参数</div>
                        <div className="p-3">
                            {
                                headerParams?.map((item: any) => {
                                    return (<div key={item.id}>
                                        <div className="flex">
                                            <div
                                                className="px-1 bg-[#f6fbff] text-[#7290ff] rounded-sm">{item?.name}</div>
                                            <div className="mx-2 font-[600]">string</div>
                                            <div className="text-textPrimary">{item?.desc}</div>
                                            <div className="text-red-500 ml-2">必需</div>
                                        </div>
                                        <div className="flex items-center mt-2 ml-1">
                                            <div className="text-textPrimary">示例值：</div>
                                            <div
                                                className="px-1 rounded-md ml-3 text-[12px] bg-[#fcfcfd] border-[1px] text-textPrimary">{item?.value}
                                            </div>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                }
                <div className="border-[1px] rounded-md mt-4">
                    <div className="border-b-[1px] p-2">Body参数</div>
                    <div className="p-3">
                        <ReactJson name={false} iconStyle="square" src={JSON.parse(interfaceData?.body || '{}')}
                                   style={{fontSize: 16, width: "100%", wordBreak: "break-all"}}
                                   theme="shapeshifter:inverted"></ReactJson>

                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="text-base font-sans mb-2">返回响应</div>
                <div className="border-[1px] rounded-md mt-4">
                    <div className="border-b-[1px] p-2">响应数据</div>
                    <div className="p-3">

                        <CodeMirror theme={vscodeDark} value={interfaceData?.responseBody} height="200px"
                                    extensions={[json()]}
                                    readOnly={true}/>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Documentation