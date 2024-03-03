import {
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect } from "react";
import PortfolioContext from "../../../context/context";
import { useAppDispatch, useAppSelector } from "../../../context/redux/hooks";
import { changeSmallMode } from "../../../context/redux/feature/pageSize/pageSlice";
import SvgPocket from "../../../public/image/svg/SvgPath";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { prefix }: any = useContext(PortfolioContext);

  const dispatch = useAppDispatch();
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 16 : 32;

  useEffect(() => {
    const handleResize = () => {
      // 컨테이너의 너비를 감지하여 글자 크기 동적 조절
      const containerWidth =
        document.getElementById("about_container")?.offsetWidth;

      // 예시: 너비가 200px 이하일 때 글자 크기를 14로, 그 외에는 16으로 설정
      if (containerWidth && containerWidth <= 900) {
        dispatch(changeSmallMode(true));
      } else {
        dispatch(changeSmallMode(false));
      }
    };
    const handleButtonClick = (url: string) => {
      window.open(url, "_blank");
    };

    // 초기 로드 시와 창 크기 변경 시에 이벤트 리스너 등록
    handleResize();
    window.addEventListener("resize", handleResize);

    const portfolioButton = document.getElementById("personalPortfolioGrid");
    if (portfolioButton) {
      portfolioButton.addEventListener("click", () =>
        handleButtonClick("https://sonjuhy.github.io/Portfolio")
      );
    }
    const githubButton = document.getElementById("githubGrid");
    if (githubButton) {
      githubButton.addEventListener("click", () =>
        handleButtonClick("https://github.com/sonjuhy")
      );
    }
    const blogButton = document.getElementById("blogGrid");
    if (blogButton) {
      blogButton.addEventListener("click", () =>
        handleButtonClick("https://sonjuhy.tistory.com/")
      );
    }
    const repositoryButton = document.getElementById("repositoryGrid");
    if (repositoryButton) {
      repositoryButton.addEventListener("click", () =>
        handleButtonClick("https://github.com/sonjuhy/MyHomeVer2")
      );
    }

    // 컴포넌트 언마운트 시에 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="about_container"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f5ff",
      }}
    >
      <Item style={{ width: smallMode ? "80%" : "50%", marginBottom: "3rem" }}>
        <Stack
          direction={"row"}
          spacing={4}
          style={{ margin: smallMode ? "0.5rem" : "3rem" }}
        >
          <img
            src={
              prefersDarkMode
                ? `${prefix}/image/icon/MyHomeIcon-white.png`
                : `${prefix}/image/icon/MyHomeIcon.png`
            }
            width={smallMode ? "75" : "150"}
            height={smallMode ? "75" : "150"}
          ></img>
          <Stack
            style={{
              textAlign: "left",
              marginLeft: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{
                fontSize: smallMode ? fontSize : fontSize * 0.9,
                fontWeight: "bold",
              }}
            >
              MyHome Ver. 1 Portfolio
            </Typography>
            <Typography
              style={{
                fontSize: smallMode ? fontSize : fontSize,
                fontWeight: "bold",
              }}
            >
              IoT Project
            </Typography>
          </Stack>
        </Stack>
        <hr />
        <br />

        <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 24 24"
              width={smallMode ? 24 : 48}
              height={smallMode ? 24 : 48}
            >
              <path d={SvgPocket.gmailPartsPath} />
            </svg>
          </Grid>
          <Grid item xs={8} sm={8} md={9} lg={9}>
            <Stack
              style={{
                textAlign: "left",
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>EMAIL</Typography>
              <Typography>sonjuhy@gmail.com</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 24 24"
              width={smallMode ? 24 : 48}
              height={smallMode ? 24 : 48}
            >
              <path d={SvgPocket.repositoryPath} />
            </svg>
          </Grid>
          <Grid
            id="repositoryGrid"
            item
            xs={8}
            sm={8}
            md={9}
            lg={9}
            style={{ cursor: "pointer" }}
          >
            <Stack
              style={{
                textAlign: "left",
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>
                PROJECT REPOSITORY
              </Typography>
              <Typography>Click Here</Typography>
            </Stack>
          </Grid>
        </Grid>

        <br />
        <hr />
        <br />
        <Grid container spacing={2} direction={"row"}>
          <Grid
            id="githubGrid"
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Tooltip title="github" placement="top" arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d={SvgPocket.githubPath} />
              </svg>
            </Tooltip>
          </Grid>
          <Grid
            id="blogGrid"
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Tooltip title="blog" placement="top" arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d={SvgPocket.bloggerPath} />
              </svg>
            </Tooltip>
          </Grid>
          <Grid
            id="personalPortfolioGrid"
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Tooltip title="portfolio" placement="top" arrow>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d={SvgPocket.paperPath} />
              </svg>
            </Tooltip>
          </Grid>
        </Grid>
        <br />
        <p>Built with Next.js 14, MUI and Github</p>
      </Item>
    </div>
  );
}
