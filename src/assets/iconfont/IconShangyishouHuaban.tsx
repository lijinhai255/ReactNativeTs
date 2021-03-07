/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconShangyishouHuaban: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M896 304.7v414.6L618.41 512 896 304.7m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L536.92 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c-0.01-15.48-12.72-26.28-26.34-26.28zM432.62 304.7v414.6L155.03 512l277.59-207.3m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L73.53 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c0-15.48-12.71-26.28-26.33-26.28z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShangyishouHuaban.defaultProps = {
  size: 18,
};

IconShangyishouHuaban = React.memo ? React.memo(IconShangyishouHuaban) : IconShangyishouHuaban;

export default IconShangyishouHuaban;
