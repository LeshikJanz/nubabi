// @flow
import { ActionSheetIOS } from 'react-native';
import { invertObj } from 'ramda';

export function handleActionSheet(
  options: Array<string>,
  type: string,
  displayMappings: Object,
  onSelectValue: string => void,
) {
  const sheetOptions = [...options, 'Cancel'];
  const cancelIndex = sheetOptions.length - 1;

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: sheetOptions,
      cancelButtonIndex: cancelIndex,
      title: 'Choose a Unit',
      message: 'Set this unit to be displayed in measurements across the app',
    },
    selectedIndex => {
      if (selectedIndex === cancelIndex) {
        return;
      }

      const selectedUnit = invertObj(displayMappings)[
        sheetOptions[selectedIndex]
      ];

      if (selectedUnit) {
        onSelectValue(selectedUnit);
      }
    },
  );
}
