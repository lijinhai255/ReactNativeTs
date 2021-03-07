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

let IconShengyin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M128 384v256h128a64 64 0 0 1 38.4 12.8L448 768V256l-153.6 115.2A64 64 0 0 1 256 384H128z m332.8-217.6A32 32 0 0 1 512 192v640a32 32 0 0 1-51.2 25.6L256 704H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32h160l204.8-153.6z m287.328 50.688a32 32 0 1 1 39.744-50.176C902.08 257.408 960 373.248 960 512s-57.92 254.592-172.128 345.088a32 32 0 1 1-39.744-50.176C847.264 728.384 896 630.912 896 512c0-118.88-48.736-216.384-147.872-294.912zM619.2 344.32a32 32 0 0 1 41.6-48.64C731.648 356.256 768 428.96 768 512c0 83.04-36.352 155.744-107.2 216.32a32 32 0 0 1-41.6-48.64C676.352 630.816 704 575.52 704 512c0-63.52-27.648-118.816-84.8-167.68z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShengyin.defaultProps = {
  size: 18,
};

IconShengyin = React.memo ? React.memo(IconShengyin) : IconShengyin;

export default IconShengyin;
