"use client";

import { AudioWaveform, Command, GalleryVerticalEnd, Plus } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import AddOrganisationDialog from "./dialogs/add-organisation-dialog";
import UnfoldClose from "./unfold-close";

const organisations = [
  {
    id: 0,
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    id: 1,
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    id: 2,
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

const activeOrganisationId = 0; // This should be dynamically set based on the user's current organisation

export default function OrganisationSwitcher() {
  const { isMobile } = useSidebar();
  const [addOrganisationOpen, setAddOrganisationOpen] = useState(false);

  return (
    <SidebarMenu className="h-full">
      <SidebarMenuItem className="flex h-full items-center justify-between">
        <AddOrganisationDialog
          onOpenChange={setAddOrganisationOpen}
          open={addOrganisationOpen}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="group h-full border border-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:rounded-2xl"
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-sm border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground shadow-sm transition-all group-data-[collapsible=icon]:rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Acme Incorporated</span>
              </div>
              <UnfoldClose className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organisations
            </DropdownMenuLabel>
            {organisations.map((organisation) => (
              <DropdownMenuItem
                className={cn(
                  "gap-2 p-2",
                  organisation.id === activeOrganisationId ? "bg-accent" : ""
                )}
                key={organisation.name}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <organisation.logo className="size-3.5 shrink-0" />
                </div>
                {organisation.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => setAddOrganisationOpen(true)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              Add Organisation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
