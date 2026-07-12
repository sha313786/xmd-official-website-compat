import Sidebar from "./sidebar";
import Topbar from "./topbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}