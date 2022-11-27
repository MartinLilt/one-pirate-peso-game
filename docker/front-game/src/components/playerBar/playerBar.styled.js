import styled from "styled-components";

export const StyledBar = styled.div`
  position: fixed;
  top: 0;
  margin: 20px;
  user-select: none;

  display: flex;
`;

export const StyledBarContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin: 0 30px 0 0;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContainerImg = styled.span`
  margin: 0 10px 0 0;
`;
