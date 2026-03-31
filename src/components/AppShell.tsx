import { ReactNode } from "react";

const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};

export default AppShell;
