import PiedPage from "@/components/PiedPage";
import SoinGynecoObstetrique from "@/components/SoinGynecoObstetrique";
import TetePage from "@/components/TetePage";

const SoinGynecoObstetriquePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinGynecoObstetrique />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinGynecoObstetriquePage;