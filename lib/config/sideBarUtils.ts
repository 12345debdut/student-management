import {
  faDashboard,
  faChartLine,
  faShop,
  faUser,
  faMessage,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
export interface SideBarConfig {
  title: string;
  svg: IconProp;
  url: string;
  count?: string;
  children?: SideBarConfig[];
}

export const normalSideBarConfig: SideBarConfig[] = [
  {
    title: "Dashboard",
    svg: faDashboard,
    url: "/dashboard",
    children: [
      {
        title: "Analytics",
        svg: faChartLine,
        url: "/analytics",
      },
      {
        title: "Reporting",
        svg: faChartLine,
        url: "/reporting",
      },
      {
        title: "Projects",
        svg: faChartLine,
        url: "/projects",
      },
    ],
  },
  {
    title: "E-Commerce",
    svg: faShop,
    url: "/ecommerce",
    children: [
      {
        title: "Analytics",
        svg: faChartLine,
        url: "/analytics",
      },
      {
        title: "Reporting",
        svg: faChartLine,
        url: "/reporting",
      },
      {
        title: "Projects",
        svg: faChartLine,
        url: "/projects",
      },
    ],
  },
  {
    title: "Profile",
    svg: faUser,
    url: "/profile",
  },
  {
    title: "Inbox",
    svg: faMessage,
    url: "/inbox",
  },
  {
    title: "Logout",
    svg: faSignOut,
    url: "/logout",
  },
];
