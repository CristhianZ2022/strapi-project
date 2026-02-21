import * as React from "react";

import { cn } from "@/lib/utils";

export default function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="li"
      className={cn(
        "w-[2px] h-5 bg-indigo-100 dark:bg-indigo-900/30 mx-2",
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
