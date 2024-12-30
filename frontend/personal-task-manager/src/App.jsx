import { useState } from "react";
import NavigationBar from "./components/navigation/NavigationBar";
import TaskApp from "./components/tasks/TaskApp";
import LoginForm from "./components/login/LoginForm";
import RegistrationForm from "./components/registration/RegistrationForm";
import UserProfile from "./components/profile/UserProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const viewComponents = {
    login: (
      <LoginForm onNavigate={handleNavigation} setIsLoggedIn={setIsLoggedIn} />
    ),
    register: <RegistrationForm onNavigate={handleNavigation} />,
    profile: <UserProfile onNavigate={handleNavigation} />,
    home: <TaskApp isLoggedIn={isLoggedIn} />,
  };

  return (
    <>
      <div className="">
        <NavigationBar
          onNavigate={handleNavigation}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        {viewComponents[currentView]}
      </div>
    </>
  );
}

export default App;
