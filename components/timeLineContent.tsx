import { Box, Typography, styled } from "@mui/material";
import { useAppSelector } from "../context/redux/hooks";
import explainStore from "../context/explainStore";

interface customTimeLineContentProps {
  name: string;
  part: string;
  codeType: string;
  setModalData: (
    title: string,
    content: string,
    codeType: string,
    part: string,
    name: string,
    problems: string[],
    solutions: string[]
  ) => void;
  handleStatus: () => void;
}
const Explain = styled("div")(({ theme }) => ({
  transition: "all 0.5s",
  borderRadius: "0.5rem",
  padding: "0.2rem",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#111" : "#f4f5ff",
  },
}));
export default function TimeLineContent({
  name,
  codeType,
  part,
  setModalData,
  handleStatus,
}: customTimeLineContentProps) {
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 14 : 16;

  const title: string = explainStore[part][name]["title"];
  const content: string = explainStore[part][name]["content"];
  const problem: string[] = explainStore[part][name]["problem"];
  const solution: string[] = explainStore[part][name]["solution"];

  return (
    <Explain>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setModalData(title, content, codeType, part, name, problem, solution);
          handleStatus();
        }}
      >
        <Box marginBottom={"1.5rem"}>
          <Typography style={{ fontWeight: "bolder" }} fontSize={fontSize}>
            {title}
          </Typography>
          <Typography fontSize={fontSize}>{content}</Typography>
        </Box>
      </div>
    </Explain>
  );
}
