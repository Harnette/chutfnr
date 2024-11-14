import PiedPage from "@/components/PiedPage";
import SoinATU from "@/components/SoinsATU";
import TetePage from "@/components/TetePage";

const SoinATUPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinATU />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinATUPage;