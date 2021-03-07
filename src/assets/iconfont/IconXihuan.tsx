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

let IconXihuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M486.816 0C230.112 0 22.016 208.096 22.016 464.8S230.112 929.6 486.816 929.6s464.8-208.096 464.8-464.8S743.52 0 486.816 0z m0 899.232c-239.968 0-434.464-194.528-434.464-434.464S246.88 30.304 486.816 30.304 921.28 224.832 921.28 464.768s-194.528 434.464-434.464 434.464z m129.088-641.024c-53.792 0-97.088 27.744-129.632 63.776-31.552-37.28-74.816-63.776-128.608-63.776h-1.408a127.712 127.712 0 0 0-127.712 127.008v0.064c0 35.552 15.616 61.184 32.704 85.248l200.64 224.512c22.528 19.68 26.784 19.68 49.28 0l201.12-224.512c20.128-24.064 32.704-49.664 32.704-85.248a127.68 127.68 0 0 0-127.68-127.072h-1.44z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXihuan.defaultProps = {
  size: 18,
};

IconXihuan = React.memo ? React.memo(IconXihuan) : IconXihuan;

export default IconXihuan;
