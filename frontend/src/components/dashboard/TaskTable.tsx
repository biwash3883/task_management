import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import api from "../../api";

interface TaskType {
  title: string;
  description: string;
  category: "Work" | "Personal" | "Others";
  priority: "Low" | "Medium" | "High"; // Low, Medium, High
  status: "To Do" | "In Progress" | "Done"; // To Do, In Progress, Done
  due_date: string; // Format: YYYY-MM-DD
  created_at: string; // ISO 8601 string representation
  updated_at: string; // ISO 8601 string representation
  author: string;
}

interface Column {
  id: "title" | "due_date" | "category" | "priority" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: string) => JSX.Element | undefined;
}

const data: TaskType[] = [
  {
    title: "Implement Login Functionality",
    description:
      "Develop login feature with authentication and session management",
    category: "Work",
    priority: "High",
    status: "In Progress",
    due_date: "2024-07-20",
    created_at: "2024-07-13T08:30:00Z",
    updated_at: "2024-07-13T15:45:00Z",
    author: "kishor",
  },
  {
    title: "Design User Interface",
    description: "Create UI wireframes and prototypes for user interaction",
    category: "Personal",
    priority: "Medium",
    status: "To Do",
    due_date: "2024-07-18",
    created_at: "2024-07-12T10:15:00Z",
    updated_at: "2024-07-13T09:30:00Z",
    author: "kishor",
  },
  {
    title: "Write Documentation",
    description: "Document project architecture and API specifications",
    category: "Others",
    priority: "Low",
    status: "To Do",
    due_date: "2024-07-25",
    created_at: "2024-07-11T14:00:00Z",
    updated_at: "2024-07-13T11:45:00Z",
    author: "kishor",
  },
  {
    title: "Fix Bugs in Backend",
    description: "Resolve critical issues reported in backend functionality",
    category: "Work",
    priority: "High",
    status: "In Progress",
    due_date: "2024-07-22",
    created_at: "2024-07-10T16:45:00Z",
    updated_at: "2024-07-13T14:20:00Z",
    author: "kishor",
  },
  {
    title: "Deploy Application to Production",
    description:
      "Prepare application deployment and configure production environment",
    category: "Personal",
    priority: "Medium",
    status: "Done",
    due_date: "2024-07-30",
    created_at: "2024-07-09T11:00:00Z",
    updated_at: "2024-07-13T13:00:00Z",
    author: "kishor",
  },
];

const getStatus = (status: string) => {
  switch (status) {
    case "To Do":
      return (
        <Button variant="contained" color="error">
          {status}
        </Button>
      );

    case "In Progress":
      return (
        <Button variant="contained" color="warning">
          {status}
        </Button>
      );

    case "Done":
      return (
        <Button variant="contained" color="success">
          {status}
        </Button>
      );
  }
};

const TaskTable = () => {
  const [tasks, setTasks] = useState<TaskType[] | []>(data);
  console.log(tasks);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect(() => {
  //   getAllTasks();
  // }, []);

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/tasks/");
      console.log(res);
      if (res.status === 200) {
        setTasks(res?.data);
      }
    } catch (error) {
      console.error("getTaskERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.delete(`/api/v1/tasks/delete/${id}/`);
      console.log(res, "delRES");
    } catch (error) {
      console.error("deleteTaskERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/v1/tasks/");
      if (res?.status === 201) {
        toast.success(`Task created successfully`);
      }
    } catch (error) {
      console.error("createTaskERROR: ", error);
    } finally {
      setLoading(false);
      getAllTasks();
    }
  };

  const columns: readonly Column[] = [
    { id: "title", label: "Task Name" },
    { id: "due_date", label: "Due Date" },
    {
      id: "category",
      label: "Category",
    },
    {
      id: "priority",
      label: "Priority",
    },
    {
      id: "status",
      label: "Status",
      format: (value: string) => getStatus(value),
    },
  ];
  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <br />
      <Box display="flex" justifyContent="flex-end" mr={3}>
        <Button variant="contained">Create Task</Button>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="h6" className="customFont">
                      No task tasks found. Please add...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                tasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <Stack direction="row" spacing={3}>
                            <RemoveRedEyeIcon
                              sx={{ cursor: "pointer" }}
                              color="secondary"
                            />
                            <BorderColorIcon
                              sx={{ cursor: "pointer" }}
                              color="primary"
                            />
                            <DeleteIcon
                              sx={{ cursor: "pointer" }}
                              color="error"
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TaskTable;
