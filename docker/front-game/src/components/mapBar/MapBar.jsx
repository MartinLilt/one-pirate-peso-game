import {
  StyledMapBar,
  StyledContainer,
  StyledMainButton,
  StyledButtonDisplay,
  StyledButtonDeep,
  StyledButtonMap,
  StyledButtonPosition,
  StyledButtonBonus,
} from "./mapBar.styled";

const MapBar = () => {
  return (
    <StyledMapBar>
      <StyledContainer>
        <StyledMainButton type="button"></StyledMainButton>
      </StyledContainer>
      <StyledButtonDisplay type="button"></StyledButtonDisplay>
      <StyledButtonDeep type="button"></StyledButtonDeep>
      <StyledButtonMap type="button"></StyledButtonMap>
      <StyledButtonPosition type="button"></StyledButtonPosition>
      <StyledButtonBonus type="button"></StyledButtonBonus>
    </StyledMapBar>
  );
};

export default MapBar;
