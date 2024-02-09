import React from "react";
import Content from "~/components/Sidebar/components/Content";
import type { Category } from "~/services";

function Sidebar(props: { categories: Category[]; [x: string]: any }) {
  const { categories } = props;

  // SIDEBAR
  return (
    <aside
      id="sidebar"
      className="sidebar flex flex-col pt-16"
    >
      <div className="sidebar-wrap grow flex flex-col">
        <Content categories={categories} />
      </div>
    </aside>
  );
}

export default Sidebar;
