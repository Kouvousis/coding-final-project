import { useState } from "react";
import "./App.css";
import NavigationBar from "./components/navigation/NavigationBar";
import TaskApp from "./components/tasks/TaskApp";
import RegistrationForm from "./components/registration/RegistrationForm";
import LoginForm from "./components/login/LoginForm";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case "register":
        return <RegistrationForm />;
      case "login":
        return (
          <LoginForm
            onNavigate={handleNavigation}
            setIsLoggedIn={setIsLoggedIn}
          />
        );
      default:
        return (
          <main className="container">
            <TaskApp setIsLoggedIn={setIsLoggedIn} />
          </main>
        );
    }
  };

  return (
    <div className="">
      <NavigationBar
        onNavigate={handleNavigation}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      {renderView()}
    </div>
  );
}

export default App;
