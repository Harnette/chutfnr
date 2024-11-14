import Sidebar from "@/components/Sidebar";
import Equipes from "@/components/Equipe";

const EquipePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <Equipes />
      </div>
    </main>
    )
};

export default EquipePage;