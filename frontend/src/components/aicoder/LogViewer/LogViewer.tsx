"use client";

import React, { useEffect, useRef, useState } from "react";
import { LogContainer } from "./LogContainer";
import { Button } from "@/components/ui/button";
import { logManager } from "@/lib/logger/LogManager";
import { toast } from "sonner";

const createEventSource = (url: string) => {
  const eventSource = new EventSource(url, { withCredentials: true });

  eventSource.onerror = (error) => {
    logManager.error("EventSource error:", error);
  };

  return eventSource;
};

export const LogViewer = () => {
  const [logs, setLogs] = useState<string[]>(["Logging..."]);
  const logsContainerRef = useRef<HTMLDivElement | null>(null);
  const eventSource = useRef<EventSource | null>(null);

  const handleCopy = async () => {
    const logsText = logs.join("\n");
    try {
      if (typeof window === undefined || !window.navigator?.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      await window.navigator.clipboard.writeText(logsText);
      toast("Log copied to clipboard.");
    } catch (error) {
      logManager.error("Failed to copy logs:", error);
      toast("Failed to copy log.");
    }
  };

  useEffect(() => {
    eventSource.current = createEventSource("/api/workspace/run/stream/");

    eventSource.current.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    return () => {
      eventSource.current?.close();
    };
  }, []);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop =
        logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Button className="fixed left-4" variant="outline" onClick={handleCopy}>
          Copy
        </Button>
        <LogContainer logs={logs} ref={logsContainerRef} />
      </div>
    </div>
  );
};
