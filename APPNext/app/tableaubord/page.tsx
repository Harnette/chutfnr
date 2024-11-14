import Sidebar from "@/components/Sidebar";
import TableauBord from "@/components/TableauBord";

const TableauBordPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <TableauBord />
      </div>
    </main>
    )
};

export default TableauBordPage;