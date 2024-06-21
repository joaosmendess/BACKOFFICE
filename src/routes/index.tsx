// src/Routes.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import ManageApllication from "../pages/ApplicationPermission/ManageApplication";
import ListApllication from "../pages/ApplicationPermission/ListApplication";
import ManageCompany from "../pages/Company/ManageCompany";
import ListCompany from "../pages/Company/ListCompany";
import ManageModule from "../pages/Modules/ManageModule";
import ListModule from "../pages/Modules/ListModule";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Home />} />
        <Route
          path="/aplicacao-permissao/gerenciar"
          element={<ManageApllication />}
        />
        <Route
          path="/aplicacao-permissao/lista"
          element={<ListApllication />}
        />
        <Route
          path="/aplicacao-permissao/editar"
          element={<ManageApllication />}
        />

        <Route path="/empresa/gerenciar" element={<ManageCompany />} />
        <Route path="/empresa/lista" element={<ListCompany />} />

        <Route path="/modulos/gerenciar" element={<ManageModule />} />
        <Route path="/modulos/lista" element={<ListModule />} />
		<Route path="/modulos/editar" element={<ManageModule />} />
      </Routes>
    </BrowserRouter>
  );
}
