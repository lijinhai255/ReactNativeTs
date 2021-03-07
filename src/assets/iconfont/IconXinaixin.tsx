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

let IconXinaixin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1171 1024" width={size} height={size} {...rest}>
      <Path
        d="M 1030.79 136.26 s 0 -3.35481 0 0 C 906.662 12.134 712.082 8.778 584.6 122.841 C 457.117 8.778 262.538 12.134 141.763 132.906 C 17.637 257.034 14.282 458.322 138.41 582.452 l 3.35481 3.35481 l 372.385 369.029 c 40.2577 40.2577 104 40.2577 144.257 0 l 372.385 -369.029 C 1154.92 461.678 1154.92 260.389 1030.79 136.26 Z M 910.017 397.937 c -10.0644 0 -16.7741 -6.70963 -16.7741 -16.7741 c 0 -60.3866 -50.3222 -110.709 -110.709 -110.709 c -10.0644 0 -16.7741 -6.70963 -16.7741 -16.7741 s 6.70963 -16.7741 16.7741 -16.7741 c 80.5156 0 144.257 63.7415 144.257 144.257 c 0 10.0644 -6.70963 16.7741 -16.7741 16.7741 Z"
        fill={getIconColor(color, 0, '#fe2c55')}
      />
    </Svg>
  );
};

IconXinaixin.defaultProps = {
  size: 18,
};

IconXinaixin = React.memo ? React.memo(IconXinaixin) : IconXinaixin;

export default IconXinaixin;
