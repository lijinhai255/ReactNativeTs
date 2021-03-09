import axios from "axios"
import {Model,Effect, SubscriptionsMapObject} from "dva-core-ts"
import { Reducer } from "redux"
import models from "."
import {goBack} from '@/utils/index';
import storage, {load} from '@/config/storage';
import Toast from 'react-native-root-toast';

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
        loadStorage:Effect

    },
    reducers:{
        setState:Reducer<UserModelState>
    },
    subscriptions: SubscriptionsMapObject;

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
               storage.save({
                key: 'user',
                data,
              });
              console.log(12121)
                goBack();

           }else{
               console.log(msg)
               Toast.show(msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
              });
              console.log(msg);
           }
        },
        *logout(_,{put}){
            yield put({
                type:"setState",
                payload:{
                    user:undefined
                }
            })
            storage.save({
                key: 'user',
                data: null,
              });
        },
        *loadStorage(_,{put,call}){
            try {
                const user = yield call(load, {key: 'user'});
                yield put({
                  type: 'setState',
                  payload: {
                    user,
                  },
                });
              } catch (error) {
                console.log('保存用户信息错误', error);
              }
        }
    },
    subscriptions:{
        setup({dispatch}) {
            dispatch({
              type: 'loadStorage',
            });
          },
    }
}

export default UserModel