import React, { ReactElement } from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({player}: RootState) => {
  return {
    currentTime: player.currentTime,
    duration: player.duration,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    children:ReactElement
}


class Progress extends React.Component<IProps> {
  render() {
    const {children, currentTime, duration} = this.props;
    const fill = duration ? (currentTime / duration) * 100 : 0;
    return (
      <AnimatedCircularProgress
        size={40}
        width={2}
        tintColor="#f86442"
        backgroundColor="#ededed"
        fill={fill}>
        {() => <>{children}</>}
      </AnimatedCircularProgress>
    );
  }
}

export default connector(Progress);
