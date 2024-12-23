import { useState } from "react";
import "./App.css";
import RegistrationForm from "./components/registration/RegistrationForm";
import NavigationBar from "./components/navigation/NavigationBar";

function App() {
  const [isLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [setCurrentView] = useState("home");

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="container-fluid">
      <NavigationBar onNavigate={handleNavigation} />

      <main className="container">
        {showRegister ? (
          <RegistrationForm />
        ) : !isLoggedIn ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h1 className="mb-4">Welcome to Task Manager</h1>
              <p className="lead mb-4">Please login to manage your tasks</p>
              <div className="d-grid gap-2 d-md-block">
                <button className="btn btn-primary me-md-2" type="button">
                  Login
                </button>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
              </div>
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
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
