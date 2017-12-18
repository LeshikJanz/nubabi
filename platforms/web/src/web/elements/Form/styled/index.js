import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div {
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
  }

  & label {
    font-family: SF Pro Text, sans-serif;
    font-size: 10px;
    font-weight: 300;
    text-transform: uppercase;
    color: #9eabbc;
  }

  & input {
    border: none;
    padding: 5px 0 5px 0;
    font-weight: 300;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  & input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
`;
