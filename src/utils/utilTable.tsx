import type {IDirectory} from "@/apis/directory";
import {RequestMethodColor} from "@/utils/RequestMethod";
import {FolderOpenOutlined} from "@ant-design/icons"
import React from "react";

interface ITreeDirectoryNode {
    title: any,
    key: string | number,
    // isLeaf: boolean,
    // icon: any,
    children?: ITreeDirectoryNode[]
}

export const TreeDirectoryNode = (list: IDirectory[]) => {
    const map = new Map<number, ITreeDirectoryNode>(); // 用于快速找到每个节点
    const result: ITreeDirectoryNode[] = [];

    // 初始化所有节点并存入 map
    list.forEach(item => {
        map.set(item.id, {
            title: <span className=" text-[14px] text-textPrimary"> <FolderOpenOutlined
                className="text-[20px] text-[#555555] mr-3"/>{item.name}</span>,
            key: item.id,
            // isLeaf: true,
            // icon: <span className="font-bold" style={{color: RequestMethodColor["POST"]}}>POST</span>
            // icon: <FolderOpenOutlined/>
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
    });

    return result;
}