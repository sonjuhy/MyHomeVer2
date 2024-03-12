import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../context/redux/hooks";
import explainStore from "../context/explainStore";

interface customTimeLineContentProps {
  name: string;
  part: string;
  codeType: string;
  useStatusSet: ((text: string) => void)[]; // 0 : title, 1 : content
  useStatusArrSet: ((arr: string[]) => void)[]; // 0 : problem, 1 :solution
  handleStatus: () => void;
}
export default function TimeLineContent({
  name,
  codeType,
  part,
  useStatusSet,
  useStatusArrSet,
  handleStatus,
}: customTimeLineContentProps) {
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 14 : 16;

  const title: string = explainStore[part][name]["title"];
  const content: string = explainStore[part][name]["content"];
  const problem: string[] = explainStore[part][name]["problem"];
  const solution: string[] = explainStore[part][name]["solution"];

  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          useStatusSet[0](title);
          useStatusSet[1](content);
          useStatusArrSet[0](problem);
          useStatusArrSet[1](solution);
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
    </div>
  );
}
