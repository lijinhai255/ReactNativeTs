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

let IconShanchu1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M798.1 872.6c0 34.3-27.9 62.2-62.1 62.2H288.1c-34.3-0.1-62.1-27.9-62.2-62.2V212.8h572.2v659.8zM350.2 101.2c0-7.2 5.6-12.8 12.8-12.8h298.8c7.2 0 12.7 5.6 12.7 12.8v37.5H350.2v-37.5z m634.3 37.5H748.7v-37.5c0-47.8-39-86.9-86.9-86.9H363c-47.9 0.1-86.8 38.9-86.9 86.9v37.5H39.5C18.7 138.7 2 155.4 2 176.1s16.7 37.5 37.5 37.5H151v659c0 75.7 61.4 137.1 137.1 137.1h447.8c75.7 0 137.1-61.4 137.1-137.1V212.8h111.6c20.7 0 37.5-16.7 37.5-37.5s-16.8-36.6-37.6-36.6zM512 822.4c20.7 0 37.5-16.7 37.5-37.5V386.5c0-20.7-16.7-37.5-37.5-37.5-20.7 0-37.5 16.7-37.5 37.5v398.4c0 20.7 16.8 37.5 37.5 37.5m-174.5 0c20.7 0 37.5-16.7 37.5-37.5V386.5c0-20.7-16.7-37.5-37.5-37.5-20.7 0-37.5 16.7-37.5 37.5v398.4c0.8 20.7 17.6 37.5 37.5 37.5m349 0c20.7 0 37.5-16.7 37.5-37.5V386.5c0-20.7-16.7-37.5-37.5-37.5-20.7 0-37.5 16.7-37.5 37.5v398.4c0.1 20.7 16.8 37.5 37.5 37.5"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShanchu1.defaultProps = {
  size: 18,
};

IconShanchu1 = React.memo ? React.memo(IconShanchu1) : IconShanchu1;

export default IconShanchu1;
