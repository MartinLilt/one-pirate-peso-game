import styled from "styled-components";

export const StyledMenuBar = styled.div`
  position: fixed;
  bottom: 25%;
  margin: 20px;
  user-select: none;

  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:not(:last-child) {
    margin: 0 0 15px 0;
  }
`;
