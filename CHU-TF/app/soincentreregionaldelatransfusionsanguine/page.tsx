import PiedPage from "@/components/PiedPage";
import SoinCRTS from "@/components/SoinCRTS";
import TetePage from "@/components/TetePage";

const SoinCRTSPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinCRTS />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinCRTSPage;