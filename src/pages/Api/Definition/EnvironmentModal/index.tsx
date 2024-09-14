import {Button, Input, Modal, Space, message, Popconfirm} from "antd";
import {ForkOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react"
import FormTable from "@/components/FormTable";
import classNames from "classnames";
import {
    createEnv,
    createGloVariable,
    IEnvironment,
    IServiceUrl,
    IVariable,
    selectAllEnvironment,
    selectGlobalVariable,
    updateEnv,
    deleteEnv
} from "@/apis/environment"
import {observer} from 'mobx-react'
import EnvironmentStore from "@/stores/environment";
import type {ICreateEnv} from "@/apis/environment"

interface ModalProps {
    isModalOpen: boolean,
    onChange: () => void
}

const columns = [
    {
        name: "服务名",
        value: "name",
        width: 200,
    },
    {
        name: "前置URL",
        value: "url",
        width: 100,
        modal: true,
        variable: true
    }
]
const columns2 = [
    {
        name: "变量名",
        value: "name",
        width: 200,
    },
    {
        name: "变量值",
        value: "value",
        width: 200,
    },
    {
        name: "描述",
        value: "description",
        // width: 200,
    }
]

const EnvironmentModal = ({isModalOpen, onChange}: ModalProps) => {
    const [selectedEnvironment, setSelectedEnvironment] = useState<number>(0)
    const [value, setValue] = useState()
    const [EnvironmentList, setEnvironmentList] = useState<IEnvironment[]>(EnvironmentStore.getList)
    const [globalVariables, setGlobalVariables] = useState<IVariable[]>()
    const [globalDataSource, setGlobalDataSource] = useState<any>()
    const [environmentDataSource, setEnvironmentDataSource] = useState<any>()
    const [serviceDataSource, setServiceDataSource] = useState<any>()
    const [environmentName, setEnvironmentName] = useState(EnvironmentStore.getList?.find(item => item.id == selectedEnvironment)?.name || '')
    const [environmentValue, setEnvironmentValue] = useState<any>()
    const [serviceUrlValue, setServiceUrlValue] = useState<any>()
    const [globalValue, setGlobalValue] = useState<any>()
    const handleOptionEn = (id: number) => {

        setSelectedEnvironment(id)
    }
    const handleOptionSave = async () => {
        const hide = message.loading({content: '操作中', key: 'loading'});
        await createEnv({
            projectId: 1,
            name: environmentName,
            variableDataList: environmentValue.map((item: any) => ({
                name: item.name.value,
                value: item.value.value,
                description: item.description.value
            })),
            serviceUrlDataList: serviceUrlValue.map((item: any) => ({
                name: item.name.value,
                url: item.url.value
            }))
        })
        await EnvironmentStore.setEnvList();
        setEnvData();
        hide();
        message.success("新建成功")
        onChange()
    }
    const handleOptionGlobalSave = async () => {
        const hide = message.loading({content: '操作中', key: 'loading'});
        console.log(globalValue)
        await createGloVariable(globalValue.map((item: any) => ({
            name: item.name.value,
            value: item.value.value,
            description: item.description.value,
        })))
        await EnvironmentStore.setEnvList();
        setEnvData();

        hide();
        message.success("修改成功")
    }
    const handleOptionEnvUpdate = async () => {
        const hide = message.loading({content: '操作中', key: 'loading'});

        await updateEnv({
            id: selectedEnvironment,
            name: environmentName,
            projectId: 1,
            variableDataList: environmentValue.map((item: any) => ({
                name: item.name.value,
                value: item.value.value,
                description: item.description.value
            })),
            serviceUrlDataList: serviceUrlValue.map((item: any) => ({
                name: item.name.value,
                url: item.url.value
            }))
        })
        await EnvironmentStore.setEnvList();
        setEnvData();
        // selectAllEnvironment().then(res => {
        //     setEnvironmentList(res.data)
        //     setEnvironmentName(res.data?.find(item => item.id == selectedEnvironment)?.name || '')
        // })
        // selectGlobalVariable().then(res => {
        //     setGlobalVariables(res.data)
        // })
        hide();
        message.success("修改成功")
    }
    const DeleteConfirm = async (id: number) => {
        const hide = message.loading({content: '操作中', key: 'loading'});
        await deleteEnv({id})
        hide();
        message.success("修改成功")
        onChange()
    }
    const setEnvData = () => {
        setEnvironmentList(EnvironmentStore.getList)
        setEnvironmentName(EnvironmentStore.getList?.find(item => item.id == selectedEnvironment)?.name || '')

        setGlobalVariables(EnvironmentStore.getGlobalVariableList)
    }
    useEffect(() => {

        if (selectedEnvironment === 0) {
            if (globalVariables) {
                const gloData = globalVariables.map((item: IVariable) => {
                    return {
                        "description": {
                            name: "",
                            type: "text",
                            value: item.description
                        },
                        "name": {
                            name: "",
                            type: "text",
                            value: item.name
                        },
                        "value": {
                            name: "",
                            type: "text",
                            value: item.value
                        },
                    }
                })
                setGlobalDataSource(gloData)
            } else {
                setGlobalDataSource([{
                    "description": {
                        name: "",
                        type: "text",
                        value: ""
                    },
                    "name": {
                        name: "",
                        type: "text",
                        value: ""
                    },
                    "value": {
                        name: "",
                        type: "text",
                        value: ""
                    },
                }])
            }
            return
        }
        if (!EnvironmentList) return
        let temData: any = EnvironmentList.find(item => item.id == selectedEnvironment)?.variableDataList
        let serviceData: any = EnvironmentList.find(item => item.id == selectedEnvironment)?.serviceUrlDataList
        if (temData?.length) {
            temData = temData.map((item: IVariable) => {
                return {
                    "description": {
                        name: "",
                        type: "text",
                        value: item.description
                    },
                    "name": {
                        name: "",
                        type: "text",
                        value: item.name
                    },
                    "value": {
                        name: "",
                        type: "text",
                        value: item.value
                    },
                }
            })
        } else {
            temData = [{
                "description": {
                    name: "",
                    type: "text",
                    value: ""
                },
                "name": {
                    name: "",
                    type: "text",
                    value: ""
                },
                "value": {
                    name: "",
                    type: "text",
                    value: ""
                },
            }]
        }
        if (serviceData?.length) {
            serviceData = serviceData.map((item: IServiceUrl) => {
                return {
                    "name": {
                        name: "",
                        type: "text",
                        value: item.name
                    },
                    "url": {
                        name: "",
                        type: "text",
                        value: item.url
                    },
                }
            })
        } else {
            serviceData = [{
                "name": {
                    name: "",
                    type: "text",
                    value: ""
                },
                "url": {
                    name: "",
                    type: "text",
                    value: ""
                },
            }]
        }

        setEnvironmentDataSource(temData)
        setServiceDataSource(serviceData)
        setEnvironmentName(EnvironmentList?.find(item => item.id == selectedEnvironment)?.name || '')
        setEnvironmentValue([])
        setServiceUrlValue([])
        // setDataSource()
    }, [selectedEnvironment]);
    useEffect(() => {
        if (isModalOpen) {
            setEnvData()
            setSelectedEnvironment(EnvironmentStore.getList?.[0].id || 0)


            // selectGlobalVariable().then(res => {
            //     setGlobalVariables(res.data)
            // })
        }

    }, [isModalOpen])
    return <Modal style={{padding: 0}} width={1000} open={isModalOpen} onCancel={() => onChange()}
                  onOk={() => onChange()} footer={null}>
        <div className="flex h-[600px]">
            <div className="h-full border-r-[1px] pt-4 w-1/5 pr-3">
                <div onClick={() => setSelectedEnvironment(0)}>
                    <div className="text-[12px] text-textSecondary mb-3">全局</div>
                    <div className={
                        classNames({
                            ' text-base cursor-pointer hover:bg-[#f3f5f6] rounded-md py-1 pl-1': true,
                            'text-[#b49ef3] bg-[#f2eefd] hover:bg-[#f2eefd]': selectedEnvironment == 0,
                            'text-textPrimary': selectedEnvironment != 0,
                        })
                    }>
                        <ForkOutlined className="mr-2"/>
                        全局变量
                    </div>
                </div>
                <div>
                    <div className="text-[12px] text-textSecondary mb-3 mt-7">环境</div>
                    {
                        EnvironmentList && EnvironmentList.map(item => {
                            return (
                                <div
                                    onClick={() => handleOptionEn(item.id)}
                                    key={item.id}
                                    className={classNames({
                                        'text-[#b49ef3] bg-[#f2eefd] hover:bg-[#f2eefd]': selectedEnvironment == item.id,
                                        'text-textPrimary': selectedEnvironment != item.id,
                                        'mb-3  text-[15px] flex  cursor-pointer hover:bg-[#f3f5f6] rounded-md py-1 pl-1': true,
                                    })}>
                                    <span className="text-[#b49ef3] text-sm mx-3">{item.name.substring(0, 1)}</span>
                                    {item.name}
                                    {
                                        selectedEnvironment == item.id &&
                                        <Popconfirm
                                            onConfirm={() => DeleteConfirm(item.id)}
                                            title="你确认删除这个环境吗"
                                            description="确认删除?"
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                        <span
                                            className="ml-2 text-red-600 cursor-pointer flex-1 flex justify-end pr-4">
                                        <MinusCircleOutlined/>
                                    </span>
                                        </Popconfirm>
                                    }

                                </div>
                            )
                        })
                    }
                </div>
                <div onClick={() => setSelectedEnvironment(-1)}>

                    <div className={
                        classNames({
                            ' text-base cursor-pointer hover:bg-[#f3f5f6] rounded-md py-1 pl-1': true,
                            'text-[#b49ef3] bg-[#f2eefd] hover:bg-[#f2eefd]': selectedEnvironment == -1,
                            'text-textPrimary': selectedEnvironment != -1,
                        })
                    }>
                        <PlusCircleOutlined className="mr-2"/>
                        新建环境
                    </div>
                </div>
            </div>
            {
                selectedEnvironment == 0 && <div className="pl-4 flex-1  flex flex-col">
                    <div className="mb-6">全局变量</div>

                    <div className="h-full flex-1 flex flex-col justify-between">
                        <FormTable dataSource={globalDataSource} columns={columns2} onChangeValue={(e) => {
                            setGlobalValue(e)

                        }}/>
                        <div className="flex justify-end">
                            <Space>
                                <Button>取消</Button>
                                <Button type="primary" onClick={() => handleOptionGlobalSave()}>保存</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            }
            {
                (selectedEnvironment > 0) && <div className="pl-4 flex-1  flex flex-col mt-4 justify-between">
                    <div>
                        <div className="mb-4 flex items-center">
                            <span className="mr-2 text-[#b49ef3]">{environmentName.substring(0, 1)}</span>
                            <Input value={environmentName}
                                   onChange={(e) => setEnvironmentName(e.target.value)} placeholder="Borderless"
                                   variant="borderless"/>
                        </div>
                        <div>
                            <div className="text-base mb-3">服务（前置URL）</div>
                            <FormTable dataSource={serviceDataSource} columns={columns} onChangeValue={(e) => {
                                setServiceUrlValue(e)

                            }}/>
                        </div>
                        <div>
                            <div className="text-base mb-3 mt-3">环境变量</div>
                            <FormTable dataSource={environmentDataSource} columns={columns2} onChangeValue={(e) => {
                                setEnvironmentValue(e)
                                console.log(e, "打印22")
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Space>
                            <Button>取消</Button>
                            <Button type="primary" onClick={() => handleOptionEnvUpdate()}>保存</Button>
                        </Space>
                    </div>
                </div>
            }

            {
                selectedEnvironment == -1 && <div className="pl-4 flex-1  flex flex-col mt-4 justify-between">
                    <div>
                        <div className="mb-4 flex items-center">
                            <span className="mr-2 text-[#b49ef3]">新</span>
                            <Input placeholder="环境名称" variant="borderless" value={environmentName}
                                   onChange={(e) => setEnvironmentName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="text-base mb-3">服务（前置URL）</div>
                            <FormTable columns={columns} onChangeValue={(e) => {
                                setServiceUrlValue(e)

                            }}/>
                        </div>
                        <div>
                            <div className="text-base mb-3 mt-3">环境变量</div>
                            <FormTable columns={columns2} onChangeValue={(e) => {
                                setEnvironmentValue(e)

                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Space>
                            <Button>取消</Button>
                            <Button type="primary" onClick={() => handleOptionSave()}>新建</Button>
                        </Space>
                    </div>
                </div>
            }
        </div>
    </Modal>
}
export default EnvironmentModal