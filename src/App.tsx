import Basiclayout from "@/layout/Basiclayout";
import {ConfigProvider} from "antd";

function App() {

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token，影响范围大
                        colorPrimary: '#2252e7',

                    },
                    components: {
                        Radio: {
                            wrapperMarginInlineEnd: 20
                        },
                        Tree: {
                            directoryNodeSelectedBg: "rgb(34, 82, 231, 0.1)",
                            directoryNodeSelectedColor:"#222",
                            titleHeight:28
                        }
                    }
                }}>
                <Basiclayout/>
            </ConfigProvider>

        </>
    )
}

export default App
