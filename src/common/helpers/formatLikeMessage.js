// @flow
import pluralize from 'pluralize';

export default function formatLikeMessage(likeCount, isLikedByViewer, suffix) {
  if (isLikedByViewer && likeCount === 1) {
    return 'You liked this';
  }

  const realCount = isLikedByViewer ? likeCount - 1 : likeCount;

  const prefix = isLikedByViewer ? 'You and ' : '';
  const pluralized = pluralize('person', realCount);

  return `${prefix}${realCount} ${pluralized} ${suffix}`;
}
