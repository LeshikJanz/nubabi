// @flow
const iconMappings = {
  // Stimulation
  'icon-thinking': require('core/images/thinking_reasoning.png'),
  'icon-gross': require('core/images/gross_motor_icon.png'),
  'icon-fine': require('core/images/fine_motor_icon.png'),
  'icon-sensory': require('core/images/sensory_icon.png'),
  'icon-speech': require('core/images/speech_icon.png'),
  'icon-social': require('core/images/social_emotional_icon.png'),
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
