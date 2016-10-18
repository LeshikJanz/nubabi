import {
  NEXT_SKILL_AREA,
  PREVIOUS_SKILL_AREA,
  SET_SKILL_AREA,
} from '../constants/actionTypes';


const thisWeek = {
  skillArea: 0,
  skillAreas: [
    { id: 0, name: 'Gross Motor' },
    { id: 1, name: 'Fine Motor' },
    { id: 2, name: 'Sensory' },
    { id: 3, name: 'Speech & Language' },
  ],
  activities: [
    { id: 232,
      skillAreaId: 0,
      description: 'Gross Motor Activity Description',
    },
    {
      id: 321,
      skillAreaId: 1,
      description: 'Fine Motor Activity Description',
    },
    {
      id: 4542,
      skillAreaId: 2,
      description: 'Sensory Activity Description',
    },
    {
      id: 22,
      skillAreaId: 3,
      description: 'Speech & Language Activity Description',
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
