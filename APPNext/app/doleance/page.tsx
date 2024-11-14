import Sidebar from "@/components/Sidebar";
import Doleance from "@/components/Doleance";

const DoleancePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <Doleance />
      </div>
    </main>
    )
};

export default DoleancePage;