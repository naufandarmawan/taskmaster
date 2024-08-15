const fetchTasks = async (setTasks, setLoading, toast) => {
  try {
    setLoading((prev) => ({ ...prev, fetch: true }));

    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    setTasks(Array.isArray(data) ? data : []);
  } catch (error) {
    toast.error("Error fetching tasks");
    console.log("Error fetching tasks", error);
    setTasks([]);
  } finally {
    setLoading((prev) => ({ ...prev, fetch: false }));
  }
};

const submitTask = async (
  e,
  newTask,
  editTask,
  setNewTask,
  setEditTask,
  setLoading,
  fetchTasks,
  toast
) => {
  try {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, submit: true }));

    if (editTask) {
      const response = await fetch(`/api/tasks/${editTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask,
          completed: editTask.completed,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      toast.success("Task updated successfully");
      setEditTask(null);
    } else {
      if (!newTask) {
        throw new Error("Input must be filled");
      }
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      toast.success("Task added successfully");
    }
    setNewTask("");
    fetchTasks();
  } catch (error) {
    toast.error(error.message);
    console.log("Error saving task", error);
  } finally {
    setLoading((prev) => ({ ...prev, submit: false }));
  }
};

const deleteTask = async (task, setLoading, fetchTasks, toast) => {
  try {
    setLoading((prev) => ({
      ...prev,
      taskLoading: { ...prev.taskLoading, [task.id]: { delete: true } },
    }));
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    toast.success("Task deleted successfully");
    fetchTasks();
  } catch (error) {
    toast.error("Error deleting task");
    console.log("Error deleting task:", error);
  } finally {
    setLoading((prev) => ({
      ...prev,
      taskLoading: { ...prev.taskLoading, [task.id]: { delete: false } },
    }));
  }
};

const completeTask = async (task, setLoading, fetchTasks, toast) => {
  try {
    setLoading((prev) => ({
      ...prev,
      taskLoading: { ...prev.taskLoading, [task.id]: { complete: true } },
    }));
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });
    toast.success("Task updated successfully");
    fetchTasks();
  } catch (error) {
    toast.error("Error updating task");
    console.log("Error updating task:", error);
  } finally {
    setLoading((prev) => ({
      ...prev,
      taskLoading: { ...prev.taskLoading, [task.id]: { complete: false } },
    }));
  }
};

module.exports = {
  fetchTasks,
  submitTask,
  deleteTask,
  completeTask,
};
