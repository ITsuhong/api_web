import React, {memo, useEffect, useState} from "react";
import ReactJson from 'react-json-view';

interface ResultProps {
    data: string
}

const ViewJson: React.FC = ({data}: ResultProps) => {
    console.log("重新渲染")
    const [json, setJson] = useState();
    useEffect(() => {

        if (!data) return
        setJson(JSON.parse(data))
    }, [data])
    // 2.定义JSON Object类型的对象
    // const jsonObj = {
    //     name: 'lucy',
    //     sex: 'female',
    //     age: 18,
    // };
    return (
        <div className="select-text">
            {
                json && <ReactJson name={false} iconStyle="square" src={json}
                                   style={{fontSize: 16, width: "100%", wordBreak: "break-all"}}
                                   theme="shapeshifter:inverted"></ReactJson>
            }
            {
                !json && <div className="text-[#999]">暂无数据</div>
            }
        </div>
    );

}
export default memo(ViewJson)