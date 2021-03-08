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

let IconTime: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 64C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64zM512 895.712c-211.584 0-383.712-172.16-383.712-383.712C128.288 300.416 300.416 128.288 512 128.288c211.552 0 383.712 172.128 383.712 383.712C895.712 723.552 723.552 895.712 512 895.712z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M671.968 512 512 512 512 288.064c0-17.76-14.24-32.128-32-32.128s-32 14.4-32 32.128L448 544c0 17.76 14.272 32 32 32l191.968 0c17.76 0 32.128-14.24 32.128-32S689.728 512 671.968 512z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconTime.defaultProps = {
  size: 18,
};

IconTime = React.memo ? React.memo(IconTime) : IconTime;

export default IconTime;
