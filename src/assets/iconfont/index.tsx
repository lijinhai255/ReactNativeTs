/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconBofang from './IconBofang';
import IconKuaijin from './IconKuaijin';
import IconZanting from './IconZanting';
import IconShangyishouHuaban from './IconShangyishouHuaban';
import IconDown from './IconDown';
import IconErji from './IconErji';
import IconShengyin1 from './IconShengyin1';
import IconHuaban from './IconHuaban';
import IconListen from './IconListen';
import IconShengyin from './IconShengyin';
import IconHuanyipi from './IconHuanyipi';
import IconIconMore from './IconIconMore';
import IconXihuan from './IconXihuan';
import IconZhanghu from './IconZhanghu';
import IconFaxian from './IconFaxian';
import IconFaxian1 from './IconFaxian1';
import IconStarO from './IconStarO';
import IconXingzhuang60Kaobei2Copy from './IconXingzhuang60Kaobei2Copy';
import IconShouye from './IconShouye';
import IconIconHome from './IconIconHome';
import IconXinaixin from './IconXinaixin';
import IconCeshi from './IconCeshi';

export type IconNames = 'icon-bofang' | 'icon-kuaijin' | 'icon-zanting' | 'icon-shangyishou_huaban' | 'icon-down' | 'icon-erji' | 'icon-shengyin1' | 'icon-huaban' | 'icon-listen' | 'icon-shengyin' | 'icon-huanyipi' | 'icon-icon_more' | 'icon-xihuan' | 'icon-zhanghu' | 'icon-faxian' | 'icon-faxian1' | 'icon--star-o' | 'icon-xingzhuang60kaobei2-copy' | 'icon-shouye' | 'icon-icon_home' | 'icon-xinaixin' | 'icon-ceshi';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-bofang':
      return <IconBofang key="1" {...rest} />;
    case 'icon-kuaijin':
      return <IconKuaijin key="2" {...rest} />;
    case 'icon-zanting':
      return <IconZanting key="3" {...rest} />;
    case 'icon-shangyishou_huaban':
      return <IconShangyishouHuaban key="4" {...rest} />;
    case 'icon-down':
      return <IconDown key="5" {...rest} />;
    case 'icon-erji':
      return <IconErji key="6" {...rest} />;
    case 'icon-shengyin1':
      return <IconShengyin1 key="7" {...rest} />;
    case 'icon-huaban':
      return <IconHuaban key="8" {...rest} />;
    case 'icon-listen':
      return <IconListen key="9" {...rest} />;
    case 'icon-shengyin':
      return <IconShengyin key="10" {...rest} />;
    case 'icon-huanyipi':
      return <IconHuanyipi key="11" {...rest} />;
    case 'icon-icon_more':
      return <IconIconMore key="12" {...rest} />;
    case 'icon-xihuan':
      return <IconXihuan key="13" {...rest} />;
    case 'icon-zhanghu':
      return <IconZhanghu key="14" {...rest} />;
    case 'icon-faxian':
      return <IconFaxian key="15" {...rest} />;
    case 'icon-faxian1':
      return <IconFaxian1 key="16" {...rest} />;
    case 'icon--star-o':
      return <IconStarO key="17" {...rest} />;
    case 'icon-xingzhuang60kaobei2-copy':
      return <IconXingzhuang60Kaobei2Copy key="18" {...rest} />;
    case 'icon-shouye':
      return <IconShouye key="19" {...rest} />;
    case 'icon-icon_home':
      return <IconIconHome key="20" {...rest} />;
    case 'icon-xinaixin':
      return <IconXinaixin key="21" {...rest} />;
    case 'icon-ceshi':
      return <IconCeshi key="22" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
