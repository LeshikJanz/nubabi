import { merge, pick } from 'ramda';
import { filter } from 'graphql-anywhere';

const setNewAvatar = (babyEditForm, currentBabyPhoto) => {
  if (typeof babyEditForm.avatar[0] !== 'undefined' && currentBabyPhoto) {
    return {
      name: babyEditForm.avatar[0].name,
      contentType: babyEditForm.avatar[0].type,
      size: babyEditForm.avatar[0].size,
      url: currentBabyPhoto,
    };
  }
  return undefined;
};

export const setFields = (babyForm, babyEditForm, currentBabyPhoto) => {
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
      avatar: setNewAvatar(babyEditForm, currentBabyPhoto),
    }),
  );
};
