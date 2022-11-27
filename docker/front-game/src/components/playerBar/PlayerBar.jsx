import {
  StyledBar,
  StyledContainer,
  StyledContainerImg,
  StyledBarContainer,
} from "./playerBar.styled";

const PlayerBar = ({
  silverCoins = 200000,
  goldCoins = 13321,
  diamondCoins = 14412424,
  playerHealth = 13123,
  playerExp = 78,
  targetHealth = 123812,
  targetExp = 100,
}) => {
  return (
    <StyledBar>
      <StyledBarContainer>
        <StyledContainerImg>
          <img src="" alt="Player Avatar" title="My avatar" />
        </StyledContainerImg>
        <StyledContainer>
          <span title="My silver coins">{silverCoins} s.COIN</span>
          <span title="My golden coins">{goldCoins} g.COIN</span>
          <span title="My diamond coins">{diamondCoins} d.COIN</span>
        </StyledContainer>
      </StyledBarContainer>
      <StyledBarContainer>
        <StyledContainer>
          <span title="My hit points">{playerHealth} p.HP</span>
          <span title="My exp">{playerExp} p.LvL</span>
        </StyledContainer>
      </StyledBarContainer>
      <StyledBarContainer>
        <StyledContainerImg>
          <img src="" alt="Target Avatar" title="My target avatar" />
        </StyledContainerImg>
        <StyledContainer>
          <span title="Target hit points">{targetHealth} p.HP</span>
          <span title="Target exp">{targetExp} p.LvL</span>
        </StyledContainer>
      </StyledBarContainer>
    </StyledBar>
  );
};

export default PlayerBar;
