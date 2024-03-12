import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, Divider, Grid } from "@mui/material";

interface DetailModalProps {
  code: string;
  title: string;
  content: string;
  problems: string[];
  solved: string[];
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
    <Box sx={{ borderRadius: "50%" }}>
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
        <div
          style={{
            backgroundColor: "#f4f5ff",
            borderRadius: "1rem",
            width: "80%",
            height: "80%",
          }}
        >
          <Box sx={{ margin: "1rem", height: "100%" }}>
            <Grid container direction={"row"} style={{ height: "100%" }}>
              <Grid item xs={4} sm={4} md={3} lg={3}>
                <Typography fontWeight={"bolder"}>{title}</Typography>
                <Divider
                  style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                />
                <Typography>{content}</Typography>
              </Grid>
              <Grid item xs={8} sm={8} md={9} lg={9} style={{ height: "90%" }}>
                <Card
                  style={{
                    margin: "0.5rem",
                    height: "100%",
                    overflowY: "auto",
                    overscrollBehavior: "auto",
                  }}
                >
                  {problems.map((_data, idx) => {
                    return (
                      <div key={idx} style={{ margin: "0.5rem" }}>
                        <Typography>{problems[idx]}</Typography>
                        <Typography>{solved[idx]}</Typography>
                      </div>
                    );
                  })}
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Modal>
    </Box>
  );
}
