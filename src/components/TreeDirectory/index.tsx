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
import {RequestMethod, RequestMethodColor} from "@/utils/RequestMethod";

const {DirectoryTree} = Tree

interface ITreeDirectoryTYpe {
    data: IDirectory[],
    interfaceList: IInterface[]
    onChange?: (action: any, data: any) => void
    onClickNode: (data: any) => void
}

interface ITreeDirectoryNode {
    title: any,
    key: string | number,

    // isLeaf: boolean,
    // icon: any,
    children?: ITreeDirectoryNode[]
    parentId?: number
}

interface ITreeInterface {
    title: any,
    id: number;
    key: string | number,
    directoryId: number
}

const TreeDirectoryCom = ({data, onChange, interfaceList, onClickNode}: ITreeDirectoryTYpe) => {
    const [treeData, setTreeData] = useState<any>([])
    const [nameValue, setNameValue] = useState("")
    const [CascaderValue, setCascaderValue] = useState([])
    const [CascaderOptions, setCascaderOptions] = useState<any>([])
    const [ModalOpen, setModalOpen] = useState(false)
    const [loadedKeys, setLoadedKeys] = useState<any>([])
    const [checkNode, setCheckNode] = useState<any>()
    const dataList = [
        {
            title: "添加接口",
            icon: <SlidersOutlined className="text-[#ac94f0]"/>,
            func: (record?: any) => {
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
    const handleOptionNode = (record: any) => {
        setCheckNode(record.id)
        onClickNode(record)
    }
    const TreeDirectoryNode = (list: IDirectory[], interfaceList?: IInterface[]) => {
        // console.log()
        const map = new Map<number, ITreeDirectoryNode>();
        const interfaceMapList: ITreeInterface[] = []// 用于快速找到每个节点
        const result: ITreeDirectoryNode[] = [];

        interfaceList?.forEach(item => {
            interfaceMapList.push({
                title: <div
                    onClick={() => handleOptionNode(item)}
                    style={{backgroundColor: item.id == checkNode ? '#b3cef6' : ''}}
                    className="bg-opacity-5 px-2 rounded-md text-[14px] text-textPrimary group flex justify-between items-center ">
                    <div className="flex items-center justify-between">
                        <div style={{color: RequestMethod[item.restfulType].color}}
                             className="font-bold mr-1">{RequestMethod[item.restfulType].name}</div>
                        <div className="font-serif max-w-24 u-line-1"> {item.name}</div>
                    </div>
                    <div className="hidden group-hover:block"><DirectoryLabel data={item}/></div>
                </div>,
                key: 'interface' + item.id || 0,
                directoryId: item.directoryId,
                id: item.id || 0
            })
        })

        // 初始化所有节点并存入 map
        list.forEach(item => {
            map.set(item.id, {
                title: <span
                    className="ml-1 text-[14px] text-textPrimary group flex justify-between items-center group"> <div>
                    <FolderOpenOutlined
                        className="text-[20px] text-[#555555] mr-3"/>{item.name}
                </div>
                  <div className="hidden group-hover:block">  <DirectoryLabel data={item}/></div>
                </span>,
                key: "directory" + item.id,

            });
        });

        // 构建树结构
        list.forEach(item => {
            const node = map.get(item.id);
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

                }
            }
            interfaceMapList.forEach(i => {
                if (i.directoryId == item.id) {
                    const parentNode = map.get(i?.directoryId);
                    if (parentNode) {
                        if (!parentNode?.children) {
                            parentNode.children = []
                        }
                        parentNode.children?.push(i)
                    }
                }
            })
        });
        console.log(result, "result")
        return result;
    }

    const CascaderChange = (e: any) => {
        setCascaderValue(e)

    }
    const onSelect = () => {
        console.log("顶级")

    }
    const onExpand = () => {
        console.log("折叠收起")

    }
    useEffect(() => {
        const result = TreeDirectoryNode(data, interfaceList)
        console.log(result)
        setLoadedKeys(result.map(item => item.key))
        if (result.length) {
            console.log(result, 'jj')
            setTreeData([...result])
        }


    }, [data, checkNode,interfaceList])
    return <div className="mt-2 w-80">
        <Tree
            blockNode
            autoExpandParent
            defaultExpandAll={true}
            expandAction={false}
            selectable={false}
            showIcon={false}
            className="bg-transparent text-[16px]"
            multiple
            loadedKeys={loadedKeys}
            onSelect={() => onSelect()}
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