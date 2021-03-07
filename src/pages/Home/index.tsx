import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    NativeEventEmitter,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import Icon from '@/assets/iconfont/index';
import { RootStackNavigation } from "@/navigator/index"
import { connect, ConnectedProps } from "react-redux"
import { RootState } from "@/models/index"
import { IChannel } from '@/models/home';
import { IGuess } from '@/models/guress';
//引入轮播图
import Carousel from "@/pages/Home/Carousel"
import Guess from "@/pages/Home/Guess"
import { ScrollView } from 'react-native-gesture-handler';
import ChannelItem from './ChannelItem';
import { sideHeight } from "@/pages/Home/Carousel"
import { RouteProp } from '@react-navigation/native';
import { HomeParamList } from '@/navigator/HomeTabs';
const mapStateToProps = (state: RootState,{route}:{route:RouteProp<HomeParamList,string>}) => {
    const {namespace} = route.params;
    const modelState =  state[namespace]
    return {
        namespace,
        carousel: modelState?.carousel,
        guess: modelState?.guess,
        gradientVisble:modelState?.gradientVisble,
        channels: modelState?.channels,
        hasMore: modelState?.pagination?.hasMore,
        loading: state.loading.effects[namespace+'/fetchChannel']
    }
}
const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>
interface IProps extends ModelState {
    navigation: RootStackNavigation
}
interface IState {
    refreshing: boolean
}

class Home extends PureComponent<IProps, IState>{
    state = {
        refreshing: false
    }
    componentDidMount() {
        // console.log(1)
        const { dispatch,namespace } = this.props
        dispatch({
            type: namespace+"/fetchCarousel",
        })
        dispatch({
            type: namespace+"/fetchChannel",
        })
    }
    onPress = (item: IChannel | IGuess) => {
        const { navigation } = this.props;
        navigation.navigate('Album', {item});
        // navigation.navigate('Album');
    };
    renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
        return <ChannelItem item={item} onPress={this.onPress} />;
    };
    get header() {
        const { carousel ,namespace} = this.props
        
        // console.log(carousel,"carousel-carousel")
        return (
            <View>
                <Carousel />
                <View>
                    <Guess namespace={namespace}  goAlbum={this.onPress} />
                </View>
            </View>
        )
    }
    get footer() {
        const { hasMore, loading, channels } = this.props
        if (!hasMore) {
            return (
                <View style={styele.end}>
                    <Text>--我是有底线的--</Text>
                </View>
            )
        }
        if (loading && hasMore && channels.length > 0) {
            return (
                <View style={styele.loading}>
                    <Text>正在加载中。。。</Text>
                </View>
            )
        }
    }
    keyExtractor = (item: IChannel) => {
        return item.id
    }
    onRefresh = () => {
        // console.log("刷新了")
        this.setState({
            refreshing: true
        })
        // console.log("刷新中")

        const { dispatch ,namespace} = this.props
        dispatch({
            type: namespace+"/fetchChannel",
            callback: () => {
                this.setState({
                    refreshing: false
                })
            }
        })
        // console.log("刷新完成")
    }
    // 加载更多
    onEndReached = () => {
        const { dispatch, loading, hasMore,namespace } = this.props
        // console.log(hasMore, "hasMre")
        if (loading || !hasMore) return;
        dispatch({
            type: namespace+"/fetchChannel",
            payload: {
                loadMore: true
            }
        })
    }
    get empty() {
        const { loading } = this.props
        if (loading) {
            return
        }
        return (
            <View style={styele.empty}>
                <Text>
                    暂无数据
                </Text>
            </View>
        )
    }
    onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = nativeEvent.contentOffset.y;
        let newgradientVisble = offsetY < sideHeight
        const { dispatch, gradientVisble ,namespace} = this.props
        // console.log(gradientVisble !== newgradientVisble,"cs")

        if (gradientVisble !== newgradientVisble) {
            dispatch({
                type: namespace+"/setState",
                payload: {
                    gradientVisble:newgradientVisble
                }
            })

        }



    }
    render() {
        const { carousel, loading, channels } = this.props
        const { refreshing } = this.state
        // console.log(channels, "fetchChannel")
        return (
            <FlatList
                data={channels}
                renderItem={this.renderItem}
                ListHeaderComponent={this.header}
                ListFooterComponent={this.footer}
                ListEmptyComponent={this.empty}
                keyExtractor={this.keyExtractor}
                onRefresh={this.onRefresh}
                refreshing={refreshing}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.2}
                onScroll={this.onScroll}
            ></FlatList>
        )
    }
}

const styele = StyleSheet.create({
    end: {
        alignItems: "center",
        paddingVertical: 10
    },
    loading: {
        alignItems: "center",
        paddingVertical: 10

    },
    empty: {
        alignItems: "center",
        paddingVertical: 100

    }
})



export default connector(Home)