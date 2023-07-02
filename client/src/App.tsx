import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./pages/Error";
import ResumeAnalyser from "./pages/ResumeAnalyser";
import SignUpPage from "./pages/signup/SignUpPage";
import Profile from "./pages/Profile";
import AppInfoView from "./components/AppInfoView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./redux/action";

// Code esa likho char log soche kya hugga h 

function App() {
  const dispatch: (arg0: any) => any = useDispatch();
  useEffect(()=> {
    dispatch(getUserDetails())
  }, [])  
  return (
    <div className="App">
      <AppInfoView />
      <Routes>
        <Route path="/" element={<ResumeAnalyser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<SignUpPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
