import React from "react";
import {Outlet} from "react-router-dom";
import LeftNavigation from "@/layout/components/LeftNavigation";
import TopNavigation from "@/layout/components/TopNavigation";

const Basiclayout: React.FC = () => {
    return (
        <div className="flex ">
            <LeftNavigation/>
            <div className="flex-1  h-full w-full fixed left-36 right-0 flex flex-col">
                <TopNavigation/>
                <div className="px-2 py-3 h-0  flex-1  mr-36">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Basiclayout