import Sidebar from "@/components/Sidebar";
import Soins from "@/components/Soins";

const SoinsPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <Soins />
      </div>
    </main>
    )
};

export default SoinsPage;