import { RootState } from "@/models/index"
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { ICategory } from "@/models/category"
import { viewportWidth } from "@/utils/index"
import _ from "lodash"
import { ScrollView } from "react-native-gesture-handler"
import Item from "./item"
import { RootStackNavigation } from "@/navigator/index"
import HeaderRightButton from "./HeaderRightButton"
import Touchable from "@/components/Touchable"
import {DragSortableView } from "react-native-drag-sort"
import {parentWidth,itemWidth,childrenHeight,margin} from "./item"
const mapStateToProps = ({ category }: RootState) => {
    return {
        myCategorys: category?.myCategorys,
        categorys: category?.categorys,
        isEdit: category?.isEdit
    }

}
const connector = connect(mapStateToProps)
const fixedItems = [0,1]

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation
}

interface IState {
    myCategorys: ICategory[],

}



class Category extends React.Component<IProps, IState>{
    onSubmit = () => {
        const { dispatch,navigation,isEdit } = this.props;
        const {myCategorys} = this.state
        dispatch({
            type: "category/toggle",
            payload:{
                myCategorys
            }
        })
        isEdit&&navigation.goBack()
    }
    constructor(props: IProps) {
        super(props)
        props.navigation.setOptions({
            headerRight: () => <HeaderRightButton onSubmit={this.onSubmit}></HeaderRightButton>
        })
        // props.navigation.screenOptions.headerStyle = {
        //     height:120,
        // }

    }
    state = {
        myCategorys: this.props.myCategorys
    }
    onLongPressFn = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "category/setState",
            payload: {
                isEdit: true
            }
        })
    }
    onPressFn = (item: ICategory, index: number,select:boolean) => {
        const { isEdit } = this.props
        const { myCategorys } = this.state
        const disabled = fixedItems.indexOf(index)>-1
        if(disabled) return 
        if (isEdit) {
            if(select){// 删除
                this.setState({
                    myCategorys: myCategorys.filter(selectItem=>selectItem.id!==item.id)
                })
            }else{
                this.setState({
                    myCategorys: myCategorys.concat([item])
                })
            }
        }
    }
    renderItem = (item: ICategory, index: number) => {
        const { isEdit } = this.props
        const disabled = fixedItems.indexOf(index)>-1
        return <Item 
        key={item.id}
        // onPress={() => this.onPressFn(item, index,true)}
        // onLongPress={this.onLongPressFn}
        data={item} 
        isEdit={isEdit} 
        disabled={disabled} 
        selected={false}></Item>
       

    }
    renderUnSelectItem = (item: ICategory, index: number) => {
        const { isEdit } = this.props
        return <Touchable
            key={item.id}
            onPress={() => this.onPressFn(item, index,false)}
            onLongPress={this.onLongPressFn}
        >
            <Item data={item} isEdit={isEdit} selected={true}></Item>
        </Touchable>

    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: "category/setState",
            payload: {
                isEdit: false
            }
        })

    }
    onDataChange=(data:ICategory[])=>{
        this.setState({
            myCategorys:data
        })

    }
    onClickItem=(data:ICategory[],item:ICategory)=>{
        this.onPressFn(item,data.indexOf(item),true)

    }
    render() {
        const { categorys,isEdit } = this.props;
        const { myCategorys } = this.state
        // console.log(myCategorys,"myCategorys-myCategorys")
        const clasifyGroup = _.groupBy(categorys, (item) => item.classify)
        // console.log(Object.keys(clasifyGroup),"clasifyGroup")
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.classifyName}>我的分类</Text>
                <View style={styles.classifyView}>
                    {/* {myCategorys.map(this.renderItem)} */}
                    <DragSortableView
                        dataSource={myCategorys}
                        fixedItems={fixedItems}
                        renderItem={this.renderItem}
                        sortable={isEdit}
                        keyExtractor={item=>item.id}
                        onDataChange={this.onDataChange}
                        parentWidth={parentWidth}
                        childrenWidth={itemWidth}
                        childrenHeight={childrenHeight}
                        marginChildrenTop={margin}
                        onClickItem={this.onClickItem}
                    />
                </View>
                {
                    Object.keys(clasifyGroup).map(clasify => (
                        <View key={clasify}>
                            <View>
                                <Text style={styles.classifyName}>{clasify}</Text>
                            </View>
                            <View style={styles.classifyView}>
                                {clasifyGroup[clasify].map((item, index) => {
                                    if (myCategorys.find(selectItem => selectItem.id === item.id)) {
                                        return
                                    }
                                    return this.renderUnSelectItem(item, index)

                                })}
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6f6',

    },
    classifyName: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: 14,
        marginLeft: 10,
    },
    classifyView: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5
    },

})

export default connector(Category);