import {Button, Input, Tree} from "antd"
import React from "react";
import {PlusOutlined, DownOutlined, SmileOutlined, MehOutlined, FrownFilled, FrownOutlined} from "@ant-design/icons"
import {RequestMethod, RequestMethodColor} from "@/utils/RequestMethod";

const {DirectoryTree} = Tree;
const treeData = [
    {
        title: '全部接口',
        key: '0-all',
        children: [{
            title: 'parent 0',
            key: '0-0',
            children: [
                {
                    title: <span className="ml-6 text-[14px] text-textPrimary">获取接口</span>,
                    key: '0-0-0',
                    isLeaf: true,
                    icon: <span className="font-bold" style={{color: RequestMethodColor["POST"]}}>POST</span>
                },
                {
                    title: 'leaf 0-1',
                    key: '0-0-1',
                    isLeaf: true,
                },
            ],
        },
            {
                title: 'parent 1',
                key: '0-1',
                children: [
                    {
                        title: 'leaf 1-0',
                        key: '0-1-0',
                        isLeaf: true,
                    },
                    {
                        title: 'leaf 1-1',
                        key: '0-1-1',
                        isLeaf: true,
                    },
                ],
            },]
    }
];

const InterfaceTree = () => {
    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };
    const onExpand = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };
    return <div className="mr-1">
        <div className="text-textPrimary text-xl">接口管理</div>
        <div className="flex items-center mt-2">
            <Input/>
            <div className="ml-1">
                <Button icon={<PlusOutlined/>} type="primary"></Button>
            </div>
        </div>
        <div className="mt-2">
            <DirectoryTree
                className="bg-transparent text-[16px]"
                multiple
                defaultExpandAll
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={treeData}
            />
        </div>
    </div>
}

export default InterfaceTree