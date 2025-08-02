// src/pages/LayoutWithFooter.jsx
import Layout from "../components/Layout";
import { Outlet } from "react-router-dom";

export default function LayoutWithFooter() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
