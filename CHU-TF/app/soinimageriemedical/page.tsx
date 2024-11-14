import PiedPage from "@/components/PiedPage";
import SoinImagerieMedical from "@/components/SoinImagerieMedical";
import TetePage from "@/components/TetePage";

const SoinImagerieMedicalPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinImagerieMedical />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinImagerieMedicalPage;