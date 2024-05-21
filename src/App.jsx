import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import './index.css'
import Home from "./components/Home";
import Admin from "./components/Admin";
import User from "./components/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import VerifyMail from "./pages/VerifyMail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyMail/:verificationToken" element={<VerifyMail />}/>
        <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
