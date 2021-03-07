import { IProgram } from "@/models/album"
import { RootState } from "@/models/index"
import { types } from "@babel/core"
import React from "react"
import { View, Text, ListRenderItemInfo, StyleSheet, FlatList, Animated } from "react-native"
import { NativeViewGestureHandler } from "react-native-gesture-handler"
import { connect, ConnectedProps } from "react-redux"
import { ITanProps } from "../Tab"
import Item from "./item"

const mapStateToProps = ({ album }: RootState) => {
    return {
        list: album?.list
    }

}
const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>
type IProps = ModelState & ITanProps
class List extends React.Component<IProps>{
    state = {
        refreshing: false
    }
    onItemPress = (item: IProgram,index:number) => {
        console.log(item)
        const {onItemPress} = this.props
        onItemPress(item,index)
    }
    renderItem = ({ item, index }: ListRenderItemInfo<IProgram>) => {
        return (
            // <Text>{item.title}</Text>
            <Item key={index} data={item} 
            index={index} 
            onItemPress={this.onItemPress} />
        )
    }
    keyExtractor = (item: IProgram) => {
        return item.id

    }
    onRefresh = () => {
        console.log("shuxinle")
        this.setState({
            refreshing: true
        })
    }
    render() {
        const { list, panRef, tabRef, nativeRef, onScrollEndDrag, onScrollBeginDrag } = this.props
        let { refreshing } = this.state
        // console.log(list, "list-list")
        return <NativeViewGestureHandler simultaneousHandlers={panRef} ref={nativeRef} waitFor={tabRef}>
            <Animated.FlatList
                data={list}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                style={styles.flatlist}
                bounces={false}
                onScrollBeginDrag={onScrollBeginDrag}
                onScrollEndDrag={onScrollEndDrag}

            />
        </NativeViewGestureHandler>
    }
}
const styles = StyleSheet.create({
    flatlist: {
        backgroundColor: "#fff"
    }
})
export default connector(List)