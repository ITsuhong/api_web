import React from "react";
import Icon from "@/components/Global/Icon";

const LeftNavigation: React.FC = () => {
    const Static = [
        {
            name: '首页',
            path: '/'
        },
        {
            name: '用户管理',
            path: '/user'
        },
        {
            name: '角色管理',
            path: '/role'
        }
    ]
    return <div className="w-36 h-screen bg-primary pt-24">
        {
            Static.map(item => {
                return (
                    <div className="hover:bg-hoverBg px-2 py-4 flex items-center cursor-pointer" key={item.name}>
                        <div className="text-white">
                            <Icon name="icon-xiangmu_shezhi" size={20}/>
                        </div>
                        <div className="text-white ml-2">
                            {item.name}
                        </div>
                    </div>
                )
            })
        }

    </div>
}
export default LeftNavigation