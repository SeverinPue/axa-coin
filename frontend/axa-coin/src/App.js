import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout.js";
import Start from "./pages/start.jsx";
import Login from "./pages/login.tsx";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AdminProtectedRoute from "./components/adminProtectedRoute.js"
import NotFound from "./pages/notFound.tsx";
import Tasks from "./pages/tasks.tsx";
import Shop from "./pages/shop.tsx";
import EditUser from "./pages/edituser.tsx";
import Submission from "./pages/submissions.jsx";
import TaskEdit from "./pages/taskDashboard.tsx"
import EditProdukte from "./pages/editProdukte.tsx";
import Transactions from "./pages/transactions.tsx";
import TransactionsAdmin from "./pages/transactionsAdmin.tsx";


function App() {
  return (
    <div>
      <BrowserRouter className="main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/start" />} />
          <Route path="" element={<Layout />}>
            <Route path="/start" element={<ProtectedRoute component={<Start/>} />} />
            <Route path="/tasks" element={<ProtectedRoute component={<Tasks/>}/>}></Route>
            <Route path="/shop" element={<ProtectedRoute component={<Shop/>}/>}></Route>
            <Route path="/transactions" element={<ProtectedRoute component={<Transactions/>}/>}></Route>
            <Route path="/a/submissions" element={<AdminProtectedRoute component={<Submission/>}/>}></Route>
            <Route path="/a/product" element={<AdminProtectedRoute component={<EditProdukte/>}/>}></Route>
            <Route path="/a/tasks" element={<AdminProtectedRoute component={<TaskEdit/>}/>}></Route>
            <Route path="/a/transactions" element={<AdminProtectedRoute component={<TransactionsAdmin/>}/>}></Route>
            <Route path="/login" element={<Login />} /> 
            <Route path="/a/users" element={<AdminProtectedRoute component={<EditUser/>}/>} />
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const API_URL = 'https://localhost:3000';
