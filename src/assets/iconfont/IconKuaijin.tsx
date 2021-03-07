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

let IconKuaijin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M947.557942 553.481763 467.585156 897.899c-29.166445 18.872836-68.267554 9.601682-68.295184-46.411029L399.289972 703.367469 128.175376 897.899c-29.166445 18.872836-67.384404 10.484795-68.295184-47.295166L59.880192 174.132946c-0.883149-63.975057 36.479291-63.464427 68.295184-46.384423l271.113573 194.517205L399.288949 172.366719c0.02763-65.741283 36.479291-61.698201 68.295184-44.618197l479.973809 344.375282C969.661238 494.597655 969.661238 531.021216 947.557942 553.481763zM116.44883 829.275064l339.408757-237.328243c0 0 0 224.082568 0 237.328243l452.545009-316.465628-452.545009-316.450279c0 50.508347 0 237.341546 0 237.341546L116.44883 196.359156C116.44883 246.867504 116.44883 816.029388 116.44883 829.275064z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconKuaijin.defaultProps = {
  size: 18,
};

IconKuaijin = React.memo ? React.memo(IconKuaijin) : IconKuaijin;

export default IconKuaijin;
