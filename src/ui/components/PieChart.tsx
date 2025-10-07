"use client";
/*
 * Documentation:
 * Pie Chart — https://app.subframe.com/library?component=Pie+Chart_0654ccc7-054c-4f3a-8e9a-b7c81dd3963c
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface PieChartRootProps
  extends React.ComponentProps<typeof SubframeCore.PieChart> {
  className?: string;
}

const PieChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.PieChart>,
  PieChartRootProps
>(function PieChartRoot({ className, ...otherProps }: PieChartRootProps, ref) {
  return (
    <SubframeCore.PieChart
      className={SubframeUtils.twClassNames("h-52 w-52", className)}
      ref={ref}
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

export const PieChart = PieChartRoot;
