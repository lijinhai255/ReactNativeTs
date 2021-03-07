import React from "react"
import Home from "@/pages/Home"

import { createMaterialTopTabNavigator, MaterialTopTabBar,MaterialTopTabBarProps } from "@react-navigation/material-top-tabs"
import { StyleSheet, View } from "react-native"

import TopTabBarWrapper from "@/pages/views/TopTabBarWrapper"
import { ScreenContainer } from "react-native-screens"
import { RootState } from "../models"
import {connect, ConnectedProps} from "react-redux"
import { ICategory } from "@/models/category"
import { createHomeModel } from "@/config/dva"
import ViewPagerAdapter from "react-native-tab-view-viewpager-adapter"
export type HomeParamList ={
    [key:string]:{
        namespace:string
    }
}

const Tab = createMaterialTopTabNavigator<HomeParamList>()
const mapStateToProps =({category}:RootState)=>{
    return {
        myCategorys:category?.myCategorys
    }
}
const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IPorps extends ModelState{}
class HomeTabs extends React.Component<IPorps> {
    renderTabBar=(props:MaterialTopTabBarProps)=>{
        return (
            <TopTabBarWrapper {...props}/>
        )
    }
    renderScreen =(item:ICategory)=>{
        createHomeModel(item.id)
        return (
            <Tab.Screen 
            name={item.id}
            key={item.id}
            component={Home} 
            options={{ tabBarLabel: item.name }}
            initialParams={{
                namespace:item.id
            }}
            />
        )

    }

    render() {
        const {myCategorys} = this.props
        return (
            <Tab.Navigator
                lazy
                tabBar={this.renderTabBar}
                pager={props=><ViewPagerAdapter {...props} />}
                sceneContainerStyle={style.ScreenContainer}    
                tabBarOptions={{
                    scrollEnabled: true,
                    tabStyle: {
                      padding: 0,
                      width: 80,
                    },
                    indicatorStyle: {
                      height: 4,
                      width: 20,
                      marginLeft: 30,
                      borderRadius: 2,
                      backgroundColor: '#fff',
                    },
                    activeTintColor: '#fff',
                    inactiveTintColor: '#fff',
                  }}
            >
                {myCategorys.map(this.renderScreen)}
                <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ tabBarLabel: "推荐" }}
                />

                {/* <Tab.Screen name="Home1" component={Home}></Tab.Screen>
                <Tab.Screen name="Home2" component={Home}></Tab.Screen> */}
            </Tab.Navigator>
        )
    }
}
const style = StyleSheet.create({
    ScreenContainer:{
        backgroundColor: 'transparent',
        position:"relative",
        // top:-20

    }
})
export default connector(HomeTabs)