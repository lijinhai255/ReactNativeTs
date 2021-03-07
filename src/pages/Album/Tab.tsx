import { IProgram } from "@/models/album"
import React from "react"
import { View, Text, StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { PanGestureHandler, TapGestureHandler, NativeViewGestureHandler } from "react-native-gesture-handler"
import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view"
import Introduction from "./Introduction"
import List from "./LIst/index"
interface IRoute {
    key: string,
    title: string
}
interface IState {
    routes: IRoute[],
    index: number
}
export interface ITanProps {
    panRef: React.RefObject<PanGestureHandler>,
    tabRef: React.RefObject<TapGestureHandler>,
    nativeRef: React.RefObject<NativeViewGestureHandler>,
    onScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
    onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
    onItemPress: (data: IProgram, index: number) => void


}
class Tab extends React.Component<ITanProps, IState> {
    state = {
        index: 1,
        routes: [
            { key: 'introduction', title: '简介' },
            { key: 'albums', title: '节目' },
        ],
    };
    onIndexChange = (index: number) => {
        // console.log("jll")
        this.setState({
            index
        })
    }
    renderScene = ({ route }: { route: IRoute }) => {
        // console.log(1212121, route.key === "albums",route)
        const { panRef, tabRef, nativeRef, onScrollEndDrag, onScrollBeginDrag, onItemPress } = this.props
        switch (route.key) {
            case "introduction":
                return <Introduction />
            case "albums":
                return <List panRef={panRef}
                    onScrollEndDrag={onScrollEndDrag}
                    onScrollBeginDrag={onScrollBeginDrag}
                    onItemPress={onItemPress}
                    tabRef={tabRef} nativeRef={nativeRef} />
        }
    }
    renderTabBar = (props: SceneRendererProps & { navigationState: IState }) => {
        return <TabBar
            {...props}
            scrollEnabled
            tabStyle={styles.tabStyle}
            labelStyle={styles.labelStyle}
            style={styles.tabbar}
            indicatorStyle={styles.indicatorStyle}
        />
    }
    render() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={this.onIndexChange}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}

            />
        )
    }
}
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    tabStyle: {
        width: 80,
    },
    labelStyle: {
        color: "#000"
    },
    tabbar: {
        backgroundColor: '#fff',
        ...Platform.select({
            android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#e3e3e3',
            },
        }),
    },
    indicatorStyle: {
        backgroundColor: "#eb6d48",
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderColor: "#fff"

    }
});

export default Tab