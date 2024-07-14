import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../api";
import Calendar from "./Calendar";

export default function BasicCalendar() {
  const [events, setEvents] = useState([]);
  console.log(events);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/events/");
      if (res.status === 200) {
        setEvents(res.data);
      }
    } catch (error) {
      console.error("getTaskERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ height: "95vh", p: 2 }}>
        <Calendar events={events} views={["month"]} defaultView={"month"} />;
      </Box>
    </>
  );
}
