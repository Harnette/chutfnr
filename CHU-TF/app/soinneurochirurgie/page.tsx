import PiedPage from "@/components/PiedPage";
import SoinNeurochirurgie from "@/components/SoinNeurochirurgie";
import TetePage from "@/components/TetePage";

const SoinNeurochirurgiePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinNeurochirurgie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinNeurochirurgiePage;