import {Effect, Model, useSelector,} from "dva-core-ts"
import {Reducer} from "redux"
import { RootState } from "."

import axios from "axios"
const CAROUSEL_URL = '/mock/13/carousel'; // 轮播图
const GUESS_URL = '/mock/13/guess'; // 猜你喜欢
const CHANNEL_URL = '/mock/13/channel'; // 猜你喜欢
export interface ICarousel {
    colors: any;
    id:number,
    image:string,
    color:[string,string]
}
export interface IGuess{
    id:string,
    image:string,
    title:string

}
export interface IChannel {
    id: string;
    image: string;
    title: string;
    played: number;
    playing: number;
    remark: string;
  }
  export interface IPagination {
    current:number,
    total:number,
    hasMore:boolean,
}
export interface HomeState {
    carousel:ICarousel[],
    activeCarouselIndex:number,
    guess:IGuess[],
    gradientVisble:boolean,//当前渐变色 状态
    channels:IChannel[],
    pagination:IPagination
}


interface HomeModel extends Model{
    namespace: 'home';
    state: HomeState;
    reducers?:{
        setState:Reducer<HomeState>
    };
    effects?:{
        fetchCarousel:Effect
        fetchGuess:Effect,
        fetchChannel:Effect
    }
}
const initialState ={
    carousel:[],
    guess:[],
    activeCarouselIndex:0,
    gradientVisble:true,
    channels:[],
    pagination:{
        current:1,
        total:0,
        hasMore:true
    }
}
const homeModel:HomeModel ={
    namespace:'home',
    state:initialState,
    reducers:{
        setState(state=initialState,{payload}){
            return {
                ...state,
                ...payload
            }
        }
    },
    effects:{
        *fetchCarousel(_,{call,put}){
           const {data} =  yield call(axios.get,CAROUSEL_URL)
           yield put({
            type: 'setState',
            payload: {
                carousel: data,
            },
          });
        },
        *fetchGuess(_,{call,put}){
            // console.log("2",CHANNEL_URL)
            const {data} = yield  call(axios.get,GUESS_URL)
        //    console.log(data, axios.defaults.baseURL ,"data-data-data")
           yield put({
            type: 'setState',
            payload: {
                guess: data,
            },
          });
        },
        *fetchChannel({callback,payload},{call,put,select}){
            const {channels,pagination} =  yield select((state:RootState)=>state.home)
            // console.log(channels,"channel-channel")
            let page = 1;
            if(payload&&payload.loadMore){
                page = pagination.current +1;
            }
            const {data}  = yield call(axios.get,CHANNEL_URL,{
                params:{
                    page
                }
            })
            let newChannels = data.results;
        //    console.log(data,"fetchChannel-dfetchChannelata-fetchChannel")
            if(payload&&payload.loadMore){
                newChannels = channels.concat(newChannels)
            }
            // console.log(newChannels.length<data.pagination.total,newChannels.length,data.pagination.total)
            yield put({
                type:"setState",
                payload:{
                    channels:newChannels,
                    pagination:{
                        current:data.pagination.current,
                        total:data.pagination.total,
                        hasMore:newChannels.length<data.pagination.total
                    }
                }
            })
            if(typeof callback === "function"){
                callback()
            }
        }

    }

}

export default homeModel