import React from "react";
import { LogLine } from "./LogLine";

export const LogContainer = React.forwardRef<
  HTMLDivElement,
  { logs: string[] }
>(({ logs }, ref) => (
  <div className="space-y-1 font-mono overflow-y-auto transition-all" ref={ref}>
    {logs.map((log, index) => (
      <LogLine key={index} index={index} log={log} />
    ))}
  </div>
));

LogContainer.displayName = "LogContainer";
