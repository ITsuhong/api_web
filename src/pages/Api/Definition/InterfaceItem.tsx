import {Button, Input, message, Select, Tabs, Tree} from "antd";
import React, {useRef, useState} from "react";
import {RequestMethod, RequestMethodColor} from "@/utils/RequestMethod";
import FormTable from "@/components/FormTable";
import Body from "@/pages/Api/Definition/TabItem/Body";
import {createInterface} from "@/apis/request"
import CodeMirror from '@uiw/react-codemirror';
import {json} from '@codemirror/lang-json';
import {vscodeDark} from "@uiw/codemirror-theme-vscode"
// import './index.less'
const {Option} = Select
const {TextArea} = Input;
const {DirectoryTree} = Tree;
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
const paramsColumns = [
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
const InterfaceItem = ({directoryId, onReady}: {
    directoryId?: number,
    onReady: () => void
}) => {
    const [methodType, setMethodType] = useState<number>(RequestMethod[0].value)
    const [pathName, setPathName] = useState("")
    const [interfaceName, setInterfaceName] = useState("")
    const [explain, setExplain] = useState("")
    const [requestHeaderValues, setRequestHeaderValues] = useState<any>()
    const [paramsValues, setParamsValue] = useState<any>()
    const [responseValue, setResponseValue] = useState("")
    const maxHeight = useRef(300);
    const bodyRef = useRef<any>(null)

    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: any, viewUpdate: any) => {
        console.log('val:', val);
        setValue(val);
        setResponseValue(val);
    }, []);
    const handleMethodChange = (value: number) => {

        setMethodType(value)
    }

    const handleOptionSend = async () => {
        console.log(pathName)
        console.log(interfaceName)
        console.log(explain)
        console.log(requestHeaderValues)
        console.log(paramsValues)
        console.log(responseValue)
        console.log(bodyRef.current?.getInfo())
        console.log(methodType)
        const hide = message.loading({content: '操作中', key: 'loading'});
        const temData = {
            pid: 0,
            projectId: 1,
            userId: 1,
            directoryId: directoryId || 0,
            serviceId: 22,
            headerId: 1,
            status: 1,
            restfulType: methodType,
            labels: "这是标签",
            path: pathName,
            des: explain,
            name: interfaceName,
            requestHeader: requestHeaderValues ? JSON.stringify(requestHeaderValues) : "",
            params: paramsValues ? JSON.stringify(paramsValues) : "",
            body: bodyRef.current?.getInfo() ? JSON.stringify(bodyRef.current?.getInfo()) : "",
            responseBody: responseValue
        }
        await createInterface(temData)
        hide();
        message.success("新建成功")
        onReady();
    }
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
    const handleOptionChangeInput = (record: any) => {
        setPathName(record.target.value)
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
            children: <FormTable columns={paramsColumns} onChangeValue={(e) => {
                const tem = e.map((item: any) => ({
                    id: item.id,
                    name: item.name.value,
                    value: item.value.value,
                    desc: item.desc.value
                }))
                console.log(tem, 'tem')
                setParamsValue(tem)
                console.log(e)
            }}/>
        },
        {
            key: '3',
            label: 'Body请求体',
            children: <Body ref={bodyRef}/>,
        },
    ];
    return <div className="bg-white h-full border-[1px] p-3  flex flex-col overflow-auto">
        <div className="mb-7">
            <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-primary mr-2"></div>
                <div>基础信息</div>
            </div>
            <div className="flex">
                <div className="flex items-center mr-3">
                    <div className="text-red-600 mr-1">*</div>
                    <div className="text-[16px] text-textPrimary">请求</div>
                </div>
                <div className="w-full flex-1">
                    <Input onChange={(e) => handleOptionChangeInput(e)}
                           addonBefore={selectBefore}
                    />
                </div>
                <div className="ml-3">
                    <Button type="primary" onClick={() => handleOptionSend()}>保存</Button>
                </div>
            </div>
            <div className="mt-5">
                <Input placeholder="未命名接口" variant="filled" onChange={(e) => {
                    setInterfaceName(e.target.value)
                }}/>
            </div>
            <div className="grid grid-cols-4 gap-4  mt-5 ">
                <div>
                    <div>状态 <span className="text-red-600">*</span></div>
                    <div className="mt-2">
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: '100%',
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
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <div>责任人 <span className="text-red-600">*</span></div>
                    <div className="mt-2 ">
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: '100%',
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
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <div>标签 <span className="text-red-600">*</span></div>
                    <div className="mt-2 ">
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: '100%',
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
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <div>服务（前置URL） <span className="text-red-600">*</span></div>
                    <div className="mt-2">
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: '100%',
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
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="mb-2">说明</div>
                <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} onChange={(e) => {
                    setExplain(e.target.value)
                }}/>
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

        <div className="mt-4">
            <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-primary mr-2"></div>
                <div>返回响应</div>
            </div>
            <CodeMirror theme={vscodeDark} value={value} height="200px" extensions={[json()]}
                        onChange={onChange}/>
        </div>
    </div>
}
export default InterfaceItem