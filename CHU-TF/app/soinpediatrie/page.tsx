import PiedPage from "@/components/PiedPage";
import SoinPediatrie from "@/components/SoinPediatrie";
import TetePage from "@/components/TetePage";

const SoinPediatriePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinPediatrie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinPediatriePage;