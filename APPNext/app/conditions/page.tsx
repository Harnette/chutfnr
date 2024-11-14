import Condition from "@/components/Condition";
import Sidebar from "@/components/Sidebar";

const ConditionPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <Condition />
      </div>
    </main>
    )
};

export default ConditionPage;