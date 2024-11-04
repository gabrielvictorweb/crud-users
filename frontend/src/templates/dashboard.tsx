import type React from "react";
import { HeaderPage } from "@/components/HeaderPage";
import { Menu } from "@/components/Menu";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Loading } from "@/components/Loading";

type Props = {
  children: React.ReactNode;
};

export const DashboardTemplate: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuth();

  const ifIsNotAuthorized = !user && !isLoading;
  if (ifIsNotAuthorized) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="md:flex">
      <Menu />

      <article className="flex-1">
        <HeaderPage />

        <div className="p-[32px]">{children}</div>
      </article>
    </div>
  );
};
