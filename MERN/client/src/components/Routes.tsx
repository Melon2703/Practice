import { Routes as Switch, Route, Navigate } from "react-router-dom";
import React from "react";
import { LinksPage } from "../pages/Links";
import { AuthPage } from "../pages/Auth";
import { CreatePage } from "../pages/Create";
import { DetailPage } from "../pages/Detail";

interface RoutesProps {
  isAuth: boolean;
}
export const Routes: React.FC<RoutesProps> = ({ isAuth }) => {
  return (
    <Switch>
      {isAuth ? (
        <>
          <Route path="/links" element={<LinksPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/create" />} />
        </>
      ) : (
        <>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </>
      )}
    </Switch>
  );
};
