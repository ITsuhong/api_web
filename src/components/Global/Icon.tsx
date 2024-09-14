import React from "react";

interface ResultProps {
    name: string
    size?: number
}


const Icon: React.FC<ResultProps> = ({name, size}: ResultProps
) => {
    const fullName = "iconfont " + name
    console.log(fullName)
    return (
        <i className={`${fullName} text-[${size}px]`}></i>
    )
}
export default Icon