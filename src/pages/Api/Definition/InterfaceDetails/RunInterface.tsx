import TabItem from "../TabItem";
import {IInterface} from "@/apis/request";

const RunInterface = ({data}: { data: IInterface }) => {
    return <div className="h-full"><TabItem data={data}/></div>
}
export default RunInterface