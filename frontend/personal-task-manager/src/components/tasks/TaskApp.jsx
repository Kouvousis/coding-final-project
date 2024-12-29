import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllTasks = async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = Cookies.get("access_token");
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const tasks = await response.json();
        const taskContainer = document.getElementById("task-container");
        taskContainer.innerHTML = ""; // Clear existing tasks

        tasks.forEach((task) => {
          const taskElement = document.createElement("div");
          taskElement.className = "task";

          taskElement.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><small class="text-muted">Due Date: ${task.due_date}</small></p>
            <p class="card-text"><small class="text-muted">Priority: ${task.priority}</small></p>
            <div class="d-flex justify-content-end">
              <button class="btn btn-success complete-btn me-2">Complete</button>
              <button class="btn btn-danger delete-btn">Delete</button>
            </div>
          </div>
        `;

          taskContainer.appendChild(taskElement);
        });
      } else {
        setError("Failed to fetch tasks");
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access_token");
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data]);
        setNewTask({ title: "", description: "", due_date: "", priority: "" });
      }
    } catch {
      setError("Failed to create task");
    }
  };

  const checkToken = () => {
    const token = Cookies.get("access_token");
    return !!token;
  };

  useEffect(() => {
    if (checkToken()) {
      fetchAllTasks();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      {!checkToken() ? (
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1 className="mb-4">Welcome to Task Manager</h1>
            <p className="lead mb-4">Please login to manage your tasks</p>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Add New Task</h5>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Task title"
                      name="title"
                      value={newTask.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Task description"
                      name="description"
                      value={newTask.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={newTask.priority}
                      onChange={handleChange}
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating task..." : "Create Task"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h2>My Tasks</h2>
            <div className="list-group">
              {/* Task list will go here */}
              <div className="list-group-item">
                <div id="task-container"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskApp;
