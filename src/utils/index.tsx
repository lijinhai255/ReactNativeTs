import {Dimensions} from "react-native"
import {NavigationState} from "@react-navigation/native"
const {width:viewportWidth,height:viewportHeight} = Dimensions.get("window")


// 百分比 获取宽度
function wp(percentage:number){
    const value = (percentage*viewportWidth) /100
    return Math.round(value)
}
function hp(percentage:number){
    const value = (percentage*viewportHeight) /100
    return Math.round(value)
}
function getActiveRouteName(state:NavigationState){
    let route;
    route = state.routes[state.index]
    while(route.state&&route.state.index){
        route = route.state.routes[route.state.index]
    }
    return route.name
}
function formatTime(seconds: number) {
    const m = parseInt((seconds % (60 * 60)) / 60 + '', 10);
    const s = parseInt((seconds % 60) + '', 10);
    // console.log(m,s,"m","s")
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }
  
export {
    viewportWidth,
    viewportHeight,
    wp,
    hp,
    getActiveRouteName,
    formatTime
}