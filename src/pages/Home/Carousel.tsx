import React from "react"
import SnapCarousel, { ParallaxImage, Pagination, AdditionalParallaxProps } from "react-native-snap-carousel"
import { viewportWidth, wp, hp } from "@/utils/index"
import { Image, StyleSheet, View } from "react-native"
import {ICarousel} from "@/models/home"
import { IconNames } from "@/assets/iconfont"
import { connect, ConnectedProps } from "react-redux"
import { RootState } from "@/models/"
const sliderWidth = viewportWidth;
const sideWidth = wp(90)
const itemWidth = sideWidth + wp(2) * 2
export const sideHeight = hp(26)
const mapStateToProps = ({ home }: RootState) => ({
    carousel: home?.carousel,
    activeCarouselIndex:home?.activeCarouselIndex
})
const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>
interface IProps extends ModelState {
}

class Carousel extends React.Component<IProps> {
    state = {
        activeIndex: 0
    }
    renderItem = (
        { item }: {item:ICarousel}
        , parallaxProps?: AdditionalParallaxProps) => {
        return (
            <ParallaxImage
                source={{ uri: item.image }}
                style={styles.image}
                containerStyle={styles.imageContainer}
                parallaxFactor={0.8}
                spinnerColor="rgba(0,0,0,.25)"
                {...parallaxProps}
             ></ParallaxImage>
        )
    }
    get pagination(){
        const { activeCarouselIndex,carousel } = this.props
        return (
            <View style={styles.warp}>
                <Pagination
                    containerStyle={styles.paginationContainer}
                    dotsLength={carousel.length}
                    activeDotIndex={activeCarouselIndex}
                    dotContainerStyle={styles.dotContainerStyle}
                    dotStyle={styles.dotStyle}
                    inactiveDotScale={0.6}
                    inactiveDotOpacity={0.4}
                />
            </View>
        )
    }
    onSnapToItem = (index: number) => {
        const {dispatch} = this.props
        dispatch({
            type:"home/setState",
            payload:{
                activeCarouselIndex:index
            }
        })
        // this.setState({
        //     activeIndex: index
        // })

    }
    render() {
        // console.log(this.props,"this.props.carousel")
        return (
            <View>
                <SnapCarousel
                    data={this.props.carousel}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages
                    loop
                    autoplay
                    onSnapToItem={this.onSnapToItem}
                ></SnapCarousel>
                {this.pagination}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: itemWidth,
        height: sideHeight,
        borderRadius: 8
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover"
    },
    warp:{
        justifyContent:"center",
        alignItems:"center"
    },
    paginationContainer:{
        backgroundColor:"rgba(0,0,0,.35)",
        position:"absolute",
        top:-20,
        paddingHorizontal:3,
        paddingVertical:4,
        borderRadius:8
        
    },
    dotContainerStyle:{
        marginHorizontal:6
    },
    dotStyle:{
        width:6,
        height:6,
        borderRadius:3,
        backgroundColor:"rgba(255,255,255,0.95)"
    }
})
export default connector(Carousel)