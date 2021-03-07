import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { createMaterialTopTabNavigator, MaterialTopTabBar, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import Touchable from '@/components/Touchable';
import LinearAnimatedGradient from "react-native-linear-animated-gradient-transition"
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { types } from "@babel/core";
import { getActiveRouteName } from "@/utils/index";
import { useHeaderHeight } from "@react-navigation/stack"

const mapStateToProps = (state: RootState,props:MaterialTopTabBarProps) => {
    const routeName =  getActiveRouteName(props.state)
    const modelState = state[routeName]
    // console.log(home.carousel.length>0,home.carousel[home.activeCarouselIndex],home.activeCarouselIndex,home.activeCarouselIndex)
    return {
        linearColors: modelState.carousel.length > 0 ?
        modelState.carousel[modelState.activeCarouselIndex] ?
        modelState.carousel[modelState.activeCarouselIndex].colors :
                undefined :
            undefined,
        gradientVisble: modelState?.gradientVisble

    }

}
const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>
type IPorps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IPorps>{

    get linearGradient() {
        // console.log(this.props.linearColors)
        const { linearColors = ["#ccc", "#e2e2e2"], gradientVisble } = this.props
        // console.log(gradientVisble,"gradientVisble-gradientVisble")
        if (gradientVisble) {
            return (
                <LinearAnimatedGradient
                    colors={linearColors}
                    style={style.lieargradient}
                />
            )
        }
    }
    goCategory = () => {
        // console.log(121)
        const { navigation } = this.props
        navigation.navigate("Category")

    }
    render() {
        let { gradientVisble, indicatorStyle, ...resProps } = this.props
        let textStyle = style.text
        let activeTintColor = "#333"

        if (gradientVisble) {
            textStyle = style.whiteText
            activeTintColor = "#fff"
            if (indicatorStyle) {
                indicatorStyle = StyleSheet.compose(indicatorStyle, style.whiteBackGroungColor)
            }


        }
        return (

            <View style={style.container}>
                {this.linearGradient}
                <View style={style.topbarView}>
                    <MaterialTopTabBar
                        style={style.tabbar}
                        {...resProps}
                        activeTintColor={activeTintColor}
                        indicatorStyle={indicatorStyle}

                    />
                    <Touchable style={style.categoryBtn} onPress={this.goCategory}>
                        <Text style={textStyle}>
                            分类
                        </Text>
                    </Touchable>

                </View>
                <View style={style.searchBar}>
                    <Touchable style={style.search}>
                        <Text style={textStyle}>搜索按钮</Text>
                    </Touchable>
                    <Touchable style={style.history} >
                        <Text style={textStyle}>历史记录</Text>
                    </Touchable>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create(
    {
        container: {
            backgroundColor: "#fff",
            // backgroundColor:"red",
            paddingTop: getStatusBarHeight()
            
        },
        lieargradient: {
            ...StyleSheet.absoluteFillObject,
            height: 260,
            // top:100
            // position:"relative"

        },
        topbarView: {
            flexDirection: "row",
            alignItems: 'center',
            // top:20
            // backgroundColor:"red"

        },
        tabbar: {
            elevation: 0,
            flex: 1,
            backgroundColor: 'transparent',
        },
        categoryBtn: {
            paddingHorizontal: 10,
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderColor: "#ccc"

        },
        searchBar: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            paddingHorizontal: 15,
        },
        search: {
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 12,
            height: 40,
            borderRadius: 15,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        history: {
            marginLeft: 24,
        },
        text: {
            color: '#333',
        },
        whiteText: {
            color: "#fff"

        },
        whiteBackGroungColor: {
            backgroundColor: "#fff"
        }
    }
)



export default connector(TopTabBarWrapper)