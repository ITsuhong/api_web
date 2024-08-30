import React from "react";
import {DownOutlined} from '@ant-design/icons';

const TopNavigation: React.FC = () => {
    return <div className="px-3 py-2 border-b-2  bg-white">
        <div className="flex items-center cursor-pointer">
            <div className="w-40 text-[16px] text-textPrimary">
                项目:演示项目
            </div>
            <DownOutlined className="text-[12px] text-textPrimary"/>
        </div>
    </div>
}
export default TopNavigation