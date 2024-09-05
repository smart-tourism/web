import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  ChartNoAxesCombinedIcon,
  Building2,
  LayoutDashboard
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutDashboard,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/competitor",
          label: "Competitor",
          active: pathname.includes("/competitor"),
          icon: Building2,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/rate-trend",
          label: "Rate Trend",
          active: pathname.includes("/rate-trend"),
          icon: ChartNoAxesCombinedIcon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/rate-shopper",
          label: "Rate Shopper",
          active: pathname.includes("/rate-shopper"),
          icon: Users,
          submenus: []
        }
      ]
    },
    // {
    //   groupLabel: "",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       active: pathname.includes("/posts"),
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts",
    //           active: pathname === "/posts"
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post",
    //           active: pathname === "/posts/new"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       active: pathname.includes("/categories"),
    //       icon: Bookmark,
    //       submenus: []
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       active: pathname.includes("/tags"),
    //       icon: Tag,
    //       submenus: []
    //     }
    //   ]
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       active: pathname.includes("/users"),
    //       icon: Users,
    //       submenus: []
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       active: pathname.includes("/account"),
    //       icon: Settings,
    //       submenus: []
    //     }
    //   ]
    // }
  ];
}
