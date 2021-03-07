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

let IconDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M480.096 750.848a38.208 38.208 0 0 0 61.568 3.008l2.24-3.008L909.44 249.408A16 16 0 0 0 896.544 224h-42.72a16 16 0 0 0-12.96 6.592L512 682.944 183.2 230.592A16 16 0 0 0 170.24 224H127.456a16 16 0 0 0-12.928 25.44l365.568 501.408z"
        fill={getIconColor(color, 0, '#595959')}
      />
    </Svg>
  );
};

IconDown.defaultProps = {
  size: 18,
};

IconDown = React.memo ? React.memo(IconDown) : IconDown;

export default IconDown;
