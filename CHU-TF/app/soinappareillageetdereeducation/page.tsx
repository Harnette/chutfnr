import PiedPage from "@/components/PiedPage";
import SoinSAR from "@/components/SoinSAR";
import TetePage from "@/components/TetePage";

const SoinMaladieInfectueusePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinSAR />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinMaladieInfectueusePage;