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
import { useContext, useEffect, useState } from "react";

import DetailModal from "../../../components/detailModal";
import CustomTimeLineContent from "../../../components/timeLineContent";
import { useAppDispatch, useAppSelector } from "../../../context/redux/hooks";
import PortfolioContext from "../../../context/context";
import { changeSmallMode } from "../../../context/redux/feature/pageSize/pageSlice";
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
  const [modalProblem, setModalProblem] = useState("Modal Problem");
  const [modalSolved, setModalSolved] = useState("Modal solved");

  const [modalOpen, setModalOpen] = useState(false);
  const controlModalVisible = () => {
    setModalOpen(!modalOpen);
  };

  const dispatch = useAppDispatch();
  const { prefix }: any = useContext(PortfolioContext);
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 14 : 16;

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
        code="test code"
        show={modalOpen}
        handleStatus={controlModalVisible}
        title={modalTitle}
        content={modalContent}
        problems={modalProblem}
        solved={modalSolved}
      />
      <Stack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box textAlign={"center"} width={"80%"}>
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
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "서버 ↔ 클라이언트 통신 간 데이터 보안 필요",
                    "JWT 적용",
                    "기존에는 api 호출 할때 유저 정보가 필요 시, 별도의 암호화 없이 그대로 전송하였기에 정보가 중간에 탈취 될 경우 그대로 정보가 유출되기에 암호화 하여 통신을 하도록 변경해야함.",
                    "JWT를 이용하여 토큰을 이용하여 개인 인증을 하도록 변경. 토큰에 저장되는 값도 민감하지 않은 정보를 이용하여 혹시나 경우를 대비.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "계정 별 접근 권한 분리 필요",
                    "Rule을 부여하여 계정 별 서비스 접근 권한 부여",
                    "기존에는 회원가입만 할 경우 누구나 서비스 접근 가능한 문제가 존재. 서비스의 접근성이 넓어진 만큼 외부인원이 함부로 서비스를 사용하지 못하도록 제한을 걸어야 할 필요성 제기.",
                    "계정 정보에 Rule을 추가하여 정회원 이상만 서비스에 접근 가능하도록 설정. 뿐만 아니라 관리자와 정회원도 구분하여 관리자 기능이 필요할 상황을 대비.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "비지니스 로직 실행 전, 요청에 대한 권한 확인 필요",
                    "커스텀 JWT 필터를 적용",
                    "일부 제외하고 대부분 기능에서 동일한 보안 정책을 가져가야하는 상황에서 보안이 필요한 모든 기능이 실행되기 전에 비즈니스 로직에서 처리하는 것보다 미리 인가 / 인증을 처리하도록 하고싶음.",
                    "Spring Security에 커스텀 JWT 필터를 적용하여 API 요청이 왔을때, 올바른 권한을 가진 요청인지 아닌지를 판단하여 알맞은 결과를 실행하도록 함.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "일부 API 요청할때 header 안에 토큰을 담기 힘든 경우 존재",
                    "해당 api만 url에 토큰을 추가하고 white 리스트로 별도 관리",
                    "일부 API를 요청할때 header 안에 JWT 토큰을 넣기 힘든 경우가 존재하여 url안에 넣는 방식으로 대신 인가 / 인증을 처리하고자 함.",
                    "해당 API url을 white-list로 분류하여 별도의 인가 / 인증 로직을 통해 올바른 권한을 가진 요청인지 확인 후 결과를 실행하도록 함.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "클라이언트 개발을 위해 상황별 상태값 리턴 필요",
                    "커스텀 필터를 통해 httpStatus 코드 리턴",
                    "단순하게 권한 체크 우선 이후 로직 처리 패턴으로 하니 존재하지 않는 API요청을 올바르지 않은 권한으로 요청할 경우 404가 아닌 401이 리턴되는 상황이 발생. 클라이언트 개발할 때도 아주 좋지않은 상황이기에 수정하기로 결정.",
                    "커스텀 필터를 통해 권한 에러 뿐만 아니라 여러 에러 상황들(404, 405 등)을 올바르게 리턴함으로서 클라이언트 개발 및 사용자 입장에서도 정확한 정보를 제공하도록 수정함.",
                  ]}
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
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "모든 클라이언트에게 날씨 정보 제공.",
                    "기상청 API를 서버에서 호출 및 데이터 파싱을 통해 클라이언트에게 전송",
                    "날씨 정보 제공을 위해 최소 3개의 API를 호출하고 데이터를 파싱하는 과정이 필요. 특히 모바일 환경에서는 연산이 많아질수록 베터리 런타임에도 악영향.",
                    "서버에서 기상청으로부터 데이터를 받고 가공하여 클라이언트는 최소한의 데이터로만 필요한 정보를 사용자에게 제공할 수 있도록 변경.",
                  ]}
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
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "웹에서도 IoT 서비스를 사용할 수 있어야 함.",
                    "IoT 제어 관련 API를 제공.",
                    "안드로이드에서 MQTT를 통해 IoT를 제어 하던 방식 대신 간단하게 많은 리소스를 사용하지 않고 사용하고 싶어함.",
                    "Rest API를 통해 기능을 제공하고 서버에서 해당 값으로 IoT를 제어하는 방향으로 서비스 제공.",
                  ]}
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
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "파일 제어를 직접 제어하는 위험이 큼",
                    "파일 제어 요청만 하고 서버에서 처리하는 방식으로 변경",
                    "기존에는 안드로이드에서 SFTP를 통해 직접 제어하였음. 그에 따라 속도와 파일 제어에 대한 안정성 그리고 추가 기능(썸네일 등)을 위해 방식 변경 필요.",
                    "파일 정보를 DB에 최신화하여 저장하고 이를 통해 클라이언트는 정보를 주고받는 형식으로 변경. 파일 제어는 서버에서 담당.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "클라우드 서비스 외 방식으로 제어된 파일 정보 최신화를 해야함.",
                    "주기적으로 클라우드 파일 풀 서치를 통해 파일 정보 최신화.",
                    "집 내부 네트워크를 통해 파일을 제어하는 경우 파일 정보가 DB에 저장이 안됨.",
                    "Scheduler를 사용하여 매일 밤 12시 비동기로 클라우드 하드 풀 서치를 통해 파일 정보 전부 최신화 유지.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "이미지, 비디오 파일들을 바로 인식하기 어려움.",
                    "썸네일을 이용하여, 해당 파일에 대한 정보 제공.",
                    "이미지 및 비디오 파일은 썸네일을 통해 미리 파일에 대한 정보를 확인 할 수 있는 방법이 존재함.",
                    "클라우드 풀 서치할때, 비디오 파일은 추가적으로 썸네일 제작 과정을 통해 해당 기능을 제공하도록 함.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "썸네일 혹은 이미지 미리보기 기능에 너무 많은 데이터 소모",
                    "이미지 해상도를 낮게 포맷하여 제공",
                    "썸네일 혹은 이미지 미리보기 기능에 사용되는 이미지의 용량이 너무 커서 과도한 데이터 사용을 요구함.",
                    "썸네일은 제작 할때 저용량으로 제작, 이미지는 전송 전 화질 다운그레이드 후 전송으로 데이터 용량 줄임.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "풀 서치 후 DB에 파일 정보 저장하는데 너무 오래 걸림.",
                    "탐색은 walks, insert는 bulk를 이용.",
                    "파일 갯수가 5천개에서 14만개 이후 300만개까지 증가하여서 해당 데이터들을 탐색하고 DB에 단순하게 insert하는데 시간이 너무 오래걸림.",
                    "탐색하는 방식을 walks를 통해 498% 시간 개선을 이뤄냈고, DB에 데이터를 넣는 방식을 bulk으로 변경 후 1,689% 시간 개선을 이뤄냄.",
                  ]}
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "영상 갯수가 늘어남에 따라 같이 늘어난 썸네일 만드는 시간을 줄이기.",
                    "Spring batch의 multi-thread 이용.",
                    "영상 파일 갯수가 100개에서 1400개로 증가함에 따라 하루에 한번 풀 서치할때 소요되는 시간이 1시간 추가 됨.",
                    "Spring batch의 multi-thread를 이용하여 3개로 비동기 처리하여 시간을 20분으로 단축시킴.",
                  ]}
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
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "배포해야할 서비스가 증가함에 따라 자동 CI/CD 필요.",
                    "Docker와 Jenkins, GitHub를 이용한 자동 CI/CD 구축.",
                    "웹, 백엔드(Spring, Django), 로그 웹, 로그 백엔드 등 배포해야할 서비스가 많아짐에 따라 수동 배포보단 자동 배포로 효율성 높일 필요성 증가.",
                    "서버에서 기상청으로부터 데이터를 받고 가공하여 클라이언트는 최소한의 데이터로만 필요한 정보를 사용자에게 제공할 수 있도록 변경.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "쉽게 서비스 자동 재시작 필요.",
                    "Docker 컨테이너 옵션을 이용한 자동 재시작.",
                    "서버가 수시로 발생한 정전으로 인해 강제 재부팅이 빈번하게 발생. 서버 재부팅 완료 시, 서비스 재시작 필요.",
                    "Docker 컨테이너 옵션 중 restart 옵션을 사용하여 서버 재부팅 시, 컨테이너 재시작하도록 설정.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "서비스를 다른 서버로 언제든 옮길 수 있도록 준비 필요.",
                    "서비스를 Docker 컨테이너화.",
                    "서버가 수시로 발생한 정전으로 인해 내구성에 대한 신뢰성 하락. 서비스를 언제든 옮길 수 있도록 준비.",
                    "서비스 코드를 전부 Docker 컨테이너 화. MongoDB의 데이터는 외부 하드에 백업.",
                  ]}
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
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "기상청 API 변경에 대한 대응 및 추후 변경 가능성에 대해 대비.",
                    "기상청 API 변경되어 이에 대해 대응 및 기능 서버로 이전하여 중앙화.",
                    "기존에 안드로이드에서 제공하는 기상청 API가 주소, API key 만료, 제공된 데이터값 변동에 의해 서비스 중지.",
                    "클라이언트(안드로이드)에서 사용중이던 기상청 API가 API 주소, key, 데이터 타입이 달라지는 상황 발생하여, 날씨 서비스를 서버로 중앙화 하여 유지 보수를 쉽게 변경.",
                  ]}
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
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "파일 제어를 직접 제어하는 위험이 큼",
                    "파일 제어 요청만 하고 서버에서 처리하는 방식으로 변경",
                    "기존에는 안드로이드에서 SFTP를 통해 직접 제어하였음. 그에 따라 속도와 파일 제어에 대한 안정성 그리고 추가 기능(썸네일 등)을 위해 방식 변경 필요.",
                    "파일 정보를 DB에 최신화하여 저장하고 이를 통해 클라이언트는 정보를 주고받는 형식으로 변경. 파일 제어는 서버에서 담당.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "클라우드 서비스 외 방식으로 제어된 파일 정보 최신화를 해야함.",
                    "주기적으로 클라우드 파일 풀 서치를 통해 파일 정보 최신화.",
                    "집 내부 네트워크를 통해 파일을 제어하는 경우 파일 정보가 DB에 저장이 안됨.",
                    "Scheduler를 사용하여 매일 밤 12시 비동기로 클라우드 하드 풀 서치를 통해 파일 정보 전부 최신화 유지.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "이미지, 비디오 파일들을 바로 인식하기 어려움.",
                    "썸네일을 이용하여, 해당 파일에 대한 정보 제공.",
                    "이미지 및 비디오 파일은 썸네일을 통해 미리 파일에 대한 정보를 확인 할 수 있는 방법이 존재함.",
                    "클라우드 풀 서치할때, 비디오 파일은 추가적으로 썸네일 제작 과정을 통해 해당 기능을 제공하도록 함.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "썸네일 혹은 이미지 미리보기 기능에 너무 많은 데이터 소모",
                    "이미지 해상도를 낮게 포맷하여 제공",
                    "썸네일 혹은 이미지 미리보기 기능에 사용되는 이미지의 용량이 너무 커서 과도한 데이터 사용을 요구함.",
                    "썸네일은 제작 할때 저용량으로 제작, 이미지는 전송 전 화질 다운그레이드 후 전송으로 데이터 용량 줄임.",
                  ]}
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
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "풀 서치 후 DB에 파일 정보 저장하는데 너무 오래 걸림.",
                    "탐색은 walks, insert는 bulk를 이용.",
                    "파일 갯수가 5천개에서 14만개 이후 300만개까지 증가하여서 해당 데이터들을 탐색하고 DB에 단순하게 insert하는데 시간이 너무 오래걸림.",
                    "탐색하는 방식을 walks를 통해 498% 시간 개선을 이뤄냈고, DB에 데이터를 넣는 방식을 bulk으로 변경 후 1,689% 시간 개선을 이뤄냄.",
                  ]}
                  handleStatus={controlModalVisible}
                />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <CustomTimeLineContent
                  name="rule"
                  codeType="java"
                  useStatusSet={[
                    setModalTitle,
                    setModalContent,
                    setModalProblem,
                    setModalSolved,
                  ]}
                  contentSet={[
                    "영상 갯수가 늘어남에 따라 같이 늘어난 썸네일 만드는 시간을 줄이기.",
                    "Spring batch의 multi-thread 이용.",
                    "영상 파일 갯수가 100개에서 1400개로 증가함에 따라 하루에 한번 풀 서치할때 소요되는 시간이 1시간 추가 됨.",
                    "Spring batch의 multi-thread를 이용하여 3개로 비동기 처리하여 시간을 20분으로 단축시킴.",
                  ]}
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
