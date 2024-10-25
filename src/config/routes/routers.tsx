import {RouteObject,Navigate} from 'react-router-dom'

import App from "@/App";
import Definition from "@/pages/Api/Definition";
import Map from "@/pages/Map";

const routers: RouteObject[] = [{
    path: "/",
    element: <App/>,
    children: [
        {
            path: '/api',
            element: <Definition/>
        },
        {
            index: true,  // 这是根路径的默认子路由
            element: <Navigate to="/api" replace />  // 重定向到 /api
        }
    ]
},
    {
        path: "/map",
        element: <Map/>
        // element: <App/>,
        // children: [
        //     {
        //         path: '/api',
        //         element: <Definition/>
        //     }
        // ]
    }

]

export default routers
