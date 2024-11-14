import PiedPage from "@/components/PiedPage";
import SoinPsycathrie from "@/components/SoinPsycathrie";
import TetePage from "@/components/TetePage";

const SoinPsycathriePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinPsycathrie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinPsycathriePage;