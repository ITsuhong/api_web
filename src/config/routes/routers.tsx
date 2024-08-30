import {RouteObject} from 'react-router-dom'

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
