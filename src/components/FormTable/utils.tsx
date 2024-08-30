import {Button, Empty, Popover, Select} from "antd";
import {ForkOutlined, FunnelPlotOutlined, RightOutlined, SlidersOutlined} from "@ant-design/icons";
import React, {useState} from "react";


export const PopoverContent = ({data, valueIndex, onChangeValue}: {
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
    } | null>()
    const [isPopoverOpen, setPopoverOpen] = useState(false)
    const handleInsert = () => {
        console.log(valueIndex, variable)
        setPopoverOpen(false);
        onChangeValue({
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
                        setVariable({
                            index: index,
                            name: e,
                            value: e,
                            model: data.value,

                        })
                    }}

                    options={[{value: '名字', label: '名字'}, {value: 'token', label: 'token'}]}
                    optionRender={(option) => (
                        <div className="flex items-center justify-between text-textSecondary">
                            <div>{option.label}</div>
                            <div>环境变量</div>
                        </div>
                    )}
                />
            </div>
            {
                variable ? <div className="flex-1">
                    <div>{`{{${variable?.name}}}`}</div>
                    <div className="bg-[#fbfafe] text-sm p-2 rounded-md mt-2">预览:10</div>

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