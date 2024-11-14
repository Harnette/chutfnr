import PiedPage from "@/components/PiedPage";
import SoinPneumologie from "@/components/SoinPneumologie";
import TetePage from "@/components/TetePage";

const SoinPneumologiePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinPneumologie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinPneumologiePage;