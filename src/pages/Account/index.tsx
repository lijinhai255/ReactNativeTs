import React from "react"
import {
    View,
    Text,
    Button
  } from 'react-native';
import {RootStackNavigation} from "@/navigator/index"
  interface IProps {
    navigation:RootStackNavigation
  }
class Home extends React.PureComponent<IProps> {
  onPressFn=()=>{
    const {navigation} = this.props;
    navigation.navigate("Detail",{
      id:100
    })
  }
    render(){
         return (
            <View>
              <Text>Account</Text>
              <Button title="跳转到详情页" onPress={this.onPressFn}></Button>
            </View>
          );

    }


}

export default Home;