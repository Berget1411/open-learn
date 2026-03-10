import { createFileRoute } from "@tanstack/react-router";

import DashboardPage, { dashboardBeforeLoad } from "@/features/auth/pages/dashboard-page";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoute,
  beforeLoad: dashboardBeforeLoad,
});

function DashboardRoute() {
  const { session, customerState } = Route.useRouteContext();
  return <DashboardPage session={session} customerState={customerState} />;
}
