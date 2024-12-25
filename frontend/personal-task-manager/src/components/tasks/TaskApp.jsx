import { useState } from "react";
import RegistrationForm from "../registration/RegistrationForm";

function TaskApp() {
  const [isLoggedIn] = useState(true);
  const [showRegister] = useState(false);

  return (
    <div className="container">
      {showRegister ? (
        <RegistrationForm />
      ) : !isLoggedIn ? (
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
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Task title"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Task description"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Due date"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select className="form-select">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Task
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
                <h5 className="mb-1">Example Task</h5>
                <p className="mb-1">This is an example task description</p>
                <small className="text-muted">Due: Tomorrow</small>
                <p>Priority: Low</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskApp;
