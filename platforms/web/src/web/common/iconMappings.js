// @flow
const iconMappings = {
  'icon-thinking': require('web/assets/images/thinking_reasoning.png'),
  'icon-gross': require('web/assets/images/gross_motor_icon.png'),
  'icon-fine': require('web/assets/images/fine_motor_icon.png'),
  'icon-sensory': require('web/assets/images/sensory_icon.png'),
  'icon-speech': require('web/assets/images/speech_icon.png'),
  'icon-social': require('web/assets/images/social_emotional_icon.png'),
  'icon-favorite': require('web/assets/images/icons/favourite.svg'),
  'icon-activity': require('web/assets/images/icons/activity.svg'),
  'icon-history': require('web/assets/images/icons/history.svg'),
  'icon-not-ready': require('web/assets/images/icons/not-ready-icon.svg'),
  'icon-done': require('web/assets/images/icons/done-icon.svg'),
  'icon-too-ease': require('web/assets/images/icons/too-easy-icon.svg'),
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
