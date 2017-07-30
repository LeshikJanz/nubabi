// @flow
import type { GrowthArticleEdge } from '../../common/types';
import React from 'react';
import { Box, Link } from '../components';
import { pluck, reject, compose, isNil } from 'ramda';

type Props = {
  links: Array<GrowthArticleEdge>,
};

export const SectionLinks = ({ links }: Props) => {
  const items = compose(reject(isNil), pluck('node'))(links);

  if (!links.length) {
    return null;
  }

  const urlPrefix = 'nubabi://content/growth';

  return (
    <Box>
      {items.map(link =>
        <Link
          containerStyle={{ marginVertical: 5 }}
          key={link.id}
          title={link.title}
          url={`${urlPrefix}/${link.id}`}
        />,
      )}
    </Box>
  );
};

export default SectionLinks;
