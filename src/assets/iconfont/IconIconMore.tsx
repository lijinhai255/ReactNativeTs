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

let IconIconMore: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M224 608A96 96 0 1 1 320 512a96.1024 96.1024 0 0 1-96 96z m288 0A96 96 0 1 1 608 512 96.1024 96.1024 0 0 1 512 608z m288 0A96 96 0 1 1 896 512a96.1024 96.1024 0 0 1-96 96z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIconMore.defaultProps = {
  size: 18,
};

IconIconMore = React.memo ? React.memo(IconIconMore) : IconIconMore;

export default IconIconMore;
