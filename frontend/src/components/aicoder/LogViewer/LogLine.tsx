import React from "react";

export const LogLine = ({ index, log }: { index: number; log: string }) => (
  <p>
    <span className="w-10 bg-gray-100 inline-block text-end">{index}</span>{" "}
    {log}
  </p>
);
