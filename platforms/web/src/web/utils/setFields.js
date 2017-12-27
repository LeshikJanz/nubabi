import { merge, pick } from 'ramda';
import { filter } from 'graphql-anywhere';

const parseAvatar = babyEditForm => {
  if (typeof babyEditForm.avatar[0] !== 'undefined') {
    return {
      name: babyEditForm.avatar[0].name,
      contentType: babyEditForm.avatar[0].type,
      size: babyEditForm.avatar[0].size,
      url: babyEditForm.avatar[0],
    };
  }
  return undefined;
};

const setCm = babyEditForm =>
  babyEditForm.heightUnits === 'in'
    ? (Number(babyEditForm.weight) * 2.54).toFixed(2)
    : babyEditForm.height;
const setKg = babyEditForm =>
  babyEditForm.weightUnits === 'lbs'
    ? (Number(babyEditForm.weight) * 2.2046226218488).toFixed(2)
    : babyEditForm.weight;

export const setFields = (babyForm, babyEditForm) => {
  return pick(
    [
      'dob',
      'gender',
      'height',
      'id',
      'name',
      'relationship',
      'weekBorn',
      'weight',
      'avatar',
    ],
    merge(filter(babyForm.form, babyEditForm), {
      relationship: babyEditForm.relationship.value,
      avatar: parseAvatar(babyEditForm),
      weight: setKg(babyEditForm),
      height: setCm(babyEditForm),
    }),
  );
};
