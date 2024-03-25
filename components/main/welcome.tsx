import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import PortfolioContext from "../../context/context";
import { useAppSelector } from "../../context/redux/hooks";

const slideRightAnimation = keyframes`
  from {
    transform: translateX(-3%);
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// display: flex;
// justify-content: center;
// align-items: center;
const WelcomeSection = styled.div`
  margin-top: 30vh;
  height: 100vh;
  text-align: center;
  font-size: 2rem;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
  animation: ${slideRightAnimation} 1.5s ease-in-out forwards;
`;

export default function Home() {
  const { prefix }: any = useContext(PortfolioContext);
  const smallMode = useAppSelector((state) => state.page.smallMode);
  console.log(smallMode);
  return (
    <WelcomeSection>
      <Grid
        container
        direction={"row-reverse"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          style={{
            display: smallMode ? "flex" : "",
            justifyContent: smallMode ? "center" : "",
            alignItems: smallMode ? "center" : "",
          }}
        >
          <img
            src={`${prefix}/image/image/MockUpMobileTablet.png`}
            width={smallMode ? 300 : 500}
            height={smallMode ? 300 : 500}
            alt={""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <div style={{ width: "80%", textAlign: "left" }}>
            <Typography>Welcome!</Typography>
            <Typography>This is MyHome Project Ver.2 Portfolio</Typography>
            <Typography>Please scroll down and watch it</Typography>
          </div>
        </Grid>
      </Grid>
    </WelcomeSection>
  );
}
