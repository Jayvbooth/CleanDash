import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function FrameCard({
  title,
  subtitle,
  headerAction,
  footer,
  children,
  className,
  contentClassName,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerAction?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section className={cn("mc-card", className)}>
      <div className="mc-corner-marks" aria-hidden />
      <div className="mc-corner-crosses" aria-hidden />
      {(title || subtitle || headerAction) && (
        <header className="mc-card-header">
          <div>
            {title ? <h3 className="mc-card-title">{title}</h3> : null}
            {subtitle ? <p className="mc-card-subtitle">{subtitle}</p> : null}
          </div>
          {headerAction ? <div>{headerAction}</div> : null}
        </header>
      )}
      <div className={cn("mc-card-body", contentClassName)}>{children}</div>
      {footer ? <footer className="mc-card-footer">{footer}</footer> : null}
    </section>
  );
}
