"use client";

import { DashboardPageLayout } from "@/components/templates/DashboardPageLayout";
import { ExtremeEventsView } from "@/components/mission-control/ExtremeEventsView";

export default function ExtremeEventsPage() {
  return (
    <DashboardPageLayout
      signedOut={{ message: "Sign in to inspect system climate events.", forceRedirectUrl: "/extreme-events" }}
      title="Extreme Events"
      description="Heat / cold / drought / flood / wind / fire timeline model"
    >
      <ExtremeEventsView />
    </DashboardPageLayout>
  );
}
