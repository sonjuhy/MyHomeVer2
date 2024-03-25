import WelcomeComponent from "../../components/main/welcome";
import IntroComponent from "../../components/main/intro";
import TargetComponent from "../../components/main/target";
import ExplainDocComponent from "../../components/main/explainDoc";
import ExplainDevComponent from "../../components/main/explainDev";
import ScreenShotComponent from "../../components/main/screenShot";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { useEffect } from "react";
import { changeSmallMode } from "../../context/redux/feature/pageSize/pageSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const smallMode = useAppSelector((state) => state.page.smallMode);

  useEffect(() => {
    const handleResize = () => {
      // 컨테이너의 너비를 감지하여 글자 크기 동적 조절
      const containerWidth =
        document.getElementById("main_container")?.offsetWidth;

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

    // 컴포넌트 언마운트 시에 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div id="main_container">
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
