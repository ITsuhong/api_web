import {Button, Input, Modal, Space} from "antd";
import {ForkOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react"
import FormTable from "@/components/FormTable";
import classNames from "classnames";
import {createEnv} from "@/apis/environment"
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
        modal: true
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
    const [selectedEnvironment, setSelectedEnvironment] = useState<number>(1)
    const [value, setValue] = useState()
    const [EnvironmentList, setEnvironmentList] = useState([{
        id: 1,
        title: "测试环境",
        url: [
            {name: "默认服务名字", url: "https://www.baidu.com"}
        ],
        variable: [
            {
                name: "姓名",
                value: "李四",
                description: "这是说明"
            }
        ]
    },
        {
            id: 2,
            title: "预发布环境",
            url: [
                {name: "前置服务", url: "https://www.baidu.com"}
            ],
            variable: [
                {
                    name: "年龄",
                    value: "李四",
                    description: "这是说明"
                }
            ]
        },
        {
            id: 3,
            title: "线上环境",
            url: [
                {name: "默认服务名字2", url: "https://www.baidu.com"}
            ],
            variable: [
                {
                    name: "姓名1",
                    value: "李四",
                    description: "这是说明"
                }
            ]
        }
    ])
    const [dataSource, setDataSource] = useState<any>()
    const [environmentName, setEnvironmentName] = useState("")
    const [environmentValue, setEnvironmentValue] = useState<any>()
    const handleOptionEn = (id: number) => {
        setSelectedEnvironment(id)
    }
    const handleOptionSave = () => {

        createEnv({
            projectId: 1,
            name: environmentName,
            variableDataList: environmentValue.map(item => ({
                name: item.name.value,
                value: item.value.value,
                description: item.description.value
            }))
        })
    }
    useEffect(() => {
        const temData = EnvironmentList.find(item => item.id == selectedEnvironment)?.url
        setDataSource(temData)

        // setDataSource()
    }, [selectedEnvironment]);
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
                        EnvironmentList.map(item => {
                            return (
                                <div
                                    onClick={() => handleOptionEn(item.id)}
                                    key={item.id}
                                    className={classNames({
                                        'text-[#b49ef3] bg-[#f2eefd] hover:bg-[#f2eefd]': selectedEnvironment == item.id,
                                        'text-textPrimary': selectedEnvironment != item.id,
                                        'mb-3  text-[15px] cursor-pointer hover:bg-[#f3f5f6] rounded-md py-1 pl-1': true,
                                    })}>
                                    <span className="text-[#b49ef3] text-sm mx-3">{item.title.substring(0, 1)}</span>
                                    {item.title}
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
                    {/*<GlobalVariableTable/>*/}
                    <div className="h-full flex-1 flex flex-col justify-between">
                        <FormTable columns={columns} onChangeValue={(e) => {
                            console.log(e, "打印")
                        }}/>
                        <div className="flex justify-end">
                            <Space>
                                <Button>取消</Button>
                                <Button type="primary">保存</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            }
            {
                selectedEnvironment > 0 && <div className="pl-4 flex-1  flex flex-col mt-4 justify-between">
                    <div>
                        <div className="mb-4 flex items-center">
                            <span className="mr-2 text-[#b49ef3]">测</span>
                            <Input placeholder="Borderless" variant="borderless" value="测试环境"/>
                        </div>
                        <div>
                            <div className="text-base mb-3">服务（前置URL）</div>
                            <FormTable dataSource={dataSource} columns={columns} onChangeValue={(e) => {
                                setValue(e);
                                console.log(e, "打印222")
                            }}/>
                        </div>
                        <div>
                            <div className="text-base mb-3 mt-3">环境变量</div>
                            <FormTable columns={columns2} onChangeValue={(e) => {
                                // setValue(e);
                                console.log(e, "打印22")
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Space>
                            <Button>取消</Button>
                            <Button type="primary">保存</Button>
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
                            <FormTable dataSource={dataSource} columns={columns} onChangeValue={(e) => {
                                setValue(e);
                                console.log(e, "打印222")
                            }}/>
                        </div>
                        <div>
                            <div className="text-base mb-3 mt-3">环境变量</div>
                            <FormTable columns={columns2} onChangeValue={(e) => {
                                setEnvironmentValue(e)
                                console.log(e, "打印22")
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Space>
                            <Button>取消</Button>
                            <Button type="primary" onClick={() => handleOptionSave()}>保存</Button>
                        </Space>
                    </div>
                </div>
            }
        </div>
    </Modal>
}
export default EnvironmentModal