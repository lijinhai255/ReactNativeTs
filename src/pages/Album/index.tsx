import React from "react";
import { View, Text, StyleSheet, Image, Animated, NativeSyntheticEvent, NativeScrollEvent, } from "react-native"
import { useHeaderHeight } from "@react-navigation/stack"
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { ModalStackNavigation, RootStackNavigation, RootStackParamList } from "@/navigator/index";

import { BlurView } from "@react-native-community/blur"
import Tab from "./Tab"
import { GestureEvent, PanGestureHandlerGestureEvent, PanGestureHandler, TapGestureHandler, PanGestureHandlerStateChangeEvent, State, NativeViewGestureHandler } from "react-native-gesture-handler";
import { viewportHeight } from "@/utils/index";
import { IProgram } from "@/models/album";
const coverRight = require('@/assets/cover-right.png');
const mapStateToProps = ({ album }: RootState) => {
    return {
        summary: album?.summary,
        author: album?.author,
        list:album?.list
    }
}
const connector = connect(mapStateToProps)
const USE_NATIVE_DRIVER = true;
type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
    headerHeight: number;
    route: RouteProp<RootStackParamList, "Album">,
    navigation:ModalStackNavigation
}
const HEADER_HEIGHT = 260
class Album extends React.Component<IProps>{
    tabRef = React.createRef<TapGestureHandler>()
    panRef = React.createRef<PanGestureHandler>()
    nativeRef = React.createRef<NativeViewGestureHandler>()
    RANGE = [-(HEADER_HEIGHT - this.props.headerHeight), 0]
    // 初始化 手指拖动y的距离
    translationY = new Animated.Value(0)
    lastScrollY = new Animated.Value(0)
    lastScrollYValue = 0
    reverselastionYValue =  Animated.multiply(new Animated.Value(-1),this.lastScrollY)
    translationYvalue = 0
    translationYOffest = new Animated.Value(0)

    translateY = Animated.add(Animated.add(this.reverselastionYValue,this.translationY),this.translationYOffest)


    componentDidMount() {
        // console.log(1212121)
        const { dispatch, route ,navigation} = this.props
        const { id } = route.params.item
        dispatch({
            type: "album/fetchAlbum",
            payload: {
                id
            }
        })
        navigation.setParams({
            opacity:this.translateY.interpolate({
                inputRange:this.RANGE,
                outputRange:[1,0]
            })
        })
        
        // Animated.timing(this.translateY, {
        //     toValue: -170,
        //     durationF: 3000,
        //     easing: Easing.inOut(Easing.ease)
        // }).start()
    }
    renderHeader = () => {
        const { headerHeight, summary, author, route } = this.props
        const { title, image, id } = route.params.item
        return (
            <View style={[styles.header, { paddingTop: headerHeight }]}>
                <Image source={{ uri: image }} style={styles.background}></Image>
                <BlurView blurType="light" blurAmount={5} style={StyleSheet.absoluteFillObject} />
                <View style={styles.leftView}>
                    <Image style={styles.thumbnail} source={{ uri: image }} />
                    <Image style={styles.coverRight} source={coverRight} />
                </View>
                <View style={styles.rightView}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.summary}>
                        <Text
                            numberOfLines={1}
                            style={styles.summaryText}
                        >
                            {summary}
                        </Text>
                    </View>
                    <View style={styles.author}>
                        {/* <Image
                            source={{ uri: author.avatar }}
                            style={styles.avatar}
                        /> */}
                        <Text style={styles.name}>
                            {author.name}
                        </Text>
                    </View>
                </View>
            </View>

        )
    }
    onGestureEventFn = Animated.event([{ nativeEvent: { translationY: this.translationY } }],
        { useNativeDriver: USE_NATIVE_DRIVER }
    )
    onScrollDrag = Animated.event([{ nativeEvent: { contentOffset: { y: this.lastScrollY } } }],
        { useNativeDriver: USE_NATIVE_DRIVER ,
            listener:({nativeEvent}:NativeSyntheticEvent<NativeScrollEvent>)=>{
                this.lastScrollYValue = nativeEvent.contentOffset.y

            }
        }
    )

    onHandlerStateChange = ({ nativeEvent }: PanGestureHandlerStateChangeEvent) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            let { translationY } = nativeEvent
            translationY -= this.lastScrollYValue;
            this.translationYOffest.extractOffset()
            this.translationYOffest.setValue(translationY)
            // value =  value +offset 
            this.translationYOffest.flattenOffset()
            this.translationY.setValue(0)

            this.translationYvalue += translationY

            let maxDeltaY = - this.RANGE[0] - this.translationYvalue
            if (this.translationYvalue < this.RANGE[0]) {
                this.translationYvalue = this.RANGE[0]
                // this.translationYOffest.extractOffset()
                Animated.timing(this.translationYOffest, {
                    toValue: this.RANGE[0],
                    duration: 1000,
                    useNativeDriver: USE_NATIVE_DRIVER
                }).start()
                maxDeltaY = this.RANGE[1]
            } else if (this.translationYvalue > this.RANGE[1]) {
                this.translationYvalue = this.RANGE[1]
                // this.translationYOffest.extractOffset()
                Animated.timing(this.translationYOffest, {
                    toValue: this.RANGE[1],
                    duration: 1000,
                    useNativeDriver: USE_NATIVE_DRIVER
                }).start()
                maxDeltaY = -this.RANGE[0]

            }
            if (this.tabRef.current) {
                const tap: any = this.tabRef.current
                tap.setNativeProps({
                    maxDeltaY

                })
            }

        }
    }
    onItemPress=(data:IProgram,index:number)=>{
        console.log(data,index)
        const {navigation,dispatch,list,route} = this.props
        const previousItem = list[index - 1];
        const nextItem = list[index + 1];
        dispatch({
            type: 'player/setState',
            payload: {
              previousId: previousItem ? previousItem.id : '',
              nextId: nextItem ? nextItem.id : '',
              title: data.title,
              thumbnailUrl: route.params.item.image,
              sounds: list.map(item => ({id: item.id, title: item.title})),
            },
          });
        navigation.navigate("Detail",{id:data.id})

    }
    // onScrollBeginDrag=()=>
    render() {
        const { headerHeight, summary, author, route } = this.props

        return (
            <TapGestureHandler
                ref={this.tabRef}
                maxDeltaY={-this.RANGE[0]}
            >

                <View style={styles.container}>
                    <PanGestureHandler
                        ref={this.panRef}
                        onGestureEvent={this.onGestureEventFn}
                        onHandlerStateChange={this.onHandlerStateChange}
                        simultaneousHandlers={[this.tabRef, this.nativeRef]}

                    >
                        <Animated.View style={[styles.container,
                        {

                            transform: [{
                                translateY: this.translateY.interpolate({
                                    inputRange: this.RANGE,
                                    outputRange: this.RANGE,
                                    extrapolate: "clamp"
                                })
                            }]
                        }]}>
                            {this.renderHeader()}
                            <View style={{ height: viewportHeight - this.props.headerHeight }}>
                                <Tab
                                    onScrollBeginDrag={this.onScrollDrag}
                                    onScrollEndDrag={this.onScrollDrag}
                                    panRef={this.panRef}
                                    tabRef={this.tabRef}
                                    nativeRef={this.nativeRef}
                                    onItemPress={this.onItemPress}
                                     />
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </TapGestureHandler>
        )
    }
}

function Wrapper(props: IProps) {
    const headerHeight = useHeaderHeight()
    return <Album {...props} headerHeight={headerHeight} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    header: {
        height: HEADER_HEIGHT,
        flexDirection: "row",
        alignItems: "center"
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#eee"
    },
    leftView: {
        marginRight: 26,
        marginLeft: 26,
    },
    thumbnail: {
        width: 98,
        height: 98,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
    },
    coverRight: {
        height: 98,
        position: "absolute",
        right: -23,
        resizeMode: "contain"


    },
    rightView: {

    },
    summary: {
        backgroundColor: "rgba(0,0,0,.3)",
        padding: 10,
        marginVertical: 10,
        borderRadius: 8
    },
    author: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        height: 26,
        width: 26,
        borderRadius: 13,
        marginRight: 8,

    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "900"

    },
    summaryText: {
        color: "#fff"

    },
    name: {
        color: "#fff"
    }
})
export default connector(Wrapper)