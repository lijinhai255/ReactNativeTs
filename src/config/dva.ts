
import {create, Model} from "dva-core-ts"
import models from "@/models/index"

import createLoading from "dva-loading-ts"

import modelExtend from "dva-model-extend"
import homeModel from "@/models/home"
//  创建 实例
const app = create()

// 加载model 对象
models.forEach(model=>{
    app.model(model)
})
app.use(createLoading())
// 启动dva
app.start()
// 导出dva数据
export default app._store;

interface Cached {
    [key:string]:boolean
}

const cached:Cached ={
    home:true
}

function registerModel(model:Model){
    if(!cached[model.namespace]){
        app.model(model)
        cached[model.namespace] = true

    }
}

export function createHomeModel(namespace:string){
    const model =  modelExtend(homeModel,{namespace})
    // app.model(model)
    registerModel(model)
}
