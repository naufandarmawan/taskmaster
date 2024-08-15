"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../components/module/Card";
import Input from "../components/base/Input";
import {
  completeTask,
  deleteTask,
  fetchTasks,
  submitTask,
} from "../services/taskService";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState({
    fetch: false,
    submit: false,
    taskLoading: {},
  });

  useEffect(() => {
    fetchTasks(setTasks, setLoading, toast);
  }, []);

  const handleEdit = (task) => {
    setEditTask(task);
    setNewTask(task.title);
  };

  return (
    <div className="p-24 max-lg:p-4">
      <div className="container mx-auto w-1/2 flex flex-col gap-12 max-lg:w-full">
        <div className="flex flex-col gap-6 items-center w-full ">
          <h1 className="text-center text-5xl font-normal max-lg:text-4xl">
            Task Management
          </h1>
          <Input
            label="Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            required
          />
          <div className="flex gap-4">
            <button
              onClick={(e) =>
                submitTask(
                  e,
                  newTask,
                  editTask,
                  setNewTask,
                  setEditTask,
                  setLoading,
                  () => fetchTasks(setTasks, setLoading, toast),
                  toast
                )
              }
              className={` flex gap-1 items-center text-[#0F0F0F] px-4 py-2 rounded-lg font-normal text-base ${
                editTask ? "bg-[#FFB46F]" : "bg-[#6FCBFF]"
              }`}
              disabled={loading.submit}
            >
              {loading.submit && (
                <LoaderCircle
                  size={16}
                  stroke="#0F0F0F"
                  className="cursor-pointer animate-spin"
                />
              )}
              {loading.submit
                ? "Processing..."
                : editTask
                ? "Update Task"
                : "Add Task"}
            </button>
            {editTask && (
              <button
                type="button"
                onClick={() => setEditTask(null)}
                className="bg-[#FF6F6F] text-[#0F0F0F] px-4 py-2 rounded-lg font-normal text-base"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-black">Ongoing Tasks</h2>
          <div className="flex flex-col gap-2">
            {loading.fetch ? (
              <div className="flex justify-center">
                <LoaderCircle
                  size={48}
                  stroke="#33363F"
                  className="cursor-pointer animate-spin"
                />
              </div>
            ) : tasks.filter((task) => !task.completed).length === 0 ? (
              <p className="text-left text-gray-500">No ongoing tasks</p>
            ) : (
              tasks
                .filter((task) => !task.completed)
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((task) => (
                  <Card
                    key={task.id}
                    task={task}
                    loading={loading.taskLoading[task.id]}
                    onEdit={handleEdit}
                    onDelete={(task) =>
                      deleteTask(
                        task,
                        setLoading,
                        () => fetchTasks(setTasks, setLoading, toast),
                        toast
                      )
                    }
                    onComplete={(task) =>
                      completeTask(
                        task,
                        setLoading,
                        () => fetchTasks(setTasks, setLoading, toast),
                        toast
                      )
                    }
                  />
                ))
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-black">Completed Tasks</h2>
          <div className="flex flex-col gap-2">
            {loading.fetch ? (
              <div className="flex justify-center">
                <LoaderCircle
                  size={48}
                  stroke="#33363F"
                  className="cursor-pointer animate-spin"
                />
              </div>
            ) : tasks.filter((task) => task.completed).length === 0 ? (
              <p className="text-left text-gray-500">No completed tasks</p>
            ) : (
              tasks
                .filter((task) => task.completed)
                .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                .map((task) => (
                  <Card
                    key={task.id}
                    task={task}
                    loading={loading.taskLoading[task.id]}
                    onEdit={handleEdit}
                    onDelete={(task) =>
                      deleteTask(
                        task,
                        setLoading,
                        () => fetchTasks(setTasks, setLoading, toast),
                        toast
                      )
                    }
                    onComplete={(task) =>
                      completeTask(
                        task,
                        setLoading,
                        () => fetchTasks(setTasks, setLoading, toast),
                        toast
                      )
                    }
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
