import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {/* <Route path="/" element={<ChatBoxUser />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Chat/>} />
          <Route path="*" element={<Navigate to="" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
