import {
  StyledSettingBar,
  StyledContainer,
  StyledButton,
} from "./settingBar.styled";

const SettingBar = () => {
  return (
    <StyledSettingBar>
      <StyledContainer>
        <StyledButton type="button"></StyledButton>
        <StyledButton type="button"></StyledButton>
        <StyledButton type="button"></StyledButton>
        <StyledButton type="button"></StyledButton>
      </StyledContainer>
      <div>Quests will be here..</div>
    </StyledSettingBar>
  );
};

export default SettingBar;
