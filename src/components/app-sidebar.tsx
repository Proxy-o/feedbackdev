"use client";

import * as React from "react";
import { Building2, Frame, Map, MessageCircle, PieChart } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Companies",
      url: "/companies",
      icon: Building2,
      isActive: true,
      items: [
        {
          title: "Companies",
          url: "/companies",
        },
        {
          title: "New Company",
          url: "/companies/new",
        },
      ],
    },
    {
      title: "Reviews",
      url: "#",
      icon: MessageCircle,
      items: [
        {
          title: "Reviews",
          url: "#",
        },
        {
          title: "My reviews",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
