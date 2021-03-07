import { RootState } from "@/models/index";
import React from "react"
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ListRenderItemInfo,
    ImageSourcePropType,
    Alert,
} from 'react-native';
import { connect, ConnectedProps } from "react-redux"
import Touchable from "@/components/Touchable"
import { IGuess } from "@/models/home"
import Icon from '@/assets/iconfont/index';
const mapStateToProps = ({home}: RootState) => ({
    guess: home?.guess,
  });
  
  const connector = connect(mapStateToProps);
  
  type ModelState = ConnectedProps<typeof connector>;
  
  interface IProps extends ModelState {
      namespace:string,
      goAlbum:(item: IGuess)=>void
    // onPress: (data: IGuess) => void;
  }
class Guess extends React.PureComponent<IProps> {
    componentDidMount() {
        const {dispatch,namespace} = this.props;
        // console.log(namespace,"namespace-namespace")
        dispatch({
          type: namespace+'/fetchGuess',
        });
      }
      changeBatch = () => {
        const {dispatch,namespace} = this.props;
        dispatch({
          type: namespace+'/fetchGuess',
        });
      };
    renderItem = ({ item }: { item: IGuess }) => {
        // console.log(item)
        const {goAlbum} = this.props
        return (
            <Touchable style={styles.item} onPress={() => { goAlbum(item) }}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <Text numberOfLines={2} style={{ textAlign: "center" }}>{item.title}</Text>
            </Touchable>
        )
    }
   
    render() {
        const { guess } = this.props
        // console.log(guess,"guess-guess-guess")
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="icon-xihuan" />
                        <Text style={styles.headerTitle}>猜你喜欢</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.moreTitle}>更多</Text>
                        <Icon name="icon-icon_more" />
                    </View>
                </View>
                <FlatList
                    data={guess}
                    renderItem={guess&&this.renderItem}
                    numColumns={3}
                    style={styles.list}
                    keyExtractor={item => item.id}
                ></FlatList>
                 <Touchable onPress={this.changeBatch} style={styles.changeBatch}>
          <Text>
            <Icon name="icon-huanyipi" size={14} color="red" /> 换一批
          </Text>
        </Touchable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        // padding: 2,
        margin: 16,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowColor: '#ccc',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#efefef',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTitle: {
        marginLeft: 5,
        color: '#333333',
      },
    moreTitle: {
        color: '#6f6f6f',
      },
    list: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom:10
    },
    item: {
        flex: 1,
        marginVertical: 5,
        marginHorizontal: 8
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#dedede',
    },
    changeBatch: {
        padding: 10,
        alignItems: 'center',
      },
})

export default connector(Guess)