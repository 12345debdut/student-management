import { normalSideBarConfig } from "@lib/config/sideBarUtils";
import SideBarItem from "./sidebar/SideBarItem";
import SideBarSingleItem from "./sidebar/SideBarSingleItem";

export default function SideNavigationBar() {
  return (
    <div className="hidden lg:block relative flex min-h-[100vh] w-full max-w-[20rem] flex-col rounded-xl bg-card bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <h5 className="block text-xl antialiased font-semibold leading-snug tracking-normal text-accent">
          Sidebar
        </h5>
      </div>
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 text-base font-normal text-blue-gray-700">
        {normalSideBarConfig.map((item) =>
          item.children == undefined ? (
            <SideBarSingleItem
              title={item.title}
              icon={item.svg}
              url={item.url}
              key={item.url}
            />
          ) : (
            <SideBarItem
              title={item.title}
              icon={item.svg}
              child={item.children ?? []}
              key={item.url}
            />
          )
        )}
      </nav>
    </div>
  );
}
