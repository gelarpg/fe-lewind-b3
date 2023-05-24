import React, { useMemo } from "react";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

export const withRoles = (WrappedComponent) => {
  return (props) => {
    const { authUser } = useJumboAuth();

    const isAdminPerencanaan = useMemo(
      () => authUser && authUser?.roles_id?.toString() === "2",
      [authUser]
    );

    const isAdminOperasional = useMemo(
      () => authUser && authUser?.roles_id?.toString() === "3",
      [authUser]
    );

    const isSuperAdmin = useMemo(
      () => authUser && authUser?.roles_id?.toString() === "1",
      [authUser]
    );

    const isAdminDireksi = useMemo(
      () => authUser && authUser?.roles_id?.toString() === "4",
      [authUser]
    );

    const isAdminFinance = useMemo(
      () => authUser && authUser?.roles_id?.toString() === "5",
      [authUser]
    );

    return (
      <WrappedComponent
        {...props}
        isSuperAdmin={isSuperAdmin}
        isAdminDireksi={isAdminDireksi}
        isAdminPerencanaan={isAdminPerencanaan}
        isAdminOperasional={isAdminOperasional}
        isAdminFinance={isAdminFinance}
      />
    );
  };
};
