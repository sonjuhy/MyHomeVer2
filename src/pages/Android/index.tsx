import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import {
  Box,
  Container,
  Divider,
  Grid,
  ListItemText,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

import DetailModal from "../../../components/detailModal";
import CustomTimeLineContent from "../../../components/timeLineContent";
import { useAppDispatch, useAppSelector } from "../../../context/redux/hooks";
import PortfolioContext from "../../../context/context";
import { changeSmallMode } from "../../../context/redux/feature/pageSize/pageSlice";

/**
 * 1. legacy code update
 *  1-1. update sdk 28 -> 34 [user device min sdk is 33]
 *  1-2. change mqtt broadcast (global -> local) [for security]
 *  1-3. change network lib (asynctask -> retrofit2) [deprecated code]
 * 2. ui
 *  2-1. root interface to fragment interface [user want to see all feature in one page]
 *  2-2. component(text, image, item etc...) size is more bigger than before [for visibility]
 *  2-3. in cloud feature, add thumbnail in image or video file [user want to know file before get detail info]
 * 3. maintenance
 *  3-1. change patterns to mvvm
 *  3-2. get default path, key etc info from db. not hard coding
 *  3-3. static info data change enum type before hard coding
 *
 */

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [modalTitle, setModalTitle] = useState("Modal Title");
  const [modalContent, setModalContent] = useState("Modal Content");
  const [modalProblem, setModalProblem] = useState(["Modal Problem"]);
  const [modalSolved, setModalSolved] = useState(["Modal solved"]);
  const [modalCodeType, setModalCodeType] = useState("java");
  const [modalPart, setModalPart] = useState("tmp");
  const [modalName, setModalName] = useState("tmp");

  const [modalOpen, setModalOpen] = useState(false);
  const controlModalVisible = () => {
    setModalOpen(!modalOpen);
  };

  const dispatch = useAppDispatch();
  const { prefix }: any = useContext(PortfolioContext);
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 14 : 16;

  const setModalData = (
    title: string,
    content: string,
    codeType: string,
    part: string,
    name: string,
    problems: string[],
    solutions: string[]
  ) => {
    setModalTitle(title);
    setModalContent(content);
    setModalCodeType(codeType);
    setModalProblem(problems);
    setModalSolved(solutions);
    setModalPart(part);
    setModalName(name);
  };

  useEffect(() => {
    const handleResize = () => {
      // 컨테이너의 너비를 감지하여 글자 크기 동적 조절
      const containerWidth =
        document.getElementById("android-container")?.offsetWidth;

      // 예시: 너비가 200px 이하일 때 글자 크기를 14로, 그 외에는 16으로 설정
      if (containerWidth && containerWidth <= 900) {
        dispatch(changeSmallMode(true));
      } else {
        dispatch(changeSmallMode(false));
      }
    };
    // 초기 로드 시와 창 크기 변경 시에 이벤트 리스너 등록
    handleResize();
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시에 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="android-container">
      <DetailModal
        part={modalPart}
        name={modalName}
        show={modalOpen}
        handleStatus={controlModalVisible}
        title={modalTitle}
        content={modalContent}
        problems={modalProblem}
        solved={modalSolved}
        codeType={modalCodeType}
      />
      <Stack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box textAlign={"center"} width={"80%"}>
          <br />
          <Typography variant="h5">Android Sequence</Typography>
          <br />
          <Typography>
            개발 과정 중 발생한 문제와 해결 과정을 순서대로 담은 페이지입니다.
          </Typography>
          <br />
          <Typography fontSize={fontSize}>
            자세한 내용을 보고싶으시면, Problem & Solution의 내용을 클릭하여
            주시기 바랍니다.
          </Typography>
        </Box>

        <Item
          id="security item"
          style={{
            width: "90%",
            marginBottom: "3rem",
            marginTop: "3rem",
          }}
        >
          <Typography
            variant="overline"
            fontSize={fontSize * 2}
            fontWeight={"bolder"}
          >
            update
          </Typography>
          <Grid container style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontSize={fontSize * 1.6}>Category</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontSize={fontSize * 1.6}>
                Problem & Solution
              </Typography>
            </Grid>
          </Grid>
          <Timeline position="left">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                SDK Update
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="sdk"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Change BroadCast Range
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="broadcast"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Change HTTP Library
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="retrofit2"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
          </Timeline>
        </Item>
        <Item
          id="security item"
          style={{
            width: "90%",
            marginBottom: "3rem",
            marginTop: "3rem",
          }}
        >
          <Typography
            variant="overline"
            fontSize={fontSize * 2}
            fontWeight={"bolder"}
          >
            UI
          </Typography>
          <Grid container style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontSize={fontSize * 1.6}>Category</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontSize={fontSize * 1.6}>
                Problem & Solution
              </Typography>
            </Grid>
          </Grid>
          <Timeline position="left">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Change to Fragment
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="fragment"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Component Size Up
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="component"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                ADD Thumbnail Feature
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="thumbnail"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
          </Timeline>
        </Item>
        <Item
          id="security item"
          style={{
            width: "90%",
            marginBottom: "3rem",
            marginTop: "3rem",
          }}
        >
          <Typography
            variant="overline"
            fontSize={fontSize * 2}
            fontWeight={"bolder"}
          >
            maintenance
          </Typography>
          <Grid container style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontSize={fontSize * 1.6}>Category</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontSize={fontSize * 1.6}>
                Problem & Solution
              </Typography>
            </Grid>
          </Grid>
          <Timeline position="left">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Apply Design Pattern
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="mvvm"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Change how to manage Default Info
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="defaultInfo"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Apply Enum
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="enum"
                  codeType="java"
                  setModalData={setModalData}
                  part="android"
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
          </Timeline>
        </Item>
      </Stack>
    </div>
  );
}
