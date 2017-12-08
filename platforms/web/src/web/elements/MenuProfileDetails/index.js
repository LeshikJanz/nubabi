// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  // to: string,
  label: string,
};

const CustomLink = styled(Link)``;

const MenuProfileDetails = (props: Props) => {
  const { label } = props;

  return (
    <CustomLink to="/settings">
      <h3>{label}</h3>
    </CustomLink>
  );
};

export default MenuProfileDetails;
