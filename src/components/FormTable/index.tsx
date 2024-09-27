import {Button, Input, Modal, Popover, Select, Empty, Tag, Tooltip} from "antd";
import {
    ExpandAltOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
import React, {useState, useEffect, memo, useCallback} from "react";
import classnames from 'classnames'
import {getUUid} from "@/utils/util"
import {PopoverContent} from "./utils"
import {observer} from "mobx-react"

const {TextArea} = Input;
import type {IPropsType, IStateType, IRefType} from "./type"


const FormTable = ({columns, onChangeValue, dataSource}: IPropsType) => {

    const [tableValue, setTableValue] = useState<IRefType[]>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [textAreaValue, setTextAreaValue] = useState("")
    const [indexValue, setIndexValue] = useState(0);
    const [typeValue, setTypeValue] = useState("")

    useEffect(() => {
        const tem: any = {id: getUUid()};
        columns.forEach(item => {
            tem[item.value] = {
                name: "",
                type: "text",
                value: ""
            }
        })
        setTableValue([tem])

    }, [])
    useEffect(() => {
        if (dataSource) {
            console.log(dataSource, "dataSoures", columns)
            setTableValue(dataSource.map((item: any) => {
                return {
                    ...item,
                    id: getUUid()
                }
            }))
            onChangeValue?.(dataSource)
        }
    }, [dataSource])

    const onChange = (e: any, index: number, type: string) => {

        if (tableValue) {
            const temTableValue: any = [...tableValue];
            console.log("改变", temTableValue)
            temTableValue[index][type].value = e.target.value;
            setTableValue(temTableValue)

            if (onChangeValue) {
                onChangeValue(temTableValue);
            }
        }


    };
    const handleOptionAdd = () => {
        const tem: any = {id: getUUid()};
        columns.forEach(item => {
            tem[item.value] = {
                name: "",
                type: "text",
                value: ""
            }
        })
        setTableValue([tem])
        if (tableValue) {
            setTableValue([...tableValue, tem])
        }

    }
    const handleOptionDelete = (index: number) => {
        if (tableValue?.length) {
            const temTableValue = tableValue
            temTableValue?.splice(index, 1)
            console.log('temTableValue', temTableValue)
            setTableValue([...temTableValue])
            if (onChangeValue) {
                onChangeValue(temTableValue);
            }
        }
    }
    const handleOk = () => {
        setIsModalOpen(false)
        const temTableValue: any = tableValue
        console.log(temTableValue?.[indexValue]?.[typeValue])
        if (temTableValue) {
            temTableValue[indexValue][typeValue]["value"] = textAreaValue;
        }

        setTableValue([...temTableValue])
        setTextAreaValue("")

    }

    const handleOptionOpen = (index: number, type: string) => {

        setIndexValue(index)
        setTypeValue(type)
        const typedKey = type as keyof IRefType;
        setTextAreaValue(tableValue?.[index]?.[typedKey]?.value as string);
        setIsModalOpen(true);
    }
    const handleOptionPopoverValue = (record: any) => {

        const tem: any = tableValue
        tem[record.index][record.model].value = record.value
        tem[record.index][record.model].type = "variable"
        tem[record.index][record.model].name = record.name

        setTableValue([...tem])
        onChangeValue?.([...tem])

    }
    const handleOptionTagClose = (record: any, index: number) => {
        console.log("改变", record, index)
        const tem: any = tableValue
        tem[index][record.value].value = ''
        tem[index][record.value].type = "text"
        tem[index][record.value].name = ''
        console.log(tem)
        setTableValue([...tem])
    }


    return (
        <div className="overflow-auto">
            <div className="border-[1px]  mb-2 rounded-md border-b-0 w-full">
                <div className="flex items-center border-b-[1px]">
                    {
                        columns.map((item, index) => {
                            return <div key={item.name} className={classnames({
                                'py-2 border-r-[1px] pl-3': true,
                                'flex-1 border-r-0': index == columns.length - 1
                            })}
                                        style={{width: item.width || 200 + 'px'}}>{item.name}</div>
                        })
                    }


                </div>
                {
                    tableValue && tableValue?.map((item, valueIndex) => {

                        return (
                            <div className="flex items-center border-b-[1px]" key={item.id}>
                                {
                                    columns.map((item, index) => {
                                        return <div className={classnames({
                                            "p-2 border-r-[1px]": true,
                                            "flex-1 border-r-0 flex items-center": index == columns.length - 1,
                                        })}
                                                    style={{width: item.width || 200 + 'px'}} key={item.name}>
                                            {
                                                tableValue[valueIndex][item.value]['type'] == 'text' &&
                                                <Input value={tableValue[valueIndex][item.value]['value']}
                                                       placeholder="Basic usage"
                                                       onChange={(e) => {
                                                           onChange(e, valueIndex, item.value)
                                                       }} suffix={
                                                    <>
                                                        {item.modal &&
                                                            <div onClick={() => handleOptionOpen(valueIndex, item.value)}
                                                                 className=" px-1 hover:bg-[#f6f6f7] cursor-pointer">
                                                                <ExpandAltOutlined/>
                                                            </div>
                                                        }
                                                        {
                                                            item.variable &&
                                                            <PopoverContent onChangeValue={handleOptionPopoverValue}
                                                                            data={item}
                                                                            valueIndex={valueIndex}/>
                                                        }

                                                    </>

                                                }/>
                                            }
                                            {
                                                tableValue[valueIndex][item.value]['type'] == 'variable' &&
                                                <Tooltip title={tableValue[valueIndex][item.value]['value']}>
                                                    <Tag color="#55acee" closeIcon onClose={() => {
                                                        handleOptionTagClose(item, valueIndex)
                                                    }}>
                                                        {`{{${tableValue[valueIndex][item.value]['name']}}}`}
                                                    </Tag>
                                                </Tooltip>

                                            }
                                            {
                                                index == columns.length - 1 &&
                                                <div onClick={() => handleOptionDelete(valueIndex)}
                                                     className="ml-2 text-red-600 cursor-pointer">
                                                    <MinusCircleOutlined/>
                                                </div>
                                            }
                                        </div>
                                    })
                                }

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

const ObserverFormTable = observer(FormTable)
export default ObserverFormTable