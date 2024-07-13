import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const registerSchema = z
  .object({
    userName: z.string().min(3, "User name must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #ff6ec4, #7873f5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.2)",
          filter: "blur(10px)",
          zIndex: -1,
        }}
      />
      <Container maxWidth="xs">
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextField
              {...register("userName")}
              label="User Name"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              {...register("confirmPassword")}
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account? <Link to="/login">LogIn</Link>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
