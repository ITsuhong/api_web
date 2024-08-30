import {Input, Button, Modal} from 'antd';
import {useState, forwardRef, useImperativeHandle} from "react"
import {
    MinusCircleOutlined,
    ExpandAltOutlined
} from '@ant-design/icons';
import type {RequestTableType} from "@/apis/request"
import type {IRef} from "./type"

const {TextArea} = Input;

interface ResultProps {
    type: string,
    height: number
}

const DataTable = (props: ResultProps, ref) => {
    const [tableValue, setTableValue] = useState<RequestTableType[]>([{
        id: 1,
        name: "",
        value: "",
        type: 1,
        desc: ""
    }])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [textAreaValue, setTextAreaValue] = useState("")
    const [indexValue, setIndexValue] = useState(0);
    useImperativeHandle(ref, () => ({
        getInfo: getInfo
    }))
    const onChange = (e: any, index: number, type) => {

        const temTableValue = [...tableValue]
        temTableValue[index][type] = e.target.value
        setTableValue(temTableValue)
        console.log(tableValue)
    }
    const handleOptionAdd = () => {
        setTableValue([...tableValue, {
            id: tableValue[tableValue.length - 1]?.id + 1,
            name: "",
            value: "",
            type: 1,
            desc: ""
        }])
    }
    const handleOptionDelete = (index) => {
        const temTableValue = tableValue
        temTableValue.splice(index, 1)
        setTableValue([...temTableValue])
    }
    const handleOk = () => {
        setIsModalOpen(false)
        const temTableValue = tableValue
        temTableValue[indexValue].value = textAreaValue
        setTableValue([...temTableValue])
        setTextAreaValue("")

    }
    const handleCancel = () => {

    }
    const handleOptionOpen = (index: number) => {
        setIndexValue(index)
        setTextAreaValue(tableValue[index].value)
        setIsModalOpen(true);
    }
    const getInfo = () => {
        return {
            type: props.type,
            info: tableValue
        }
    }
    return (
        <div className="overflow-auto" style={{maxHeight: props.height + 'px'}}>
            <div className="border-[1px]  mb-2 rounded-md border-b-0 ">
                <div className="flex items-center border-b-[1px]">
                    <div className="w-1/5 py-2 border-r-[1px] pl-3">参数名</div>
                    <div className="w-1/5 py-2 border-r-[1px] pl-2">参数值</div>
                    <div className="w-1/12 py-2 border-r-[1px] pl-2">类型</div>
                    <div className="flex-1 py-2 border-r-[1px] pl-3">说明</div>

                </div>
                {
                    tableValue.map((item, index) => {
                        return (
                            <div className="flex items-center border-b-[1px]" key={item.id}>
                                <div className="w-1/5 p-2 border-r-[1px]">
                                    <Input placeholder="Basic usage" onChange={(e) => {
                                        onChange(e, index, 'name')
                                    }}/>
                                </div>
                                <div className="w-1/5 p-2 border-r-[1px]">
                                    <Input value={tableValue[index].value} placeholder="Basic usage" onChange={(e) => {
                                        onChange(e, index, 'value')
                                    }} suffix={
                                        <div onClick={() => handleOptionOpen(index)}
                                             className=" px-1 hover:bg-[#f6f6f7] cursor-pointer">
                                            <ExpandAltOutlined/>
                                        </div>
                                    }/>
                                </div>
                                <div className="w-1/12 p-2 border-r-[1px]">
                                    <Input placeholder="Basic usage" onChange={(e) => {
                                        onChange(e, index, 'type')
                                    }}/>
                                </div>
                                <div className="flex-1 p-2 border-r-[1px] flex items-center">
                                    <Input placeholder="Basic usage" onChange={(e) => {
                                        onChange(e, index, 'desc')
                                    }}/>
                                    <div onClick={() => handleOptionDelete(index)}
                                         className="ml-2 text-red-600 cursor-pointer">
                                        <MinusCircleOutlined/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div className="mb-3">
                <Button type="dashed" block onClick={() => handleOptionAdd()}>
                    添加一行数据
                </Button>

            </div>
            <Modal title="编辑" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <TextArea value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} rows={7}/>
            </Modal>
        </div>

    )
}
export default forwardRef<IRef>(DataTable)