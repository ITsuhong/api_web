import {Button, Empty, Popover, Select, Tag} from "antd";
import {ForkOutlined, FunnelPlotOutlined, RightOutlined, SlidersOutlined, BoxPlotOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import EnvironmentStore from "@/stores/environment"
import {observer} from "mobx-react"
import {IVariable} from "@/apis/environment"

type IVariableWithLabel = IVariable & { label: string };
const Content = ({data, valueIndex, onChangeValue}: {
    data: any;
    valueIndex: number;
    onChangeValue: (e: any) => void
}) => {
    const [isInsert, setIsInsert] = useState(0)
    const [variable, setVariable] = useState<{
        index: number;
        name: string;
        value: string;
        model: string;
        id: number;
    } | null>()
    const [variablesList, setVariablesList] = useState<IVariableWithLabel[]>([])
    const [isPopoverOpen, setPopoverOpen] = useState(false)
    useEffect(() => {
        console.log(EnvironmentStore.GlobalVariableList.length, '11')
    }, []);
    const handleInsert = () => {
        setPopoverOpen(false);
        onChangeValue({
            id: variable?.id,
            index: valueIndex,
            name: variable?.name,
            value: variable?.value,
            model: variable?.model
        })
    }
    const ChoiceRender = () => {
        return <div onClick={() => setIsInsert(1)} className="border-t-[1px] w-80">

            <div
                className="cursor-pointer flex items-center mt-3 bg-[#fbfafe] p-3 rounded-md hover:bg-[#f7f4fe]">
                <ForkOutlined
                    className="mr-2 text-[#9373ee] text-xl"/>
                <div className="ml-3">
                    <div className="text-base">读取变量</div>
                    <div
                        className="text-sm text-textSecondary">读取环境变量/全局变量
                    </div>
                </div>
                <div className="flex-1 flex justify-end">
                    <RightOutlined className="font-serif"/>
                </div>
            </div>

            <div
                className="cursor-pointer flex items-center mt-3 bg-[#fffafd] p-3 rounded-md hover:bg-[#fef5fb]">
                <SlidersOutlined
                    className="mr-2 text-[#f37acf] text-xl"/>
                <div className="ml-3">
                    <div className="text-base">数据生成器</div>
                    <div
                        className="text-sm text-textSecondary">生成特定规则/随机数据（mock）
                    </div>
                </div>
                <div className="flex-1 flex justify-end">
                    <RightOutlined className="font-serif"/>
                </div>
            </div>
        </div>
    }
    useEffect(() => {
        console.log("渲染", EnvironmentStore.GlobalVariableList)
        // let tem=
        setVariablesList(EnvironmentStore.variableList)
    }, [EnvironmentStore.variableList]);
    const InsertRender = ({data, index}: any) => {

        return <div className="w-80 h-96 flex flex-col justify-between">
            <div className="bg-[#f9fafb] p-2 rounded-md">
                <div className="text-sm mb-1">变量名</div>
                <Select
                    dropdownStyle={{height: "250px", boxShadow: "none", border: "1px solid #d9d9d9"}}
                    showSearch
                    placeholder="输入或选择变量名字"
                    // defaultOpen={true}
                    style={{width: '100%'}}
                    size="small"
                    value={variable?.name}
                    onChange={(e) => {
                        console.log(e)
                        setVariable({
                            index: index,
                            name: variablesList?.find((item: any) => item.id == e)?.name || '',
                            value: variablesList?.find((item: any) => item.id == e)?.value || '',
                            model: data.value,
                            id: Number(e),

                        })
                    }}

                    options={variablesList?.map(item => ({value: item.id, label: item.name}))}
                    optionRender={(option) => (
                        <div className="flex items-center justify-between text-textSecondary">
                            <div>{option.label}</div>
                            <div> {variablesList?.find((item: any) => item?.id == option?.value)?.label || ''}</div>
                        </div>
                    )}
                />
            </div>
            {
                variable ? <div className="flex-1">

                    <div className="mt-2">
                        <Tag color="#55acee">
                            {`{{${variable.name}}}`}
                        </Tag>
                    </div>
                    <div className="bg-[#fbfafe] text-sm p-2 rounded-md mt-2 break-words">预览:{variable.value}</div>

                </div> : <Empty description={false}/>
            }
            <div className="flex justify-end">

                <Button type="primary" size="small" onClick={() => handleInsert()}>插入</Button>
            </div>
            {/*<div className="border-[1px]  rounded-md p-2 mt-2">*/}

            {/*</div>*/}
        </div>
    }
    return <Popover
        onOpenChange={(e) => {
            setIsInsert(0)
            setVariable(null)
            setPopoverOpen(e)
        }}
        open={isPopoverOpen}
        placement="right" title="插入动态值" trigger="click"
        content={isInsert ?
            <InsertRender data={data} index={valueIndex}/> :
            <ChoiceRender/>}
        className=" px-1 hover:bg-[#f6f6f7] cursor-pointer">
        <FunnelPlotOutlined/>
    </Popover>
}
export const PopoverContent = observer(Content)
