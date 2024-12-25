import { useState } from "react";
import "./App.css";
import NavigationBar from "./components/navigation/NavigationBar";
import TaskApp from "./components/tasks/TaskApp";
import RegistrationForm from "./components/registration/RegistrationForm";
import LoginForm from "./components/login/LoginForm";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case "register":
        return <RegistrationForm />;
      case "login":
        return <LoginForm />;
      default:
        return (
          <main className="container">
            <TaskApp />
          </main>
        );
    }
  };

  return (
    <div className="container-fluid">
      <NavigationBar onNavigate={handleNavigation} />
      {renderView()}
    </div>
  );
}

export default App;
