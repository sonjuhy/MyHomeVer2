import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../context/redux/hooks";

interface customTimeLineContentProps {
  name: string;
  codeType: string;
  useStatusSet: ((text: string) => void)[]; // 0 : title, 1 : content, 2 : problem, 3 : solution
  contentSet: string[]; // 0 : title, 1 : content, 2 : problem, 3 : solution
  handleStatus: () => void;
}
export default function TimeLineContent({
  name,
  codeType,
  contentSet,
  useStatusSet,
  handleStatus,
}: customTimeLineContentProps) {
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 14 : 16;

  const title: string = contentSet?.[0];
  const content: string = contentSet?.[1];
  const problem: string = contentSet?.[2];
  const solution: string = contentSet?.[3];

  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          useStatusSet[0](title);
          useStatusSet[1](content);
          useStatusSet[2](problem);
          useStatusSet[3](solution);
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
