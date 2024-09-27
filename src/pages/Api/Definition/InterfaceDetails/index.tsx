import React, {useState} from 'react';
import {Tabs} from 'antd';
import Documentation from "./Documentation"
import RunInterface from "./RunInterface"
import InterfaceItem from "@/pages/Api/Definition/InterfaceItem";

const InterfaceDetail = ({data, handleOptionDelete}: {
    data: any,
    handleOptionDelete: (id: number) => void
}) => {
    const handleOptionAction = (action: any, record: any) => {
        switch (action) {
            case "run":
                setActiveKey("3")
                break;
            case "delete":
                handleOptionDelete(record)
                break;
            default:
                break;
        }
    }
    const [activeKey, setActiveKey] = useState("1")
    const items = [{
        key: '1',
        label: '文档',
        children: <Documentation data={data} handleOptionAction={handleOptionAction}/>,
    },
        {
            key: '2',
            label: '修改文档',
            children: <InterfaceItem data={data} onReady={(data: any) => {

            }}/>,
        },
        {
            key: '3',
            label: '运行',
            children: <RunInterface data={data}/>,
        }
    ]
    const onChange = (e: any) => {
        console.log(e)
        setActiveKey(e)
    }
    return (
        <div className="overflow-auto h-full">
            <Tabs activeKey={activeKey} items={items} onChange={onChange}/>
        </div>
    )
}
export default InterfaceDetail