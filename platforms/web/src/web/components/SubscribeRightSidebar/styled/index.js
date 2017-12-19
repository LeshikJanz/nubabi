import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Button } from 'web/elements';

export const RightSidebar = styled(Flex)`
  flex-grow: 1;
  max-width: 230px;
  flex-direction: column;
`;

export const PlanContainer = styled(Flex)`
  box-shadow: 0px 0px 5px -1px ${props => props.theme.colors.gray};
  background-color: ${props => props.theme.colors.white};
  flex-direction: column;
  align-items: center;
  font-weight: 300;
`;

export const Title = styled.h3`
  font-weight: 300;
  margin: 3px 0 13px 0;
  font-size: 18px;
`;

export const PlanTitle = styled.h3`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 16px;
  margin: 0;
  background-color: ${props => props.theme.colors.lightgrey};
  text-align: center;
  width: 100%;
  padding: 15px 0;
`;

export const Price = styled.span`
  position: relative;
  margin-top: 16px;
  font-size: 50px;
  font-weight: 300;
  color: ${props => props.theme.colors.label};
`;

export const R = styled.span`
  position: absolute;
  font-size: 19px;
  top: 9px;
  left: -20px;
  font-weight: 400;
`;

export const Asterisk = styled.span`
  position: absolute;
  font-size: 29px;
  top: 3px;
  right: -9px;
`;

export const PM = styled.span`
  position: absolute;
  font-size: 20px;
  bottom: 4px;
  right: -35px;
  font-weight: 400;
`;

export const Annually = styled.span`
  margin-top: 13px;
  font-weight: 300;
  color: ${props => props.theme.colors.secondary};
`;

export const Free = styled.span`
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  font-weight: 300;
  margin-top: 6px;
`;

export const ChangePackage = styled(Button)`
  margin: 19px 34px;
  border: 1px solid ${props => props.theme.colors.separator};
  font-weight: 300;
`;

export const Total = styled(Flex)`
  text-transform: uppercase;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 5px;
  height: 63px;
`;

export const TotalaLabel = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.secondary};
`;

export const TotalAmount = styled.span`
  font-size: 18px;
  color: ${props => props.theme.colors.label};
`;
