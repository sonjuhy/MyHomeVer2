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
import { eventNames } from "process";
import router from "next/router";
/**
 * Content
 * backend
 * feature
 * 1. security
 *  1-1. php -> spring boot
 *   1-1-1. apply new security code
 *   1-2-1. change language more have proficiency to apply more higher level security code or lib
 *  1-2. ADD spring security
 *   1-2-1. apply JWT (improve security to use jwt. not send info direct) [need to hide account info when send client <-> server]
 *   1-2-2. add rule on account [need to feature that only account that have permission access]
 *   1-2-3. add jwtFilter beforeSecurity filter [check permissioni to request account before business logic for performance, security]
 *   1-2-4. white list - thumbnail, streaming, swagger [for web, android -> jwt in url(not header) -> need to custom filter]
 *   1-2-5. apply customFilter for httpstataus (404, 401, 405 etc...) [for client dev]
 * 2. feature centralization
 * (before : active on android, after : active on server. only call api on android)
 * (expanse service easily to other client(web etc...))
 *  2-1. sign in & up
 *   2-1-1. add rule(div access about account -> only regular account access this service) [same with 1-2-2]
 *  2-2. weather
 *   2-2-1. logic code is moved android to server [become maintenance easliy(api url, key etc...) ]
 *   2-2-1. run heavy logic on server [use low power on mobile device by call api, not running logic code]
 *  2-3. iot
 *   2-3-1. add api for http control on web (spring)
 *  2-4. cloud
 *   2-4-1. file control use api call [too dangerous control file direct with sftp on android]
 *   2-4-2. all file check info for controlled file that not use cloud service every day 00:00 am to use scheduler [still control file direct with sftp on computer in house]
 *   2-4-3. make thumbnail while file check [while search image or video file, user want thumbnail feature]
 *   2-4-4. need to low quality image for thumbnail [too many use data resource to watch thumbnail images]
 *   2-4-5. change way to file info insert to db (insert -> bulk) [file num too many (5k -> 140k)]
 *   2-4-6. apply spring batch (before only scheduler) to search cloud files info and make thumbnails (multi thread) [video file num too many [.0.1k -> 1.4k]]
 * 3. maintenance
 *  3-1. use docker & jenkins (before use systmed) [possible to change server(hardware) by broken hardware]
 *   3-1-1. update easliy
 *   3-1-2. restart service easliy [server shutdown(by disconneted power etc) count is not small]
 *   3-1-3. easy to move server
 *  3-2. iot backend change to django
 *   3-2-1. can dev only logic to use framework [need to only focus logic dev(deploy, memory issue etc...)]
 *   3-2-2. deploy more ealisy before python script
 *   3-2-3. don't use large energy to migration python script to other back-end framework(spring, express etc...)
 *  3-3. Set logging service
 *   3-3-1. use kafka, mongodb, spring boot, nextjs [need to logging service because back-end service is not one, save log when i can't monitoring time]
 *   3-3-2. div part by feature (iot, weather, cloud, cloud check)
 *  3-4. code refactory
 *   3-4-1. make code to block by service(or feature) [make to easy change/update feature or service]
 *   3-4-2. change hard coding data(final typeof String, int) to enum
 *
 */
/**
 * Design
 * Scroll down(time sequence)
 * if clieck image, popup effect
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
        document.getElementById("backend-container")?.offsetWidth;

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
    <div id="backend-container">
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
          <Typography variant="h5">Back-End Sequence</Typography>
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
            security
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
                Change PHP to Spring Boot
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent fontSize={fontSize} fontWeight={"bolder"}>
                Apply Spring Security
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="jwt"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="rule"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="jwtFilter"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="whiteList"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="customFilter"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
          id="feature item"
          style={{
            width: "90%",
            marginBottom: "3rem",
          }}
        >
          <Typography
            variant="overline"
            fontSize={fontSize * 2}
            fontWeight={"bolder"}
          >
            feature
          </Typography>
          <Stack>
            <Typography variant="overline" fontSize={fontSize * 1.5}>
              goal
            </Typography>
            <ListItemText>
              <Typography fontSize={fontSize * 1}>
                1. 메인 로직을 실행 하는 주체 변경. (Android → Server)
              </Typography>
              <Typography fontSize={fontSize * 1}>
                2. 기능을 서버로 통합하여 여러 클라이언트에서도 동일한 서비스를
                사용할 수 있도록 확장성 개선.
              </Typography>
            </ListItemText>
          </Stack>
          <Grid container style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontWeight={"bolder"} fontSize={fontSize * 1.6}>
                Category
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontWeight={"bolder"} fontSize={fontSize * 1.6}>
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
                Weather
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="weatherFeature"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
                IoT
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="iotFeature"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
                Cloud
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="sftp"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="fullSearch"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="thumbnail"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="lowQualityImage"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="walksAndBulk"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="batch"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
          id="maintenance item"
          style={{
            width: "90%",
            marginBottom: "3rem",
          }}
        >
          <Typography
            variant="overline"
            fontSize={fontSize * 2}
            fontWeight={"bolder"}
          >
            maintenance
          </Typography>
          <Stack>
            <Typography variant="overline" fontSize={fontSize * 1.5}>
              goal
            </Typography>
            <ListItemText>
              <Typography fontSize={fontSize * 1}>
                1. 유지 보수를 쉽게 하도록 하여 서비스 제공에 문제가 없도록 하는
                것.
              </Typography>
              <Typography fontSize={fontSize * 1}>
                2. 주요 로직을 서버로 처리하여 에러가 나더라도 클라이언트는 수정
                없이 해결할 수 있도록 할 것.
              </Typography>
            </ListItemText>
          </Stack>
          <Grid container style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontWeight={"bolder"} fontSize={fontSize * 1.6}>
                Category
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography fontWeight={"bolder"} fontSize={fontSize * 1.6}>
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
                Use Docker & Jenkins
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="CIAndCD"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="restart"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="container"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
                Weather
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="weatherMaintenance"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
                IoT Back-End Change
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="onlyLogic"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="migration"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
                Log System
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="buildLogSystem"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="logDivPart"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
                Code Refactoring
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="block"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="enum"
                  codeType="java"
                  setModalData={setModalData}
                  part="backend"
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
