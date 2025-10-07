"use client";
/*
 * Documentation:
 * Area Chart — https://app.subframe.com/library?component=Area+Chart_8aa1e7b3-5db6-4a62-aa49-137ced21a231
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface AreaChartRootProps
  extends React.ComponentProps<typeof SubframeCore.AreaChart> {
  stacked?: boolean;
  className?: string;
}

const AreaChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.AreaChart>,
  AreaChartRootProps
>(function AreaChartRoot(
  { stacked = false, className, ...otherProps }: AreaChartRootProps,
  ref
) {
  return (
    <SubframeCore.AreaChart
      className={SubframeUtils.twClassNames(
        "group/8aa1e7b3 h-80 w-full",
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

export const AreaChart = AreaChartRoot;
