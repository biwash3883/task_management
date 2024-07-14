import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TaskType } from "../TaskTable";

const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  category: z.enum(["Work", "Personal", "Others"]),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["TODO", "IN PROGRESS", "DONE"]),
  due_date: z.string().refine(
    (date) => {
      return /^\d{4}-\d{2}-\d{2}$/.test(date);
    },
    { message: "Date must be in YYYY-MM-DD format" }
  ),
});

export type CreateTaskFormType = z.infer<typeof taskSchema>;

const CreateTaskForm: React.FC<{
  onClose: () => void;
  createTask: (data: CreateTaskFormType) => Promise<void>;
  defaultValues?: TaskType;
}> = ({ onClose, createTask, defaultValues }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTaskFormType>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const onSubmit = async (data: CreateTaskFormType) => {
    await createTask(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 2,
          m: 2,
          maxWidth: "600px",
          mx: "auto",
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          Create Task
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select {...field} label="Category" error={!!errors.category}>
                    <MenuItem value="Work">Work</MenuItem>
                    <MenuItem value="Personal">Personal</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select {...field} label="Priority" error={!!errors.priority}>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status" error={!!errors.status}>
                    <MenuItem value="TODO">To Do</MenuItem>
                    <MenuItem value="IN PROGRESS">In Progress</MenuItem>
                    <MenuItem value="DONE">Done</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="due_date"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <DatePicker
                    label="Due Date"
                    value={
                      field.value ? moment(field.value, "YYYY-MM-DD") : null
                    }
                    onChange={(date: Moment | null) =>
                      field.onChange(date ? date.format("YYYY-MM-DD") : "")
                    }
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {defaultValues ? "Save" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateTaskForm;
