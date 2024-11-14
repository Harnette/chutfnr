import PiedPage from "@/components/PiedPage";
import SoinOphtalmologie from "@/components/SoinOphtalmologie";
import TetePage from "@/components/TetePage";

const SoinOphtalmologiePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinOphtalmologie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinOphtalmologiePage;