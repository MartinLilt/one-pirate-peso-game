import styled from "styled-components";

export const StyledArmoryBar = styled.div`
  position: fixed;
  bottom: 0;
  right: 50%;
  margin: 20px;
  transform: translateX(50%);
  user-select: none;
`;

export const StyledArmoryList = styled.div`
  display: flex;
`;

export const StyledSkill = styled.button`
  border: 2px solid #000;
  width: 45px;
  height: 45px;
  border-radius: 10%;
`;
