import home from "./home"
import guress from './guress';
import categoryModel from "./category"
import albumModel from "./album"
import player from './player';
import fundModel from "./found"
import UserModel from "./user"

import {DvaLoadingState} from "dva-loading-ts"
import { types } from "@babel/core";

const models = [home,guress,categoryModel,albumModel,player,fundModel,UserModel]

export type RootState ={
    home: typeof home.state,
    guress: typeof guress.state,
    loading:DvaLoadingState,
    category:typeof categoryModel.state,
    album:typeof albumModel.state,
    player:typeof player.state,
    user:typeof UserModel.state
}&{
    [key:string]:typeof home.state
}
export default models