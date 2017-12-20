import { merge, pick } from 'ramda';
import { filter } from 'graphql-anywhere';

export const setFields = (babyForm, babyEditForm) =>
  pick(
    [
      'dob',
      'gender',
      'height',
      'id',
      'name',
      'relationship',
      'weekBorn',
      'weight',
    ],
    merge(filter(babyForm.form, babyEditForm), {
      relationship: babyEditForm.relationship.value,
    }),
  );
