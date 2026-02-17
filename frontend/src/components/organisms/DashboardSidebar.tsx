"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bot,
  Boxes,
  CheckCircle2,
  Folder,
  Flame,
  Building2,
  LayoutGrid,
  Network,
  Orbit,
  Settings,
  Workflow,
  Store,
  Tags,
} from "lucide-react";

import { useAuth } from "@/auth/clerk";
import { ApiError } from "@/api/mutator";
import { useOrganizationMembership } from "@/lib/use-organization-membership";
import {
  type healthzHealthzGetResponse,
  useHealthzHealthzGet,
} from "@/api/generated/default/default";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const { isAdmin } = useOrganizationMembership(isSignedIn);
  const healthQuery = useHealthzHealthzGet<healthzHealthzGetResponse, ApiError>(
    {
      query: {
        refetchInterval: 30_000,
        refetchOnMount: "always",
        retry: false,
      },
      request: { cache: "no-store" },
    },
  );

  const okValue = healthQuery.data?.data?.ok;
  const systemStatus: "unknown" | "operational" | "degraded" =
    okValue === true
      ? "operational"
      : okValue === false
        ? "degraded"
        : healthQuery.isError
          ? "degraded"
          : "unknown";
  const statusLabel =
    systemStatus === "operational"
      ? "All systems operational"
      : systemStatus === "unknown"
        ? "System status unavailable"
        : "System degraded";

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-[rgba(10,14,22,0.96)]">
      <div className="flex-1 px-3 py-4">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Navigation
        </p>
        <nav className="mt-3 space-y-4 text-sm">
          <div>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-quiet">
              Overview
            </p>
            <div className="mt-1 space-y-1">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname === "/dashboard"
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/activity"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/activity")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <Activity className="h-4 w-4" />
                Live feed
              </Link>
              <Link
                href="/extreme-events"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/extreme-events")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <Flame className="h-4 w-4" />
                Extreme events
              </Link>
              <Link
                href="/model-graph"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/model-graph")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <Orbit className="h-4 w-4" />
                Model graph
              </Link>
              <Link
                href="/workflow"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/workflow")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <Workflow className="h-4 w-4" />
                Workflow
              </Link>
            </div>
          </div>

          <div>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-quiet">
              Boards
            </p>
            <div className="mt-1 space-y-1">
              <Link
                href="/board-groups"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/board-groups")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <Folder className="h-4 w-4" />
                Board groups
              </Link>
              <Link
                href="/boards"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/boards")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
                Boards
              </Link>
              <Link
                href="/tags"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/tags")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <Tags className="h-4 w-4" />
                Tags
              </Link>
              <Link
                href="/approvals"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/approvals")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <CheckCircle2 className="h-4 w-4" />
                Approvals
              </Link>
              {isAdmin ? (
                <Link
                  href="/custom-fields"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                    pathname.startsWith("/custom-fields")
                      ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                      : "hover:bg-[rgba(255,255,255,0.03)]",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Custom fields
                </Link>
              ) : null}
            </div>
          </div>

          <div>
            {isAdmin ? (
              <>
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-quiet">
                  Skills
                </p>
                <div className="mt-1 space-y-1">
                  <Link
                    href="/skills/marketplace"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                      pathname === "/skills" ||
                        pathname.startsWith("/skills/marketplace")
                        ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                        : "hover:bg-[rgba(255,255,255,0.03)]",
                    )}
                  >
                    <Store className="h-4 w-4" />
                    Marketplace
                  </Link>
                  <Link
                    href="/skills/packs"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                      pathname.startsWith("/skills/packs")
                        ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                        : "hover:bg-[rgba(255,255,255,0.03)]",
                    )}
                  >
                    <Boxes className="h-4 w-4" />
                    Packs
                  </Link>
                </div>
              </>
            ) : null}
          </div>

          <div>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-quiet">
              Administration
            </p>
            <div className="mt-1 space-y-1">
              <Link
                href="/organization"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                  pathname.startsWith("/organization")
                    ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                    : "hover:bg-[rgba(255,255,255,0.03)]",
                )}
              >
                <Building2 className="h-4 w-4" />
                Organization
              </Link>
              {isAdmin ? (
                <Link
                  href="/gateways"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                    pathname.startsWith("/gateways")
                      ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                      : "hover:bg-[rgba(255,255,255,0.03)]",
                  )}
                >
                  <Network className="h-4 w-4" />
                  Gateways
                </Link>
              ) : null}
              {isAdmin ? (
                <Link
                  href="/agents"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition",
                    pathname.startsWith("/agents")
                      ? "bg-[rgba(88,166,255,0.18)] text-strong font-medium border border-[rgba(88,166,255,0.35)]"
                      : "hover:bg-[rgba(255,255,255,0.03)]",
                  )}
                >
                  <Bot className="h-4 w-4" />
                  Agents
                </Link>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              systemStatus === "operational" && "bg-emerald-500",
              systemStatus === "degraded" && "bg-rose-500",
              systemStatus === "unknown" && "bg-slate-300",
            )}
          />
          {statusLabel}
        </div>
      </div>
    </aside>
  );
}
