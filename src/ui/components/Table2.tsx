"use client";
/*
 * Documentation:
 * Table2 — https://app.subframe.com/library?component=Table2_7c491f8b-c347-4c82-be57-c92789210b68
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  clickable?: boolean;
  className?: string;
}

const Row = React.forwardRef<HTMLTableRowElement, RowProps>(function Row(
  { children, clickable = false, className, ...otherProps }: RowProps,
  ref
) {
  return (
    <tr
      className={SubframeUtils.twClassNames(
        "group/cd70514d border-t border-solid border-neutral-border",
        { "hover:bg-neutral-50": clickable },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </tr>
  );
});

interface CellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children?: React.ReactNode;
  className?: string;
}

const Cell = React.forwardRef<HTMLDivElement, CellProps>(function Cell(
  { children, className, ...otherProps }: CellProps,
  ref
) {
  return (
    <td {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex h-12 w-full items-center gap-1 px-3",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    </td>
  );
});

interface HeaderRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  className?: string;
}

const HeaderRow = React.forwardRef<HTMLTableRowElement, HeaderRowProps>(
  function HeaderRow(
    { children, className, ...otherProps }: HeaderRowProps,
    ref
  ) {
    return (
      <tr className={className} ref={ref} {...otherProps}>
        {children}
      </tr>
    );
  }
);

interface HeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children?: React.ReactNode;
  icon?: SubframeCore.IconName;
  className?: string;
}

const HeaderCell = React.forwardRef<HTMLDivElement, HeaderCellProps>(
  function HeaderCell(
    { children, icon = null, className, ...otherProps }: HeaderCellProps,
    ref
  ) {
    return (
      <th {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            "flex h-8 w-full items-center gap-1 px-3",
            className
          )}
          ref={ref}
        >
          {children ? (
            <span className="whitespace-nowrap text-caption-bold font-caption-bold text-subtext-color">
              {children}
            </span>
          ) : null}
          <SubframeCore.Icon
            className="text-caption font-caption text-subtext-color"
            name={icon}
          />
        </div>
      </th>
    );
  }
);

interface Table2RootProps extends React.TableHTMLAttributes<HTMLTableElement> {
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Table2Root = React.forwardRef<HTMLTableElement, Table2RootProps>(
  function Table2Root(
    { header, children, className, ...otherProps }: Table2RootProps,
    ref
  ) {
    return (
      <table
        className={SubframeUtils.twClassNames(
          "group/7c491f8b w-full cursor-pointer",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <thead>{header}</thead>
        <tbody className="border-b border-solid border-neutral-border">
          {children}
        </tbody>
      </table>
    );
  }
);

export const Table2 = Object.assign(Table2Root, {
  Row,
  Cell,
  HeaderRow,
  HeaderCell,
});
