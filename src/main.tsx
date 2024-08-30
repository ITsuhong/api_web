// import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import './index.less'
import {RouterProvider} from "react-router-dom"
import {router} from "@/config/routes"

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
    // <StrictMode>
    //   <App />
    // </StrictMode>,
)
