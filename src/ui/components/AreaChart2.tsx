"use client";
/*
 * Documentation:
 * Area Chart2 — https://app.subframe.com/library?component=Area+Chart2_a39020e1-9dc7-4aab-83e4-919544b2caec
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface AreaChart2RootProps
  extends React.ComponentProps<typeof SubframeCore.AreaChart> {
  stacked?: boolean;
  className?: string;
}

const AreaChart2Root = React.forwardRef<
  React.ElementRef<typeof SubframeCore.AreaChart>,
  AreaChart2RootProps
>(function AreaChart2Root(
  { stacked = false, className, ...otherProps }: AreaChart2RootProps,
  ref
) {
  return (
    <SubframeCore.AreaChart
      className={SubframeUtils.twClassNames(
        "group/a39020e1 h-80 w-full",
        { flex: stacked },
        className
      )}
      ref={ref}
      stacked={stacked}
      colors={[
        "#6e4428",
        "#b15b21",
        "#663b1e",
        "#954f20",
        "#3d1e09",
        "#804823",
      ]}
      {...otherProps}
    />
  );
});

export const AreaChart2 = AreaChart2Root;
