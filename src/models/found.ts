import {Model,Effect} from "dva-core-ts";

import axios from "axios"

import { Reducer } from "redux"

const FOUND_URL ="/mock/21/found/list";


export interface IFound {
    id:string,
    title:string,
    videoUrl:string
}

// 发现模块 Model

interface FoundModel extends Model {
    namespace:"found",
    effects:{
        fetchList:Effect
    }
}

const fundModel:FoundModel ={
    namespace:"found",
    state:{},
    effects:{
        *fetchList({callback},{call}){
          const {data} =  yield call(axios.get,FOUND_URL)
        //   console.log(callback === "function",data)
          if(typeof callback === "function"){
              callback(data)
          }
        }

    }
}

export default fundModel