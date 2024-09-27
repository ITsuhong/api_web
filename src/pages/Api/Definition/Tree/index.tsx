import {Button, Input, Tree, Tooltip, Popover, Modal, Select, Cascader, message} from "antd"
import React, {useState, useEffect} from "react";
import {selectInterface} from "@/apis/request"
import {
    PlusOutlined,

} from "@ant-design/icons"

import {createDirectory, selectAllDirectory} from "@/apis/directory"

const InterfaceTree = () => {

    const [treeData, setTreeData] = useState<any>([])
    useEffect(() => {
        console.log("请求")
        selectAllDirectory().then(res => {
            console.log(1111)
            setTreeData(res.data)
        })
        selectInterface()

    }, [])
    return <div className="mr-1">
        <div className="text-textPrimary text-xl">接口管理</div>
        <div className="flex items-center mt-2">
            <Input/>
            <div className="ml-1">
                <Button icon={<PlusOutlined/>} type="primary"></Button>
            </div>
        </div>
        <div className="mt-2">
            {/*<TreeDirectoryCom data={treeData}/>*/}

        </div>

    </div>
}

export default InterfaceTree