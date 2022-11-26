import {
  StyledArmoryBar,
  StyledArmoryList,
  StyledSkill,
} from "./armoryBar.styled";

const skills = [
  { id: 0, key: "CTRL-0", skill: "", icon: "" },
  { id: 1, key: "CTRL-1", skill: "", icon: "" },
  { id: 2, key: "CTRL-2", skill: "", icon: "" },
  { id: 3, key: "CTRL-3", skill: "", icon: "" },
  { id: 4, key: "CTRL-4", skill: "", icon: "" },
  { id: 5, key: "CTRL-5", skill: "", icon: "" },
  { id: 6, key: "CTRL-6", skill: "", icon: "" },
  { id: 7, key: "CTRL-7", skill: "", icon: "" },
  { id: 8, key: "CTRL-8", skill: "", icon: "" },
  { id: 9, key: "CTRL-9", skill: "", icon: "" },
];

const ArmoryBar = () => {
  return (
    <StyledArmoryBar>
      <StyledArmoryList>
        {skills.map(({ id, key, skill, icon }) => {
          return <StyledSkill key={id} type="button"></StyledSkill>;
        })}
      </StyledArmoryList>
      <StyledArmoryList>
        {skills.map(({ id, key, skill, icon }) => {
          return <StyledSkill key={id} type="button"></StyledSkill>;
        })}
      </StyledArmoryList>
    </StyledArmoryBar>
  );
};

export default ArmoryBar;
