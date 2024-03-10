import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import { Container, Paper, Typography, styled } from "@mui/material";

/**
 * Content
 * backend
 * feature
 * 1. security
 *  1-1. php -> spring boot
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
  return (
    <Container>
      <Item
        id="security item"
        style={{
          width: "90%",
          marginBottom: "3rem",
          marginTop: "3rem",
        }}
      >
        <Timeline position="left">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Change PHP to Spring Boot</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Apply Spring Security</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography>
                서버 - 클라이언트 통신 간 데이터 보안 필요
              </Typography>
              <Typography>JWT 적용</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography>계정 별 접근 권한 분리 필요</Typography>
              <Typography>
                Rule을 부여하여 계정 별 서비스 접근 권한 부여
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography>
                비지니스 로직 실행 전, 요청에 대한 권한 확인 필요
              </Typography>
              <Typography>filter 전에 커스텀 JWT 필터를 적용</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography>
                웹에서 이미지 요청할때 header 안에 토큰을 담기 힘든 경우 존재
              </Typography>
              <Typography>
                해당 api만 url에 토큰을 추가하고 white 리스트로 별도 관리
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography>
                클라이언트 개발을 위해 상황별 상태값 리턴 필요
              </Typography>
              <Typography>커스텀 필터를 통해 httpStatus 코드 리턴</Typography>
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
        <Timeline position="alternate-reverse">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Eat</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Repeat</TimelineContent>
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
        <Timeline position="alternate-reverse">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Eat</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Repeat</TimelineContent>
          </TimelineItem>
        </Timeline>
      </Item>
    </Container>
  );
}
