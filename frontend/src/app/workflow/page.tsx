"use client";

import { WorkflowCanvas } from "@/components/mission-control/WorkflowCanvas";
import { DashboardPageLayout } from "@/components/templates/DashboardPageLayout";

export default function WorkflowPage() {
  return (
    <DashboardPageLayout
      signedOut={{ message: "Sign in to open workflow canvas.", forceRedirectUrl: "/workflow" }}
      title="Workflow Builder"
      description="Canvas-style task and agent orchestration map"
      mainClassName="mc-grid"
    >
      <WorkflowCanvas />
    </DashboardPageLayout>
  );
}
