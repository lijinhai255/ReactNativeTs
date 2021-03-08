import axios from "axios"
import {Model,Effect} from "dva-core-ts"
import { Reducer } from "redux"
import models from "."

const UESR_URL = "mock/21/login"


export interface IUser{
    name:string,
    avatar:string
}


export interface UserModelState {
    user?:IUser,
}

export interface UserModel extends Model {
    namespace:"user",
    state:UserModelState,
    effects:{
        login:Effect,
        logout:Effect,

    },
    reducers:{
        setState:Reducer<UserModelState>
    }
}

const initialState ={
    user:undefined,
}

const UserModel:UserModel ={
    namespace:"user",
    state:initialState,
    reducers :{
        setState(state,{payload}){
            return {
                ...state,
                ...payload
            }
        }
    },
    effects:{
        *login({payload},{call,put}){
           console.log(payload,"jll",UESR_URL)

           const {data,status,msg} =   yield call(axios.post,UESR_URL,payload)
           console.log(data,status,msg,"jll")

           if(status === 100){
               yield put({
                   type:"setState",
                   payload:{
                       user:data
                   }
               })
           }else{
               console.log(msg)
           }
        },
        *logout(_,{put}){
            yield put({
                type:"setState",
                payload:{
                    user:undefined
                }
            })
        }
    }
}

export default UserModel