import Sidebar from "@/components/Sidebar";
import Partenaire from "@/components/Partenaire";

const PartenairePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <Partenaire />
      </div>
    </main>
    )
};

export default PartenairePage;