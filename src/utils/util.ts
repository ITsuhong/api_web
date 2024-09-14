import type {IDirectory} from "@/apis/directory"
import {RequestMethodColor} from "@/utils/RequestMethod";
import React from "react";

interface ITreeDirectory {
    value: number;
    label: string;
    children?: ITreeDirectory[];
}


export const getUUid = () => {
    return 'id-' + Math.random().toString(36).substring(2, 9);
}

export const TreeDirectory = (list: IDirectory[]) => {
    const map = new Map<number, ITreeDirectory>(); // 用于快速找到每个节点
    const result: ITreeDirectory[] = [];

    // 初始化所有节点并存入 map
    list.forEach(item => {
        map.set(item.id, {value: item.id, label: item.name});
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


