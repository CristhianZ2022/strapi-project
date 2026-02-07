import * as React from "react";

import { cn } from "@/lib/utils";

function Ul({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="li"
      className={cn(
        "hover:bg-gray-300 dark:hover:bg-gray-800 rounded whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {props.children}
    </ul>
  );
}

export { Ul };