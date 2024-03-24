import WelcomeComponent from "../../components/main/welcome";
import IntroComponent from "../../components/main/intro";
import TargetComponent from "../../components/main/target";
import ExplainDocComponent from "../../components/main/explainDoc";
import ExplainDevComponent from "../../components/main/explainDev";
import ScreenShotComponent from "../../components/main/screenShot";

export default function Home() {
  return (
    <div>
      <WelcomeComponent />
      <IntroComponent />
      <TargetComponent />
      <ExplainDocComponent />
      <ExplainDevComponent />
      <ScreenShotComponent />
      {/** 개요 */}
      {/** 목적 */}
      {/** 소개(팀원, 기간, 핵심기능, 파트별 기여도) */}
      {/** 소개(기술 스택, 개발 환경, 구조도) */}
      {/** 이미지 */}
    </div>
  );
}
