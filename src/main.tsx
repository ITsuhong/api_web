import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import './index.less'
import {RouterProvider} from "react-router-dom"
import {router} from "@/config/routes"


createRoot(document.getElementById('root')!).render(
    // <div>13</div>
    <RouterProvider router={router}/>
    // <StrictMode>
    //     <RouterProvider router={router}/>
    // </StrictMode>,
)
