import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../context/redux/hooks";
import PortfolioContext from "../context/context";
import { changeSmallMode } from "../context/redux/feature/pageSize/pageSlice";

interface DetailModalProps {
  code: string;
  title: string;
  content: string;
  problems: string;
  solved: string;
  show: boolean;
  handleStatus: () => void;
}

export default function Detail({
  code,
  title,
  content,
  problems,
  solved,
  show,
  handleStatus,
}: DetailModalProps) {
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={show}
      onClose={handleStatus}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      sx={{
        display: "flex",
        p: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ backgroundColor: "white" }}>
        <Box>
          <Typography>{title}</Typography>
          <Typography>{content}</Typography>
          <Typography>{problems}</Typography>
          <Typography>{solved}</Typography>
        </Box>
      </div>
    </Modal>
  );
}
