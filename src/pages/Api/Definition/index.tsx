import React, {useEffect, useRef, useState} from 'react';
import Tabitem from "./TabItem/index"
import AddPage from "./AddPage";
import Icon from "@/components/Global/Icon"
import {Dropdown, Input, Tabs} from 'antd';

import {Button, Select} from 'antd';
import {MenuOutlined, PlusOutlined} from "@ant-design/icons";
import EnvironmentModal from "./EnvironmentModal/index";
import InterfaceItem from "./InterfaceItem";

import {observer} from "mobx-react"
import EnvironmentStore from "@/stores/environment";
import TreeDirectoryCom from "@/components/TreeDirectory";
import {selectAllDirectory} from "@/apis/directory";
import {selectInterface} from "@/apis/request"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabLabel = () => {
    return <div className="flex items-center">
        <Icon name="icon-kuaijiejiaoyi"/>
        <div className="ml-1">快捷请求</div>
    </div>
}

const AddLabel = () => {
    return <div className="flex items-center">

        <div className="ml-1">新建...</div>
    </div>
}
const initialItems = [
    {label: <TabLabel/>, children: <InterfaceItem/>, key: '1'},
    // {label: <TabLabel/>, children: <TestItem/>, key: '1'},
];
const Definition: React.FC = () => {

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [treeData, setTreeData] = useState<any>([])
    const [interfaceList, setInterfaceList] = useState<any>([])
    const handleOptionInterface = (record: any) => {
        console.log(record)
        if (record === 'quick') {
            const newActiveKey = `quick${newTabIndex.current++}`;
            const newPanes = [...items];
            newPanes.push({label: <TabLabel/>, children: <Tabitem/>, key: newActiveKey});
            setItems(newPanes);

            setActiveKey(newActiveKey);
        }
    }
    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };
    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({label: <AddLabel/>, children: <AddPage onChange={handleOptionInterface}/>, key: newActiveKey});
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
    const onTreeChange = (action: string, record: any) => {
        console.log(action, record)
        switch (action) {
            case "interface": {
                const newActiveKey = `interfaceItem${newTabIndex.current++}`
                const newPanes = [...items]
                newPanes.push({label: <TabLabel/>, children: <InterfaceItem/>, key: newActiveKey})
                setItems(newPanes);
                setActiveKey(newActiveKey);
            }
                break
            default:
                break
        }
    }
    useEffect(() => {
        console.log(EnvironmentStore.GlobalVariableList.length, '长度')
    }, [EnvironmentStore.GlobalVariableList]);

    useEffect(() => {
        selectAllDirectory().then(res => {
            setTreeData(res.data)
        })
        selectInterface().then(res => {
            setInterfaceList(res.data)
        })
    }, [])
    const RightNode = () => {

        return <div className="flex items-center">
            <Select
                placeholder="请选择环境"
                defaultValue={EnvironmentStore.selectEnvironment?.id}
                style={{
                    width: 120,
                }}
                onChange={(e) => {
                    EnvironmentStore.setSelectEnvironment(EnvironmentStore.list?.find(item => item?.id == e) || null)
                }}

                options={
                    EnvironmentStore.list.map(item => {
                        return ({
                            value: item.id,
                            label: <div><span
                                className='text-[12px] text-[#9373ee] mr-1'>{item.name.substring(0, 1)}</span> {item.name}
                            </div>,
                        })
                    })

                }
            />
            <Button onClick={() => setIsModalVisible(true)} icon={<MenuOutlined/>}/>
        </div>
    }
    return <div className="h-full flex">

        <div className="h-full  min-w-64">
            <div className="mr-1">
                <div className="text-textPrimary text-xl">接口管理</div>
                <div className="flex items-center mt-2">
                    <Input/>
                    <div className="ml-1">
                        <Button icon={<PlusOutlined/>} type="primary"></Button>
                    </div>
                </div>
                <div className="mt-2">
                    <TreeDirectoryCom data={treeData} interfaceList={interfaceList} onChange={onTreeChange}/>

                </div>

            </div>
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

const ObservedDefinition = observer(Definition);
export default ObservedDefinition