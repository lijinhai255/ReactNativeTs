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

let IconZhanghu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M798.6176 301.4144a267.9808 267.9808 0 0 1-268.8512 268.8512 267.9808 267.9808 0 0 1-268.8512-268.8512A266.8032 266.8032 0 0 1 529.7664 34.048a266.6496 266.6496 0 0 1 268.8512 267.3664z m73.1136 704.0512H164.5056c-31.0784 0-45.056-23.296-45.056-54.3744a318.464 318.464 0 0 1 315.4944-331.008h166.3488a337.92 337.92 0 0 1 337.3056 332.8v-3.1744c1.4848 30.976-35.7888 54.272-66.9184 55.8592z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZhanghu.defaultProps = {
  size: 18,
};

IconZhanghu = React.memo ? React.memo(IconZhanghu) : IconZhanghu;

export default IconZhanghu;
