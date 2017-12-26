import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-bottom: 25px;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 20px 80px 10px 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: flex-end;
  margin-top: 15px;

  button {
    cursor: pointer;
    height: 35px;
    color: white;
    font-size: 14px;
    border-radius: 100px;
    background-color: #ea3154;
    border: none;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex: 1;

  & > .Select {
    flex: 1;
  }

  & > div {
    max-width: none;
  }

  & > div:last-child {
    display: flex;
    flex: 1;
  }

  & > div > input {
    border: none;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding-left: 15px;
    height: 36px;
  }
`;

export const FieldTitle = styled.div`
  color: #a5aaac;
  font-size: 12px;
  width: 100px;
  margin-right: 65px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex: 1;

  & > div {
    flex: 1;
  }

  & > div:first-child {
    margin-right: 15px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;

  & > div:first-child {
    margin-right: 15px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  border: 1px solid #e8e8e8;
  height: 100%;
  border-radius: 4px;

  & > svg,
  img {
    height: 36px;
    width: 55px;
  }
`;

export const CVC = styled.div`
  display; flex;
  align-items: center;
  
  & > div {
    width: 70px;
  }
  
  & > div > input {
    border: none;
    border: 1px solid #E8E8E8;
    border-radius: 4px;
    padding-left: 15px;
    height: 36px;
    width: 70px;
  }
  
  & > img {
    width: 55px;
    height: 36px;
    margin-left: 15px;
    border-radius: 4px;
  }
`;
