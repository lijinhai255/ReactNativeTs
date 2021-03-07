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

let IconZanting: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M116.053333 146.773333h184.746667v730.026667H116.053333zM723.2 146.773333h184.746667v730.026667h-184.746667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZanting.defaultProps = {
  size: 18,
};

IconZanting = React.memo ? React.memo(IconZanting) : IconZanting;

export default IconZanting;
