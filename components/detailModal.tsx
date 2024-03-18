import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, Divider, Grid, IconButton } from "@mui/material";
import { CodeBlock, dracula } from "react-code-blocks";
import CloseIcon from "@mui/icons-material/Close";

import codeStore from "../context/codeStore";
import imagePathStore from "../context/imagePathStore";

import { useAppSelector } from "../context/redux/hooks";
import PortfolioContext from "../context/context";
import { Router, useRouter } from "next/router";

interface DetailModalProps {
  part: string;
  name: string;
  codeType: string;
  title: string;
  content: string;
  problems: string[];
  solved: string[];
  show: boolean;
  handleStatus: () => void;
}

export default function Detail({
  part,
  name,
  codeType,
  title,
  content,
  problems,
  solved,
  show,
  handleStatus,
}: DetailModalProps) {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [imageName, setImageName] = React.useState("");

  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 14 : 16;
  const { prefix }: any = React.useContext(PortfolioContext);

  const router = useRouter();

  const codeItemLength: number = codeStore[part][name]["len"];
  const codeTitleList: string[] = codeStore[part][name]["title"];
  const codeList: string[] = codeStore[part][name]["code"];

  const imageLength: number = imagePathStore[part][name]["len"];
  const imageTitleList: string[] = imagePathStore[part][name]["title"];
  const imagePathList: string[] = imagePathStore[part][name]["path"];

  const closeMainModal = () => {
    setFullScreen(false);
    handleStatus();
  };
  const closeImageModal = () => {
    setFullScreen(!fullScreen);
    handleStatus();
  };
  const clickImage = (name: string) => {
    setImageName(name);
    setFullScreen(true);
    handleStatus();
  };

  return (
    <Box sx={{ borderRadius: "50%" }}>
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
        <Box sx={{ textAlign: "right" }}>
          <IconButton aria-label="close" onClick={closeImageModal}>
            <CloseIcon />
          </IconButton>
          <img src={`${prefix}/image/image/${imageName}`} />
        </Box>
      </Modal>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={show}
        onClose={closeMainModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#f4f5ff",
            borderRadius: "1rem",
            width: smallMode ? "95%" : "85%",
            height: smallMode ? "95%" : "85%",
          }}
        >
          <Box sx={{ margin: "1rem", height: "100%" }}>
            <Box
              sx={{ width: "100%", textAlign: smallMode ? "right" : "right" }}
            >
              <IconButton aria-label="close" onClick={closeMainModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container direction={"row"} style={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                style={{ height: smallMode ? "10%" : "90%" }}
              >
                <Box sx={{ margin: "0.5rem" }}>
                  <Typography
                    variant="overline"
                    fontSize={fontSize}
                    fontWeight={"bolder"}
                  >
                    📙 problem
                  </Typography>
                  <Typography fontWeight={"bolder"}>{title}</Typography>
                  <Divider
                    style={{
                      marginTop: smallMode ? "0" : "1.5rem",
                      marginBottom: smallMode ? "0" : "1.5rem",
                    }}
                  />
                  <Typography variant="overline" fontSize={fontSize}>
                    📃 Solution
                  </Typography>
                  <Typography>{content}</Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={9}
                lg={9}
                style={{ height: smallMode ? "55%" : "85%" }}
              >
                <Card
                  style={{
                    margin: smallMode ? "0" : "0.5rem",
                    height: "100%",
                    overflowY: "auto",
                    overscrollBehavior: "auto",
                  }}
                >
                  {problems.map((_data, idx) => {
                    return (
                      <div key={idx} style={{ margin: "0.5rem" }}>
                        <Typography
                          variant="overline"
                          fontSize={fontSize}
                          fontWeight={"bolder"}
                        >
                          📕 problem {idx + 1}.
                        </Typography>
                        <Typography>{problems[idx]}</Typography>
                        <Typography variant="overline" fontSize={fontSize}>
                          📖 Solution {idx + 1}.
                        </Typography>
                        <Typography>{solved[idx]}</Typography>
                        <br />
                        {codeItemLength > idx && (
                          <div>
                            <Typography>
                              🧾 Code {idx + 1}. {codeTitleList[idx]}
                            </Typography>
                            <div style={{ fontSize: 14 }}>
                              <CodeBlock
                                language={codeType}
                                showLineNumbers={true}
                                theme={dracula}
                                text={codeList[idx]}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {imageLength > 0 && (
                    <div>
                      <Typography
                        variant="overline"
                        fontSize={fontSize}
                        fontWeight={"bolder"}
                        marginLeft={"0.5rem"}
                      >
                        📸 screenshot
                      </Typography>
                      <Typography
                        fontSize={fontSize * 0.8}
                        marginLeft={"0.5rem"}
                        marginBottom={"0.9rem"}
                      >
                        ※ 이미지를 클릭 시, 확대됩니다.
                      </Typography>
                      {imagePathList.map((path, idx) => {
                        return (
                          <div key={idx} style={{ margin: "0.5rem" }}>
                            <Typography>◽ {imageTitleList[idx]}</Typography>
                            <br />
                            <img
                              src={`${prefix}/image/image/${path}`}
                              onClick={() => clickImage(path)}
                              style={{ cursor: "pointer" }}
                            />
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Modal>
    </Box>
  );
}
