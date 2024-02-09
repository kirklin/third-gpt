"use client";

import Content from "./components/content";
import Sider from "~/components/Sidebar/Sidebar";
import { categoriesData } from "~/services";
import type { Category } from "~/services";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default function Home() {
  const categories: Category[] = [
    {
      name: "我的收藏",
      sites: [],
      icon: "",
    },
    ...categoriesData,
  ];
  return (
    <main className="flex flex-row flex-1 h-full w-full">
      <div className="w-[250px]">
        <Sider categories={categories} />
      </div>
      <div className="flex flex-col flex-1 h-full w-full">
        <header className="">
          <Navbar secondary={false} fixed={false} onOpen={false} />
        </header>
        <div className="block flex-1 h-full overflow-x-hidden rounded-2xl pl-0 pr-5 pt-0 pb-6">
          <div className="min-h-full h-full w-full rounded-2xl common-bg p-4 bg-gray-100">
            <Content />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </main>
  );
}
