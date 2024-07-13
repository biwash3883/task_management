import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

interface WelcomeCardProps {
  username: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ username }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={6}>
        <Card
          sx={{
            mt: 3,
            p: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(to right, #ff6ec4, #7873f5)",
            color: "white",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              Welcome back, {username}
            </Typography>
            <Typography variant="body1">
              Your tasks are waiting for you!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
