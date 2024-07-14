import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Fade,
  LinearProgress,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../../api";
import { ConfirmationModal } from "../Utils/ConfirmationModal";
import CreateTaskForm, { CreateTaskFormType } from "./taskForm/CreateTaskForm";

export interface TaskType {
  id: number;
  title: string;
  description: string;
  category: "Work" | "Personal" | "Others";
  priority: "Low" | "Medium" | "High"; // Low, Medium, High
  status: "TODO" | "IN PROGRESS" | "DONE"; // To Do, In Progress, Done
  due_date: string; // Format: YYYY-MM-DD
  created_at: string; // ISO 8601 string representation
  updated_at: string; // ISO 8601 string representation
  author: number;
}

interface Column {
  id: "title" | "due_date" | "category" | "priority" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: string) => JSX.Element | undefined;
}

const TaskTable = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  console.log(tasks);
  const [selectedTask, setSelectedTask] = useState<TaskType>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [delId, setDelId] = useState<number | null>(null);

  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/tasks/");
      if (res.status === 200) {
        setTasks(res.data);
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
      if (res?.status === 204) {
        toast.success(`Task deleted successfully`);
      }
    } catch (error) {
      console.error("deleteTaskERROR: ", error);
    } finally {
      setLoading(false);
      setOpenDel(false);
      getAllTasks();
    }
  };

  const createTask = async (data: CreateTaskFormType) => {
    setLoading(true);
    try {
      const res = await api.post("/api/v1/tasks/", data);
      if (res?.status === 201) {
        toast.success(`Task created successfully`);
        handleClose();
      }
    } catch (error) {
      console.error("createTaskERROR: ", error);
    } finally {
      setLoading(false);
      getAllTasks();
    }
  };

  const editTask = async (data: CreateTaskFormType) => {
    setLoading(true);
    try {
      const res = await api.patch(
        `/api/v1/tasks/edit/${selectedTask?.id}/`,
        data
      );
      if (res?.status === 200) {
        toast.success(`Task edited successfully`);
      }
    } catch (error) {
      console.error("editTaskERROR: ", error);
    } finally {
      setLoading(false);
      handleEditClose();
      getAllTasks();
    }
  };

  const columns: readonly Column[] = [
    { id: "title", label: "Task Name" },
    { id: "due_date", label: "Due Date" },
    { id: "category", label: "Category" },
    {
      id: "priority",
      label: "Priority",
      format: (value: string) => (
        <Typography
          variant="button"
          display="block"
          gutterBottom
          color={
            value === "High" ? "red" : value === "Medium" ? "orange" : "green"
          }
        >
          {value}
        </Typography>
      ),
    },
    {
      id: "status",
      label: "Status",
      format: (value: string) => (
        <Button
          variant="contained"
          color={
            value === "TODO"
              ? "error"
              : value === "IN PROGRESS"
              ? "warning"
              : "success"
          }
        >
          {value}
        </Button>
      ),
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setOpenEdit(false);
  const handleDelClose = () => setOpenDel(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelModal = (id: number) => {
    setOpenDel(true);
    setDelId(id);
  };

  const handleEditModal = (data: TaskType) => {
    setSelectedTask(data);
    setOpenEdit(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filterPriority === "" || task.priority === filterPriority) &&
      (filterStatus === "" || task.status === filterStatus) &&
      (filterCategory === "" || task.category === filterCategory)
  );

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <br />
      <Box display="flex" justifyContent="flex-end" mr={3}>
        <Box display="flex" gap={2} alignItems="center" mr={2}>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            displayEmpty
            sx={{ width: 150 }}
          >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            displayEmpty
            sx={{ width: 150 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </Select>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            displayEmpty
            sx={{ width: 150 }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </Box>
        <Button variant="contained" onClick={handleOpen}>
          Create Task
        </Button>
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
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="h6" className="customFont">
                      No tasks found. Please add...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(row[column.id])
                            : row[column.id]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Stack direction="row" spacing={3}>
                          <BorderColorIcon
                            sx={{ cursor: "pointer" }}
                            color="primary"
                            onClick={() => handleEditModal(row)}
                          />
                          <DeleteIcon
                            sx={{ cursor: "pointer" }}
                            color="error"
                            onClick={() => handleDelModal(row.id)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
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
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 600 }}>
              <CreateTaskForm onClose={handleClose} createTask={createTask} />
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal open={openEdit} onClose={handleEditClose} closeAfterTransition>
        <Fade in={openEdit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 600 }}>
              <CreateTaskForm
                onClose={handleEditClose}
                createTask={editTask}
                defaultValues={selectedTask}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
      <ConfirmationModal
        open={openDel}
        onClose={handleDelClose}
        onConfirm={() => deleteTask(delId || 0)}
      />
    </>
  );
};

export default TaskTable;
