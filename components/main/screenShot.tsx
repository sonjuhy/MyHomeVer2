import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import PortfolioContext from "../../context/context";
import { useAppSelector } from "../../context/redux/hooks";
import CloseIcon from "@mui/icons-material/Close";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation, Pagination } from "swiper/modules";

const MainSwiper = styled(Swiper)`
  height: 100%;
  width: 100%;
`;
const MainSlider = styled(SwiperSlide)`

display: "flex",
justify-content: "center",
align-items: "center",
`;
const SlideImg = styled.img`
  object-fit: contain;
  width: auto;
  max-height: 100%;
`;
const slideToUpAnimation = keyframes`
  from {
    transform: translateY(-20%);
  }
  to {
    transform: translateY(0);
  }
`;
const TitleSection = styled.div<{ $isVisible: boolean }>`
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToUpAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;
const PageFrame = styled.div`
  opacity: 0;
  transition: all 0.5s;
`;
const SlideCard = (url: string, name: string, smallMode: boolean) => {
  const { prefix }: any = useContext(PortfolioContext);
  return (
    <Box
      sx={{
        padding: smallMode ? "0.2rem" : "1rem",
        height: "100%",
        marginBottom: smallMode ? "2rem" : "0",
      }}
    >
      <Box
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SlideImg
          alt="Slider image"
          src={`${prefix}/image/image/${url}`}
          style={{ padding: smallMode ? "0" : "1rem" }}
        />
      </Box>
      <Typography style={{ margin: smallMode ? "0.2rem" : "1rem" }}>
        {name}
      </Typography>
    </Box>
  );
};
export default function Home() {
  const { prefix }: any = useContext(PortfolioContext);
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 16 : 32;

  const target = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [imageName, setImageName] = useState("");
  const [fullScreen, setFullScreen] = useState(false);

  const closeImageModal = () => {
    setFullScreen(!fullScreen);
  };

  const changeImageName = (name: string) => {
    setImageName(name);
    if (fullScreen === false) setFullScreen(true);
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        ([e]) => {
          const target = e.target as HTMLElement;
          if (e.isIntersecting) {
            target.style.opacity = "1";
            setIsVisible(true);
          } else {
            target.style.opacity = "0";
            setIsVisible(false);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(target.current as Element);
    }
  }, [target]);
  return (
    <PageFrame ref={target} style={{ marginTop: smallMode ? "10vh" : "15vh" }}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={fullScreen}
        onClose={closeImageModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ textAlign: "right", backgroundColor: "#fff", padding: "1rem" }}
        >
          <IconButton aria-label="close" onClick={closeImageModal}>
            <CloseIcon />
          </IconButton>
          <img
            src={`${prefix}/image/image/${imageName}`}
            style={{ maxHeight: "80vh", maxWidth: "80vw" }}
          />
        </Box>
      </Modal>
      <Box
        sx={{
          textAlign: "center",
          height: "100%",
          marginBottom: "10vh",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <TitleSection
            $isVisible={isVisible}
            style={{ marginBottom: smallMode ? "0.2rem" : "3rem" }}
          >
            <Typography
              style={{
                fontSize: smallMode ? fontSize * 1.8 : fontSize * 1.3,
                fontWeight: "bold",
              }}
            >
              ScreenShot
            </Typography>
          </TitleSection>
        </Box>
        <MainSwiper
          loop={true}
          spaceBetween={10}
          centeredSlides={true}
          navigation={smallMode ? false : true}
          pagination={smallMode ? true : false}
          modules={[Pagination, Navigation]}
          style={{
            width: smallMode ? "60%" : "60vw",
            height: smallMode ? "25%" : "55vh",
            marginTop: smallMode ? "5vh" : "5vh",
            marginBottom: smallMode ? "3vh" : "5vh",
          }}
        >
          <MainSlider onClick={() => changeImageName("web/MyHome_Main.PNG")}>
            {SlideCard("web/MyHome_Main.PNG", "Web Main", smallMode)}
          </MainSlider>
          <SwiperSlide onClick={() => changeImageName("web/MyHome_Main2.PNG")}>
            {SlideCard("web/MyHome_Main2.PNG", "Web Main2", smallMode)}
          </SwiperSlide>
          <SwiperSlide onClick={() => changeImageName("web/MyHome_Cloud.PNG")}>
            {SlideCard("web/MyHome_Cloud.PNG", "Web Cloud", smallMode)}
          </SwiperSlide>
          <SwiperSlide onClick={() => changeImageName("android/main.png")}>
            {SlideCard("android/main.png", "Android Main", smallMode)}
          </SwiperSlide>
          <SwiperSlide onClick={() => changeImageName("android/light.png")}>
            {SlideCard("android/light.png", "Android Light", smallMode)}
          </SwiperSlide>
          <SwiperSlide onClick={() => changeImageName("log_page.png")}>
            {SlideCard("log_page.png", "Log Main", smallMode)}
          </SwiperSlide>
          <SwiperSlide onClick={() => changeImageName("log_detail.png")}>
            {SlideCard("log_detail.png", "Log Detail", smallMode)}
          </SwiperSlide>
        </MainSwiper>
      </Box>
    </PageFrame>
  );
}
