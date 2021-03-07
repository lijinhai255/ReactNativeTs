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

let IconShouye: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M816.4 545.1l0 337.4c0 28.7-23.2 51.9-51.9 51.9L609.2 934.4 609.2 673.9c0-14.3-11.6-25.9-25.9-25.9L427.6 648c-14.3 0-25.9 11.6-25.9 25.9l0 260.4L246.3 934.3c-28.7 0-51.9-23.2-51.9-51.9L194.4 545.1 142 545.1l0 389.1c0 28.7 16.7 51.9 45.4 51.9l221.1 0 0-0.8 45.1 0L453.6 686.9l103 0 0.8 298.3 45.1 0 0 0.8 221.1 0c28.7 0 45.4-23.2 45.4-51.9L869 545.1 816.4 545.1zM505.4 63.8c-6.9 0-13.8 2.5-18.6 7.6L41.7 531.7c-10 10.3-9.7 26.7 0.6 36.7 5 4.9 11.5 7.3 18 7.3 6.8 0 13.6-2.6 18.7-7.9l426.4-441.1 426.4 441.1c5.1 5.3 11.9 7.9 18.6 7.9 6.5 0 13-2.4 18-7.3 10.3-10 10.6-26.4 0.6-36.7L524.1 71.3C519.2 66.3 512.3 63.8 505.4 63.8L505.4 63.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShouye.defaultProps = {
  size: 18,
};

IconShouye = React.memo ? React.memo(IconShouye) : IconShouye;

export default IconShouye;
