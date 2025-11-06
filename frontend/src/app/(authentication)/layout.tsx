import React from "react";

export default function AuthenticationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex flex-col bg-zinc-900 items-center justify-center p-10 text-white w-full space-y-4">
        <h1 className="text-2xl font-semibold">
          CREDO
          {true && (
            <>
              {" "}
              <span className="outline-blue-400 outline-4 px-2 py-1 rounded-lg text-blue-400 font-bold">
                BETA
              </span>
            </>
          )}
        </h1>
      </div>
      <div className="flex items-center justify-center p-6 w-full">
        {children}
      </div>
    </div>
  );
}
