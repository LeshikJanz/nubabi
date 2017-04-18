const iconMappings = {
  'icon-thinking': require('../../common/images/thinking_reasoning.png'),
  'icon-gross': require('../../common/images/gross_motor_icon.png'),
  'icon-fine': require('../../common/images/fine_motor_icon.png'),
  'icon-sensory': require('../../common/images/sensory_icon.png'),
  'icon-speech': require('../../common/images/speech_icon.png'),
};

export default iconName => {
  return iconMappings[iconName] || null;
};
