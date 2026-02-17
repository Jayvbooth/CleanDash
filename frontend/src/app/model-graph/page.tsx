"use client";

import { ModelGraph } from "@/components/mission-control/ModelGraph";
import { DashboardPageLayout } from "@/components/templates/DashboardPageLayout";

export default function ModelGraphPage() {
  return (
    <DashboardPageLayout
      signedOut={{ message: "Sign in to view live model graph.", forceRedirectUrl: "/model-graph" }}
      title="Model Graph"
      description="Live relationship graph of agents, tasks, and fan-out state transitions"
    >
      <ModelGraph />
    </DashboardPageLayout>
  );
}
