// @flow
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import withLayout from '../components/withLayout';

type Props = {
  width: number,
  style?: Object | number,
};

export const HeaderShape = ({ width, style: styleProp }: Props) => {
  const headerMargin = Math.round(width / 7.5); // 50 portrait 7p
  const headerPath = Math.round(width / 5); // 75 portrait 7p
  const boxPath = Math.round(width / 6.46); // 58 portrait 7p
  const headerTopMargin = Math.round(width / 9.3); // 40 portrait 7p

  const curve = `M0 0 C ${width / 2 - headerMargin} ${headerPath}, ${width / 2 + headerMargin} ${headerPath}, ${width} 0`;
  const box = `M0 0 H ${width} V ${boxPath} H 0 L 0 0`;

  const dynamicStyle = {
    width,
    height: Math.round(width / 5.76),
    marginTop: headerTopMargin,
  };

  return (
    <Svg style={[styles.headerShape, dynamicStyle, styleProp]}>
      <Path d={curve + box} stroke="transparent" fill="#FFFFFF" />
    </Svg>
  );
};

const styles = {
  headerShape: {
    marginLeft: 0,
  },
};

export default withLayout(HeaderShape);
