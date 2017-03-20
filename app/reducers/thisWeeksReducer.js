import {
  NEXT_SKILL_AREA,
  PREVIOUS_SKILL_AREA,
  SET_SKILL_AREA,
} from '../actions/actionTypes';

const fine_motor = require('../images/fine_motor.png');
const gross_motor = require('../images/gross_motor.png');
const sensory = require('../images/sensory.png');
const social_emotional = require('../images/social_emotional.png');
const speech_language = require('../images/speech_language.png');
const thinking_reasoning = require('../images/thinking_reasoning.png');

const gross_motor_large = require('../images/gross_motor_large.png');

const gross_motor_icon = require('../images/gross_motor_icon.png');
const fine_motor_icon = require('../images/fine_motor_icon.png');
const sensory_icon = require('../images/sensory_icon.png');
const speech_icon = require('../images/speech_icon.png');

const lourdes_thumbnail = require('../images/lourdes.jpg');
const jenny_thumbnail = require('../images/jenny.jpg');
const carly_thumbnail = require('../images/carly.jpg');
const lindi_thumbnail = require('../images/lindi.jpg');

const thisWeek = {
  skillArea: 0,
  skillAreas: [
    { id: 0, name: 'Gross Motor', icon: gross_motor_icon, image_thumbnail: gross_motor, image_large: gross_motor_large },
    { id: 1, name: 'Fine Motor', icon: fine_motor_icon, image_thumbnail: fine_motor, image_large: gross_motor_large },
    { id: 2, name: 'Sensory', icon: sensory_icon, image_thumbnail: sensory, image_large: gross_motor_large },
    { id: 3, name: 'Speech & Language', icon: speech_icon, image_thumbnail: speech_language, image_large: gross_motor_large },
  ],
  experts: [
    { id: 0, name: 'Jenny Lange', profession: 'Physiotherapist', image_thumbnail: jenny_thumbnail, biography: 'Physiotherapist Jenny Lange has 12 years’ experience working with children with a variety of physical and mental challenges. She is passionate about the foundational role that gross motor development plays for other aspects of a child’s development. After graduating in 2000 with a BSc in Physiotherapy from the University of Cape Town, Jenny joined a private physio practice in Cape Town as a locum where she gained experience working with children. Her interest in paediatrics grew while she worked with spinal cord and traumatic head injury cases. She later joined the Bel Porto School for children with intellectual and physical impairments. After eight years, she moved on to Vista Nova School in Cape Town. Jenny advocates a healthy, active lifestyle with plenty of physical play. “You don’t need expensive toys and a lot of equipment, use what you have at home,” she says. She is very active herself, having completed several Comrades and Two Oceans ultra-marathons, as well as the 80-kilometer ‘Puffer’ trail challenge. Jenny holds advanced qualifications in infant neurodevelopment, and served as the chairperson of the SA Neurodevelopmental Therapy Association for nine years before stepping away this year to focus on her growing family. She welcomed her first baby, Oliver, in August 2013.' },
    { id: 1, name: 'Carly Tzanos', profession: 'Occupational Therapist', image_thumbnail: carly_thumbnail },
    { id: 2, name: 'Lourdes Bruwer', profession: 'Occupational Therapist', image_thumbnail: lourdes_thumbnail },
    { id: 3, name: 'Lindi Bester', profession: 'Speech Therapist', image_thumbnail: lindi_thumbnail },
  ],
  activities: [
    { id: 232,
      skillAreaId: 0,
      expertId: 0,
      name: 'Ladder Ladder',
      description: 'Ladders or bunk bed ladders lying down on the ground can make an excellent mini obstacle course for your little one.  The momentary balance on each leg individually as he lifts his other leg into the next rung, will help him to gain more control and balance when standing on one leg. The control needed to step between each rung of the ladder and escape out the other side will challenge his balance and the strength of his tummy muscles',
    },
    {
      id: 321,
      skillAreaId: 1,
      expertId: 1,
      name: 'Toothbrush art',
      description: 'Giving your little artist different tools to paint with will not only help him to explore his creative side with them, but also challenge him to use some different fine motor muscles. This is a wonderful way to help these muscles to mature and develop in preparation for tasks such as fastening buttons and zipping zips.',
    },
    {
      id: 4542,
      skillAreaId: 2,
      expertId: 2,
      name: 'Squishy-squeezy flour art',
      description: 'Flour and water makes a runny sticky mixture, add some food colouring or paint and some glitter and you have a recipe for some successful sensory fun. This messy play starts off clean and can entice even the most sensitive toddler to touch and explore his creation! Remember getting messy is important for your little one\'s touch sense to mature and this will help his fine motor develop and refine. So let\'s get messy!',
    },
    {
      id: 22,
      skillAreaId: 3,
      expertId: 3,
      name: 'Puzzle problems',
      description: 'Your inquisitive tot is now starting to know where things belong in your home and where to find them when he wants them. He may start experimenting with different toys in different ways. This is the time that you might find the entire roll of toilet paper rolled out on the bathroom floor! His problem solving skills are developing rapidly and he is starting to realize that he can use different things for different uses. If he sees a snack on the counter and wants it, he will soon learn that he can simply drag a small coffee table over to the kitchen, climb on it and get that snack! Your bright little one isn’t being naughty, he is problem solving and developing this important skill!',
    },
  ],
};

export default function thisWeeksReducer(state = thisWeek, action) {
  switch (action.type) {
    case NEXT_SKILL_AREA: {
      const skillIds = state.skillAreas.map((skill) => { return skill.id; });
      let index = skillIds.indexOf(state.skillArea);
      index++;
      if (index > skillIds.length - 1) {
        index = 0;
      }
      return Object.assign({}, state, {
        skillArea: skillIds[index],
      });
    }

    case PREVIOUS_SKILL_AREA: {
      const skillIds = state.skillAreas.map((skill) => { return skill.id; });
      let index = skillIds.indexOf(state.skillArea);
      index--;
      if (index < 0) {
        index = skillIds.length - 1;
      }
      return Object.assign({}, state, {
        skillArea: skillIds[index],
      });
    }

    case SET_SKILL_AREA: {
      return Object.assign({}, state, {
        skillArea: action.skillArea,
      });
    }

    default:
      return state;
  }
}
