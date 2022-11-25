import styled from "styled-components";

export const StyledMapBar = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 20px;
  user-select: none;

  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #000;
`;

export const StyledContainer = styled.div`
  width: inherit;
  height: inherit;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledMainButton = styled.button`
  width: 90%;
  height: 90%;
  border-radius: 50%;
`;

export const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
`;

export const StyledButtonDisplay = styled(StyledButton)`
  bottom: 0;
  right: 0;
`;

export const StyledButtonDeep = styled(StyledButton)`
  top: -30%;
  right: 0;
`;

export const StyledButtonMap = styled(StyledButton)`
  top: -60%;
  right: 0;
`;

export const StyledButtonPosition = styled(StyledButton)`
  top: -90%;
  right: 0;
`;

export const StyledButtonBonus = styled(StyledButton)`
  top: 0;
  right: 0;
`;
