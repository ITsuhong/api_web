import React, {useRef, useState} from 'react';
import Tabitem from "./TabItem/index"
import Icon from "@/components/Global/Icon"
import {Dropdown, Tabs} from 'antd';
import Tree from "./Tree/index"
import {Button, Select} from 'antd';
import {MenuOutlined} from "@ant-design/icons";
import EnvironmentModal from "./EnvironmentModal/index";
import FormTable from "@/components/FormTable";
import TestItem from "@/pages/Api/Definition/TestItem";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabLabel = () => {

    return <div className="flex items-center">
        <Icon name="icon-kuaijiejiaoyi"/>
        <div className="ml-1">快捷请求</div>
    </div>
}
const initialItems = [
    {label: <TabLabel/>, children: <Tabitem/>, key: '1'},
    // {label: <TabLabel/>, children: <TestItem/>, key: '1'},
];
const Definition = () => {

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };
    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({label: <TabLabel/>, children: <Tabitem/>, key: newActiveKey});
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    const RightNode = () => {

        return <div className="flex items-center">
            <Select

                defaultValue="lucy"
                style={{
                    width: 120,
                }}

                options={[
                    {
                        value: 'lucy',
                        label: <div><span className='text-[12px] text-[#9373ee] mr-1'>测</span> 测试环境</div>,
                    },
                ]}
            />
            <Button onClick={() => setIsModalVisible(true)} icon={<MenuOutlined/>}/>
        </div>
    }
    return <div className="h-full flex">

        <div className="h-full  min-w-64">
            <Tree/>
        </div>
        <div className="bg-white h-full border-[1px]  p-3 flex-1 max-w-full w-0 ">

            <Tabs
                className="h-full"
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
                tabBarExtraContent={{
                    right: <RightNode/>
                }}
            >

            </Tabs>
        </div>
        <EnvironmentModal isModalOpen={isModalVisible} onChange={() => setIsModalVisible(false)}/>
    </div>

}


export default Definition