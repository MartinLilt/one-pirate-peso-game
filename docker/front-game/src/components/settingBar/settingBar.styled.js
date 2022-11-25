import styled from "styled-components";

export const StyledSettingBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px;
  user-select: none;
`;

export const StyledContainer = styled.div`
  margin: 0 0 10px 0;
`;

export const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:not(:last-child) {
    margin: 0 15px 0 0;
  }
`;
