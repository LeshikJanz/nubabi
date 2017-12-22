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
    }),
  );
};
