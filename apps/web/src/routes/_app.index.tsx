import { createFileRoute } from "@tanstack/react-router";

import DashboardPage from "@/features/auth/pages/dashboard-page";
import { Route as AppRoute } from "@/routes/_app";

export const Route = createFileRoute("/_app/")({
  component: DashboardRoute,
});

function DashboardRoute() {
  const { session, customerState } = AppRoute.useRouteContext();

  return <DashboardPage session={session} customerState={customerState} />;
}
