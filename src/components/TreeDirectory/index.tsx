import React, {useState, useEffect} from "react";
import {Cascader, Input, message, Modal, Popover, Tooltip, Tree} from "antd"
import {createDirectory, IDirectory, selectAllDirectory} from "@/apis/directory"

import {
    DeleteOutlined,
    DiffOutlined, FolderOpenOutlined,
    FormOutlined,
    PlusOutlined,
    SlidersOutlined,
    SmallDashOutlined
} from "@ant-design/icons";
import {TreeDirectory} from "@/utils/util";
import {IInterface} from "@/apis/request";

const {DirectoryTree} = Tree

interface ITreeDirectoryTYpe {
    data: IDirectory[],
    interfaceList: IInterface[]
    onChange?: (action: any, data: any) => void
}

interface ITreeDirectoryNode {
    title: any,
    key: string | number,
    // isLeaf: boolean,
    // icon: any,
    children?: ITreeDirectoryNode[]
}

const TreeDirectoryCom = ({data, onChange, interfaceList}: ITreeDirectoryTYpe) => {

    const [treeData, setTreeData] = useState<any>([])
    const [nameValue, setNameValue] = useState("")
    const [CascaderValue, setCascaderValue] = useState([])
    const [CascaderOptions, setCascaderOptions] = useState<any>([])
    const [ModalOpen, setModalOpen] = useState(false)
    const dataList = [
        {
            title: "添加接口",
            icon: <SlidersOutlined className="text-[#ac94f0]"/>,
            func: (record?: any) => {
                console.log(record)
                onChange?.('interface', record)
            }

        },
        {
            title: "重命名",
            icon: <FormOutlined/>
        },
        {
            title: "添加子目录",
            icon: <DiffOutlined/>,
            func: (record?: any) => {
                selectAllDirectory().then(res => {
                    console.log(res.data)
                    if (res?.data?.length) {
                        const result = TreeDirectory(res.data)
                        console.log(result)
                        setCascaderOptions([{label: "根目录", value: 0}, ...result])
                    }


                })
                setModalOpen(true)
            }
        },
        {
            title: "删除",
            icon: <DeleteOutlined/>
        }]
    const handleOk = async () => {
        const hide = message.loading({content: '操作中', key: 'loading'});
        // setModalOpen(false)
        console.log(nameValue, CascaderValue[CascaderValue.length - 1])

        const data = {
            projectId: 1,
            name: nameValue,
            pid: CascaderValue[CascaderValue.length - 1]
        }
        await createDirectory(data)
        hide();
        message.success("新建成功")
        setModalOpen(false)
    }
    const PopoverContent = (data: any) => {

        return (
            <div className="w-40 cursor-pointer">
                {
                    dataList.map(item => {
                        return (
                            <div key={item.title} onClick={() => item?.func && item?.func(data)}
                                 className="flex items-center px-2 py-1 rounded-md hover:bg-[#f6f6f7] mb-1 text-[16px]">
                                <div className="mr-2">
                                    {item.icon}
                                </div>
                                <div>{item.title}</div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
    const DirectoryLabel = ({data}: any) => {
        return (
            <div className="flex items-center">
                <div className="mr-3 text-sm">
                    <Tooltip title="添加接口">
                        <PlusOutlined/>
                    </Tooltip>

                </div>
                <div className="mr-3 text-sm ">
                    <Popover content={PopoverContent(data)} placement="bottom" arrow={false}>
                        <SmallDashOutlined/>
                    </Popover>
                </div>
            </div>
        )
    }
    const TreeDirectoryNode = (list: IDirectory[], interfaceList?: IInterface[]) => {
        const map = new Map<number, ITreeDirectoryNode>();
        const interfaceMap = new Map<number, ITreeDirectoryNode>()// 用于快速找到每个节点
        const result: ITreeDirectoryNode[] = [];
        console.log(interfaceList, 222)
        interfaceList?.forEach(item => {
            interfaceMap.set(item.directoryId, {
                title: <span className=" text-[14px] text-textPrimary group flex justify-between items-center group"> <div>
                   <span>POST</span>
                    {item.name}
                </div>
                  <div className="hidden group-hover:block">  <DirectoryLabel data={item}/></div>
                </span>,
                key: item.id || 0
            })
        })
        // 初始化所有节点并存入 map
        list.forEach(item => {
            map.set(item.id, {
                title: <span className=" text-[14px] text-textPrimary group flex justify-between items-center group"> <div>
                    <FolderOpenOutlined
                        className="text-[20px] text-[#555555] mr-3"/>{item.name}
                </div>
                  <div className="hidden group-hover:block">  <DirectoryLabel data={item}/></div>
                </span>,
                key: item.id,
            });
        });
        console.log(interfaceMap, '111')
        // 构建树结构
        list.forEach(item => {
            const node = map.get(item.id);
            const interfaceNode = interfaceMap.get(item.id)
            if (interfaceNode) {
                const parentNode = map.get(item.id);

                if (parentNode) {
                    console.log(parentNode, "服务")
                    // parentNode.children.push(node!);
                    // if (interfaceNode) {
                    //     parentNode.children.push(interfaceNode!)
                    // }

                }
            }
            // console.log(interfaceNode, 'pp')
            if (item.pid === 0) {
                // 如果 pid 为 0，则表示它是根节点
                result.push(node!);


            } else {
                // 否则，找到父节点并将当前节点加入其 children
                const parentNode = map.get(item.pid);

                if (parentNode) {
                    if (!parentNode.children) {
                        parentNode.children = [];
                    }
                    parentNode.children.push(node!);
                    if (interfaceNode) {
                        parentNode.children.push(interfaceNode!)
                    }

                }
            }


        });

        return result;
    }
    const CascaderChange = (e: any) => {
        console.log(e)
        setCascaderValue(e)

    }
    const onSelect = () => {

    }
    const onExpand = () => {

    }
    useEffect(() => {
        const result = TreeDirectoryNode(data, interfaceList)
        console.log(result)
        setTreeData([...result])
    }, [data])
    return <div className="mt-2">
        <DirectoryTree
            expandAction={false}
            selectable={false}
            showIcon={false}
            className="bg-transparent text-[16px]"
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
        />
        <Modal
            destroyOnClose={true}
            title="新建目录"
            open={ModalOpen}
            okText="确定"
            cancelText="取消"
            onOk={() => handleOk()} onCancel={() => {
            setModalOpen(false)
        }}

        >
            <div>
                <div className="mb-2">名称:</div>
                <Input onChange={(e) => {
                    console.log(e.target.value)
                    setNameValue(e.target.value)
                }}/>
            </div>
            <div className="w-full mt-4 mb-6">
                <div className="mb-2">父级目录:</div>
                <Cascader
                    defaultValue={[0]}
                    className="w-full"
                    // popupClassName="w-"
                    options={CascaderOptions?.map((item: any) => ({
                        label: item?.label,
                        value: item?.value,
                        children: item?.children || []
                    }))}
                    expandTrigger="hover"

                    onChange={CascaderChange}
                />
            </div>
        </Modal>
    </div>
}
export default TreeDirectoryCom