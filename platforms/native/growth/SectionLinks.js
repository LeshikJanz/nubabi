// @flow
import type { GrowthArticleEdge } from 'core/types';
import React from 'react';
import { Box, Icon, Link, Text } from '../components';
import {
  compose,
  groupBy,
  isNil,
  keys,
  memoize,
  path,
  pluck,
  reject,
} from 'ramda';
import theme from 'core/themes/defaultTheme';

type Props = {
  links: Array<GrowthArticleEdge>,
};

type SectionLinkItemProps = {
  id: string,
  title: string,
};

type SectionProps = {
  name: string,
  links: Array<GrowthArticleEdge>,
};

const sectionMappings = {
  Parenting: 'Parenting Tips',
  Health: 'Health Matters',
};

const iconMappings = {
  'Parenting Tips': 'md-people',
  'Health Matters': 'md-medkit',
};

const urlPrefix = 'nubabi://content/growth';

export const SectionLinkItem = ({ title, id }: SectionLinkItemProps) => {
  const url = [urlPrefix, id].join('/');

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link containerStyle={{ marginVertical: 5 }} title={title} href={url} />
  );
};

const SectionIcon = ({ name }: { name: string }) => {
  const iconName = iconMappings[name];

  if (!iconName) {
    return null;
  }

  return (
    <Icon
      name={iconName}
      color={theme.colors.secondary}
      size={17}
      style={{ marginRight: 10, marginTop: -1 }}
    />
  );
};

export const Section = ({ name, links }: SectionProps) => {
  return (
    <Box contentSpacing>
      {name && (
        <Box flexDirection="row" marginBottom={1}>
          <SectionIcon name={name} />

          <Text medium color="secondary">
            {name.toUpperCase()}
          </Text>
        </Box>
      )}

      {links.map(link => (
        <SectionLinkItem key={link.id} id={link.id} title={link.title} />
      ))}
    </Box>
  );
};

export function getSectionTitle(sectionName: string) {
  return sectionMappings[sectionName];
}

const prepareItems = memoize(links => {
  const items = compose(
    groupBy(path(['section', 'name'])),
    reject(isNil),
    pluck('node'),
  )(links);

  return keys(items).map(sectionName => {
    return (
      <Section
        key={sectionName}
        name={getSectionTitle(sectionName)}
        links={items[sectionName]}
      />
    );
  });
});

export const SectionLinks = ({ links }: Props) => {
  if (!links.length) {
    return null;
  }

  const items = prepareItems(links);

  return (
    <Box contentSpacing backgroundColor="panel" borderRadius={4}>
      {items}
    </Box>
  );
};

export default SectionLinks;
