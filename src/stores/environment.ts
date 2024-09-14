import {makeAutoObservable} from "mobx"
import {IEnvironment, IVariable} from "@/apis/environment"
import {selectAllEnvironment, selectGlobalVariable} from "@/apis/environment"

interface Variable {
    id: number;
    name: string
    value: string
    description: string;
    label: string
}

class EnvironmentStore {
    list: IEnvironment[] = []
    GlobalVariableList: IVariable[] = []
    variableList: Variable[] = []
    selectEnvironment: IEnvironment | null = null

    constructor() {
        makeAutoObservable(this
        )
    }

    async setEnvList() {
        await selectAllEnvironment().then(res => {
            if (res.data?.length) {
                this.list = res.data
            }

        })
        await this.setGlobalVariableList();
        const gloList = this.GlobalVariableList.map(item => ({
            ...item,
            label: "全局变量"
        }))
        const vaList = this.list.map(item => {
            return item.variableDataList.map(k => ({...k, label: item.name}))
        })
        this.variableList = [...gloList, ...vaList.flat()]

    }

    async setGlobalVariableList() {
        await selectGlobalVariable().then(res => {
            if (res.data?.length) {
                this.GlobalVariableList = res.data
            }

        })
    }

    setSelectEnvironment(record: IEnvironment | null) {
        this.selectEnvironment = record;

    }

    get getList() {
        return this.list;
    }

    get getGlobalVariableList() {
        return this.GlobalVariableList;
    }

}

export default new EnvironmentStore()