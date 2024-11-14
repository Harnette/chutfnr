import PiedPage from "@/components/PiedPage";
import SoinReanimationAnesthesiologie from "@/components/SoinReanimationAnesthesiologie";
import TetePage from "@/components/TetePage";

const SoinReanimationAnesthesiologiePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinReanimationAnesthesiologie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinReanimationAnesthesiologiePage;