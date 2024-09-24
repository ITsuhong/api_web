import React from 'react';
import {Tabs} from 'antd';
import Documentation from "./Documentation"
import RunInterface from "./RunInterface"

const InterfaceDetail = ({data}: {
    data: any
}) => {
    const items = [{
        key: '1',
        label: '文档',
        children: <Documentation data={data}/>,
    },
        {
            key: '2',
            label: '修改文档',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: '运行',
            children: <RunInterface data={data}/>,
        }
    ]
    const onChange = () => {

    }
    return (
        <div className="overflow-auto h-full">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
        </div>
    )
}
export default InterfaceDetail