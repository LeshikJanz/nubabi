// @flow
const iconMappings = {
  'icon-thinking': require('../../common/images/thinking_reasoning.png'),
  'icon-gross': require('../../common/images/gross_motor_icon.png'),
  'icon-fine': require('../../common/images/fine_motor_icon.png'),
  'icon-sensory': require('../../common/images/sensory_icon.png'),
  'icon-speech': require('../../common/images/speech_icon.png'),
  'icon-social': require('../../common/images/social_emotional_icon.png'),
};

const pinkBg = '#FDE8EC';
const defaultBg = '#EDF0F9';
const PINK_SKILLS = ['icon-gross', 'icon-speech', 'icon-social'];

export function backgroundMappings(iconName: string) {
  if (PINK_SKILLS.includes(iconName)) {
    return pinkBg;
  }

  return defaultBg;
}

export default (iconName: string) => {
  return iconMappings[iconName] || null;
};
