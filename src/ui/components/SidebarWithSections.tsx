"use client";
/*
 * Documentation:
 * Sidebar with sections — https://app.subframe.com/library?component=Sidebar+with+sections_61e1312b-35a0-4d11-a025-5c54c667cf62
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  selected?: boolean;
  rightSlot?: React.ReactNode;
  className?: string;
}

const NavItem = React.forwardRef<HTMLDivElement, NavItemProps>(function NavItem(
  {
    icon = "FeatherCircleDashed",
    children,
    selected = false,
    rightSlot,
    className,
    ...otherProps
  }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/398a6d7b flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-neutral-50 active:bg-neutral-100",
        { "bg-brand-50 hover:bg-brand-50 active:bg-brand-100": selected },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <SubframeCore.Icon
        className={SubframeUtils.twClassNames(
          "text-heading-3 font-heading-3 text-neutral-600",
          { "text-brand-700": selected }
        )}
        name={icon}
      />
      {children ? (
        <span
          className={SubframeUtils.twClassNames(
            "line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-neutral-600",
            { "text-brand-700": selected }
          )}
        >
          {children}
        </span>
      ) : null}
      {rightSlot ? <div className="flex items-center">{rightSlot}</div> : null}
    </div>
  );
});

interface NavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
}

const NavSection = React.forwardRef<HTMLDivElement, NavSectionProps>(
  function NavSection(
    { children, label, className, ...otherProps }: NavSectionProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-start gap-1 pt-6",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <div className="flex w-full flex-col items-start gap-4 px-3 py-1">
          {label ? (
            <span className="w-full text-caption-bold font-caption-bold text-subtext-color">
              {label}
            </span>
          ) : null}
        </div>
        {children ? (
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-1">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

interface SidebarWithSectionsRootProps
  extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const SidebarWithSectionsRoot = React.forwardRef<
  HTMLElement,
  SidebarWithSectionsRootProps
>(function SidebarWithSectionsRoot(
  {
    header,
    footer,
    children,
    className,
    ...otherProps
  }: SidebarWithSectionsRootProps,
  ref
) {
  return (
    <nav
      className={SubframeUtils.twClassNames(
        "flex h-full w-60 flex-col items-start border-r border-solid border-neutral-border bg-default-background",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {header ? (
        <div className="flex w-full flex-col items-start gap-2 px-6 py-6">
          {header}
        </div>
      ) : null}
      {children ? (
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start px-4 py-4 overflow-auto">
          {children}
        </div>
      ) : null}
      {footer ? (
        <div className="flex w-full items-center gap-4 border-t border-solid border-neutral-border px-6 py-6">
          {footer}
        </div>
      ) : null}
    </nav>
  );
});

export const SidebarWithSections = Object.assign(SidebarWithSectionsRoot, {
  NavItem,
  NavSection,
});
