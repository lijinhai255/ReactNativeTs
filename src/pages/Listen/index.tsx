import React from "react"
import {
  View,
  Text,
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Image
} from 'react-native';
import { RootStackNavigation } from "@/navigator/index"
import realm, { IProgram,deleteProgram } from "@/config/realm";
import Icon from "@/assets/iconfont"
import { formatTime } from "@/utils/index";
import { flattenDepth } from "lodash";
import Touchable from "@/components/Touchable";
interface IProps {
  navigation: RootStackNavigation
}
class Home extends React.PureComponent<IProps> {
  onPressFn = () => {
    const { navigation } = this.props;
    // navigation.navigate("Detail",{
    //   id:100
    // })
  }
  renderItem = ({ item }: ListRenderItem<IProgram & Realm.Object>) => {
    // console.log(item, "item-item", item.title)
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text>{item.title}</Text>
          <View style={styles.bottom}>
            <Icon name="icon-time" color="#999" size={14}></Icon>
            <Text style={styles.text}>{formatTime(item.currentTime)}</Text>
            <Text style={styles.rate}>已播放{item.rate}%</Text>
          </View>
        </View>
        <Touchable style={styles.del} onPress={()=>this.delFn(item)} >
          <Icon name="icon-shanchu1" color="#999" size={14}/>
        </Touchable>
      </View>
    )
  }
  delFn=(item)=>{
    const program = realm.objects("Program").filtered(`id='${item.id}'`)
    console.log(program,"program")
    // realm.delete(program)
    realm.write(() => {
    console.log(`id='${item.id}'`,"jll")
      realm.delete(item);
    });
    this.setState({})

  }
  render() {
    // const {loading} = 
    const programs = realm.objects<IProgram>("Program")
    console.log(programs, "programs")
    return (
      <FlatList
        data={programs}
        // refreshing={loading}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      >
      </FlatList>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    // padding: 10,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal:10,
    marginVertical:10,
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
    borderRadius:5,
  },
  content:{
    // display:"flex",
    flex:1,
    height:40,
    justifyContent:"space-around",
  },
  bottom: {
    flexDirection: "row",
    alignContent: "center",
    marginTop:20,
    // marginHorizontal:10
  },
  text: {
    color: "#999",
    marginLeft: 5

  },
  rate:{
    marginLeft:20,
    color:"#f6a624"
  }, 
  del:{
      padding:10,
      justifyContent:"center"
  }
})

export default Home;