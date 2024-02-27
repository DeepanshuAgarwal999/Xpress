import { redirect } from "next/navigation";
import React from "react";
import getCurrentUser from "../actions/getCurrentUser";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser?.role !== "ADMIN") return redirect("/");
  return <>{children}</>;
};

export default AdminLayout;
