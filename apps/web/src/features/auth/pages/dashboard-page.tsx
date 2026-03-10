import { Button } from "@open-learn/ui/components/button";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

import { trpc } from "@/utils/trpc";
import { authClient } from "@/lib/auth-client";

export async function dashboardBeforeLoad() {
  const session = await authClient.getSession();
  if (!session.data) {
    redirect({ to: "/login", throw: true });
  }
  const { data: customerState } = await authClient.customer.state();
  return { session, customerState };
}

interface DashboardPageProps {
  session: Awaited<ReturnType<typeof authClient.getSession>>;
  customerState: { activeSubscriptions?: unknown[] } | null | undefined;
}

export default function DashboardPage({ session, customerState }: DashboardPageProps) {
  const privateData = useQuery(trpc.privateData.queryOptions());
  const hasProSubscription = (customerState?.activeSubscriptions?.length ?? 0) > 0;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.data?.user.name}</p>
      <p>API: {privateData.data?.message}</p>
      <p>Plan: {hasProSubscription ? "Pro" : "Free"}</p>
      {hasProSubscription ? (
        <Button onClick={async () => await authClient.customer.portal()}>
          Manage Subscription
        </Button>
      ) : (
        <Button onClick={async () => await authClient.checkout({ slug: "pro" })}>
          Upgrade to Pro
        </Button>
      )}
    </div>
  );
}
