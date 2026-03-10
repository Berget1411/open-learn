import type { LucideIcon } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@open-learn/ui/components/sidebar";

interface NavWorkspaceItem {
  name: string;
  subtitle: string;
  to: "/" | "/ai" | "/todos";
  icon: LucideIcon;
}

interface NavWorkspacesProps {
  items: readonly NavWorkspaceItem[];
}

export default function NavWorkspaces({ items }: NavWorkspacesProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.to}
                size="lg"
                tooltip={item.name}
              >
                <Link to={item.to}>
                  <div className="flex size-8 items-center justify-center rounded-none border bg-background">
                    <item.icon />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">{item.name}</span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
