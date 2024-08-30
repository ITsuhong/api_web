import React from "react";
import {Button} from 'antd';
import {getlist, ApiTest} from "@/apis/user"

const handleOption = () => {
    // getlist()
    ApiTest()
    console.log("hpust")
}
const Login: React.FC = () => {
    return <div>
        <Button type="primary" onClick={() => handleOption()}>测试</Button>
    </div>
}
export default Login