import { User } from "firebase/auth";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PublicLayout = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  if (user) {
    navigate("/");

    return null;
  }

  return <Outlet />;
};

export default PublicLayout;
