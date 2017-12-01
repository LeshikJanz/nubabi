export const ACTIVITY_BUTTONS = [
  {
    type: 'tooDifficult',
    icon: 'icon-not-ready',
    mainText: 'TOO DIFFICULT',
    additionalText: 'Not quite ready for this',
    callback: 'changeActivityLevel',
  },
  {
    type: 'done',
    icon: 'icon-done',
    mainText: 'MARK AS DONE',
    additionalText: "Tick if you've completed it",
    callback: 'completeActivity',
  },
  {
    type: 'tooEase',
    icon: 'icon-too-ease',
    mainText: 'TOO EASE',
    additionalText: 'Increase the level',
    callback: 'swoopActivity',
  },
];
