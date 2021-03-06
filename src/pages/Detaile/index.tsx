import React from "react"
import { RouteProp } from "@react-navigation/native"
import { ModalStackNavigation, ModalStackParamList, RootStackParamList } from "@/navigator/index"
import {
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItemInfo,
  Text,
  StyleSheet,
  Animated
} from 'react-native';
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import Icon from '@/assets/iconfont/index';
import PlaySlide from "./PlaySlider"
import LinearGradient from 'react-native-linear-gradient';
import Barrage, {Message} from '@/components/Barrage';
const mapStateToProps = ({ player }: RootState) => {
  return {
    id: player.id,
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    thumbnailUrl: player.thumbnailUrl,
    previousId: player.previousId,
    nextId: player.nextId,
  }
}
import { viewportWidth } from '@/utils/index';
import Touchable from "@/components/Touchable";
const data: string[] = [
  '最灵繁的人也看不见自己的背脊',
  '朝闻道，夕死可矣',
  '阅读是人类进步的阶梯',
  '内外相应，言行相称',
  '人的一生是短的',
  '抛弃时间的人，时间也抛弃他',
  '自信在于沉稳',
  '过犹不及',
  '开卷有益',
  '有志者事竟成',
  '合理安排时间，就等于节约时间',
  '成功源于不懈的努力',
];

const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>
interface IPorps extends ModelState {
  route: RouteProp<ModalStackParamList, "Detail">,
  navigation: ModalStackNavigation;
}
interface IState {
  barrage: boolean;
  barrageData: Message[];
}
const IMAGE_WIDTH = 180;
const SCALE = viewportWidth / IMAGE_WIDTH;

const USE_NATIVE_DRIVER = true;
function randomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

function getText() {
  return data[randomIndex(data.length)];
}
let timmer:any = null

class Detail extends React.PureComponent<IPorps, IState>{
  state = {
    barrage: false,
    barrageData: [],
  };
  anim = new Animated.Value(1);
  componentDidMount() {
    const {dispatch, route, navigation, title, id} = this.props;
    // console.log(route, 'route-route')
    if(route.params && route.params.id !== id) {
      dispatch({
        type: 'player/fetchShow',
        payload: {
          id: route.params.id,
        },
      });
    } else {
      dispatch({
        type: 'player/play'
      });
    }
    navigation.setOptions({
      headerTitle: title,
    });
    // this.addBarrage();
  }
  componentWillUnmount(){
    const {dispatch, playState,route, navigation, title, id} = this.props;
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
    console.log(1212121)
    clearInterval(timmer)
  }
  
  componentDidUpdate(prevProps: IPorps) {
    
    if (this.props.title !== prevProps.title) {
      this.props.navigation.setOptions({
        headerTitle: this.props.title,
      });
    }
  }
  addBarrage = () => {
    timmer =  setInterval(() => {
      const {barrage} = this.state;
      if (barrage) {
        const id = Date.now();
        const title = getText();
        this.setState({
          barrageData: [{id, title}],
        });
      }
    }, 500);
  };
  barrage=()=>{
    this.setState({
      barrage: !this.state.barrage,
    });
    Animated.timing(this.anim, {
      toValue: this.state.barrage ? 1 : SCALE,
      duration: 100,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
    
  }
  previous = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/previous',
    });
  };
  next = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/next',
    });
  };
  toggle = () => {
    const {dispatch, playState} = this.props;
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };
  render() {
    const { barrage, barrageData } = this.state;
    const { playState, previousId, nextId, thumbnailUrl } = this.props;
    // console.log(barrageData,"barrageData-barrageData")
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Animated.Image
            source={{ uri: thumbnailUrl }}
            style={[
              styles.image,
              { borderRadius: barrage ? 0 : 8, transform: [{ scale: this.anim }] },
            ]}
          />
        </View>
        {barrage && (
          <>
            <LinearGradient
              colors={['rgba(128,104,102,0.5)', '#807c66']}
              style={styles.linear}
            />
            <Barrage
              data={barrageData}
              maxTrack={5}
              style={{top: PADDING_TOP}}
            />
          </>
        )}
        <Touchable style={styles.barrageBtn} onPress={this.barrage}>
          <Text style={styles.barrageText}>弹幕</Text>
        </Touchable>
        <PlaySlide />
        <View style={styles.control}>
          <Touchable
            disabled={!previousId}
            onPress={this.previous}
            style={styles.button}>
            <Icon name="icon-shangyishou_huaban" size={30} color="#fff" />
          </Touchable>
          <Touchable onPress={this.toggle} style={styles.button}>
            <Icon
              name={playState === 'playing' ? 'icon-zanting' : 'icon-bofang'}
              size={40}
              color="#fff"
            />
          </Touchable>
          <Touchable
            disabled={!nextId}
            onPress={this.next}
            style={styles.button}>
            <Icon name="icon-kuaijin" size={30} color="#fff" />
          </Touchable>
        </View>
      </View>
    );

  }


}

const PADDING_TOP = (viewportWidth - IMAGE_WIDTH) / 2;
const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  button: {
    marginHorizontal: 10,
  },
  imageView: {
    alignItems: 'center',
    height: IMAGE_WIDTH,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrageBtn: {
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },
  linear: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});


export default connector(Detail);