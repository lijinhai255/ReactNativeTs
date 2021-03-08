import React from "react"
import {
  View,
  Text,
  Button,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { RootStackNavigation } from "@/navigator/index"
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { IFound } from "@/models/found"
import Item from "./FoundItem"
const connector = connect()

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
  navigation: RootStackNavigation
}

interface IState {
  list: IFound[],
  currentId: string
}
class Home extends React.PureComponent<IProps, IState> {
  state = {
    list: [],
    currentId: ""
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: "found/fetchList",
      callback: (data: IFound[]) => {
        // console.log(data,"data-data")
        this.setState({
          list: data
        })
      }
    })
  }
  renderItem=({item}:ListRenderItemInfo<IFound>)=>{
    const paused = item.id !== this.state.currentId;
    return (
      <Item item={item&&item} paused={paused} setCurrentId={this.setCurrentId} />
    )

  }
  setCurrentId=(id:string)=>{
    this.setState({
      currentId:id
    })
    const {dispatch} = this.props
    console.log(id,"id-id")
    if(id){
      dispatch({
        type:"player/pause"
      })

    }

  }

  render() {
    const {list} = this.state
    console.log(list,"list")
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        extraData={this.state.currentId}
      />
    );

  }


}

export default connector(Home);