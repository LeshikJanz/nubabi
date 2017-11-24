// @flow
import React, { PureComponent } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import Activities from './Activities';
import { Baby } from 'core/types/modelTypes';
import { Loader } from 'web/components';

type Props = {
  baby: Baby,
};

const Wrapper = styled(Flex)`
  margin-top: 45px;
  background: ${props => props.theme.bg.panel};
  padding: 15px;
  max-height: 68px;
`;

class Stimulation extends PureComponent<Props> {
  render() {
    const { baby } = this.props;

    if (!baby) {
      return <Loader active />;
    }

    return (
      <Wrapper>
        <Activities activities={baby && baby.activities} />
      </Wrapper>
    );
  }
}

export default Stimulation;
