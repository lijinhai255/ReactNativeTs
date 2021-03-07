import { Model, Effect } from "dva-core-ts";

import { Reducer } from "redux"

import axios from "axios"

const ALBUM_URL = "/mock/13/album/list"
// 节目
export interface IProgram {
    id: string,
    title: string,
    playVolume: number,
    duration: number,
    date: string,
    serial: number

}
// 作者 
export interface IAutor {
    name: string,
    avatar: string,
}
// 频道
export interface IAlbumModelState {
    id: string,
    title: string,
    summary: string,
    thumbnailUrl: string,
    introduction: string,
    author: IAutor,
    list: IProgram[]
}

interface AlbumModel extends Model {
    namespace: "album",
    state: IAlbumModelState,
    effects: {
        fetchAlbum: Effect
    },
    reducers: {
        setState: Reducer<IAlbumModelState>
    }


}
const initialState: IAlbumModelState = {
    id: "",
    title: "",
    summary: "",
    thumbnailUrl: "",
    introduction: "",
    author: {
        name: "",
        avatar: "",
    },
    list: [{
        id: "",
        title: "",
        playVolume: 0,
        duration: 0,
        date: "",
        serial:0
    }]
}

const albumModel :AlbumModel ={
    namespace:"album",
    state:initialState,
    effects:{
        *fetchAlbum({payload},{call,put}){
            // console.log(payload,"payload")
            const {data} = yield call(axios.get,ALBUM_URL)
            // console.log(data,"data-data-data")
            yield put({
                type:"setState",
                payload:data

            })

        }

    },
    reducers:{
        setState(state=initialState,{payload}){
            return {
                ...state,
                ...payload
            }
        }
    }

}
export default albumModel