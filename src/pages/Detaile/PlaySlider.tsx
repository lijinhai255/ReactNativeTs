import { RootState } from "@/models/index";
import { ModalStackParamList } from "@/navigator/";
import { RouteProp } from "@react-navigation/native";
import React from "react";

import { StyleSheet, Text, View } from "react-native"

import Slider from "react-native-slider-x"
import { connect, ConnectedProps } from "react-redux";
import {formatTime} from "@/utils/index"
const mapStateToProps = ({ player }: RootState) => {
    return {
        currentTime: player.currentTime,
        duration: player.duration,
    }
}

const connector = connect(mapStateToProps)
type ModelState = ConnectedProps<typeof connector>
interface IPorps extends ModelState {

}

class PlaySlide extends React.Component<IPorps>{
    renderThumb = () => {
        const {currentTime, duration} = this.props;
        console.log(formatTime(currentTime),formatTime(duration))
        return (
          <View>
            <Text style={styles.text}>
              {formatTime(currentTime)}/{formatTime(duration)}
            </Text>
          </View>
        );
      };
    render() {
        const {currentTime,duration} = this.props
        return (
            <View style={styles.container}>
                <Slider
                    value={currentTime}
                    maximumValue={duration}
                    maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                    minimumTrackTintColor="white"
                    renderThumb={this.renderThumb}
                    thumbStyle={styles.thumb}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    thumb: {
        backgroundColor: '#fff',
        width: 76,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
    },
});

export default connector(PlaySlide)