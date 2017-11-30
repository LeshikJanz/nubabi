// @flow
export const getHeaderStyles = (width: number) => {
  const headerMargin = Math.round(width / 7.5); // 50 portrait 7p
  const headerTopMargin = Math.round(width / 9.3); // 40 portrait 7p
  const headerPath = Math.round(width / 5); // 75 portrait 7p

  const headerShapeStyle = {
    width,
    height: Math.round(width / 5.76),
    // marginTop: headerTopMargin,
  };

  const headerImageStyle = {
    width,
    height: headerShapeStyle.width - headerPath, // 300 portrait 7p
    // marginTop: -headerMargin,
  };

  const overlayStyle = {
    width,
    height: headerShapeStyle.width - headerPath, // 300 portrait 7p
    // top: -headerMargin, // -50 portrait 7p
  };

  const headerContainerStyle = {
    // paddingBottom: Math.round(width / 18.75 ), // 20 portrait 7p
    flex: 1,
  };

  const headerButtonsStyle = {
    width,
    marginTop: -Math.round(width / 46.8), // -8 portrait 7p
  };

  return {
    headerMargin,
    headerTopMargin,
    headerPath,
    headerShapeStyle,
    headerImageStyle,
    overlayStyle,
    headerContainerStyle,
    headerButtonsStyle,
  };
};

export default getHeaderStyles;
