import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Low",
    completed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [completedCurrentPage, setCompletedCurrentPage] = useState(1);
  const tasksPerPage = 2;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const indexOfLastCompletedTask = completedCurrentPage * tasksPerPage;
  const indexOfFirstCompletedTask = indexOfLastCompletedTask - tasksPerPage;
  const currentCompletedTasks = completedTasks.slice(
    indexOfFirstCompletedTask,
    indexOfLastCompletedTask
  );

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
        const completedTasks = tasks.filter((task) => task.completed);
        const incompleteTasks = tasks.filter((task) => !task.completed);
        setCompletedTasks(completedTasks);
        setTasks(incompleteTasks);
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
        setNewTask({
          title: "",
          description: "",
          due_date: "",
          priority: "Low",
          completed: false,
        });
        setSuccess("Task created successfully");
        setTimeout(() => setSuccess(""), 3000);
        setCurrentPage(Math.ceil((tasks.length + 1) / tasksPerPage));
        fetchAllTasks();
      }
    } catch {
      setError("Failed to create task");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("access_token");
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        const updatedCompletedTasks = completedTasks.filter(
          (task) => task.id !== id
        );
        setTasks(updatedTasks);
        setCompletedTasks(updatedCompletedTasks);
        setSuccess("Task deleted successfully");
        setTimeout(() => setSuccess(""), 3000);

        const totalPages = Math.ceil(updatedTasks.length / tasksPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        } else if (
          updatedTasks.length % tasksPerPage === 0 &&
          currentPage > 1
        ) {
          setCurrentPage(currentPage - 1);
        }

        const totalCompletedPages = Math.ceil(
          updatedCompletedTasks.length / tasksPerPage
        );
        if (completedCurrentPage > totalCompletedPages) {
          setCompletedCurrentPage(totalCompletedPages);
        } else if (
          updatedCompletedTasks.length % tasksPerPage === 0 &&
          completedCurrentPage > 1
        ) {
          setCompletedCurrentPage(completedCurrentPage - 1);
        }

        fetchAllTasks();
      } else {
        setError("Failed to delete task");
      }
    } catch {
      setError("Network error occurred");
    }
  };

  const handleComplete = async (id) => {
    const token = Cookies.get("access_token");
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: true }),
      });

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        setCompletedTasks([
          ...completedTasks,
          tasks.find((task) => task.id === id),
        ]);
        setSuccess("Task completed successfully");
        setTimeout(() => setSuccess(""), 3000);

        const totalPages = Math.ceil(updatedTasks.length / tasksPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        } else if (
          updatedTasks.length % tasksPerPage === 0 &&
          currentPage > 1
        ) {
          setCurrentPage(currentPage - 1);
        }
        fetchAllTasks();
      } else {
        setError("Failed to complete task");
      }
    } catch {
      setError("Network error occurred");
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCompletedPageChange = (pageNumber) => {
    setCompletedCurrentPage(pageNumber);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
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
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
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
                      name="due_date"
                      value={newTask.due_date}
                      onChange={handleChange}
                      min={getCurrentDate()}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Priority</label>
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
              {currentTasks.map((task) => (
                <div key={task.id} className="list-group-item">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Due Date: {task.due_date}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Priority: {task.priority}
                      </small>
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success complete-btn me-2"
                        onClick={() => handleComplete(task.id)}
                      >
                        Complete
                      </button>
                      <button
                        className="btn btn-danger delete-btn"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              {Array.from(
                { length: Math.ceil(tasks.length / tasksPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`btn m-1 ${
                      currentPage === i + 1 ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="col-md-12">
            <h5>Completed Tasks</h5>
            <div className="list-group">
              {currentCompletedTasks.map((task) => (
                <div key={task.id} className="list-group-item">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Due Date: {task.due_date}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Completed At:{" "}
                        {new Date(task.completed_at).toLocaleString()}
                      </small>
                    </p>
                    <p
                      className={`card-text ${
                        new Date(task.due_date) < new Date(task.completed_at)
                          ? "text-danger"
                          : "text-success"
                      }`}
                    >
                      <small className="">
                        {new Date(task.due_date) < new Date(task.completed_at)
                          ? "Completed Late"
                          : "Completed On Time"}
                      </small>
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger delete-btn"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              {Array.from(
                { length: Math.ceil(completedTasks.length / tasksPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handleCompletedPageChange(i + 1)}
                    className={`btn m-1 ${
                      completedCurrentPage === i + 1
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskApp;
