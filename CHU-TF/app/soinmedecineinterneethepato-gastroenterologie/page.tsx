import PiedPage from "@/components/PiedPage";
import SoinMedecineInterne from "@/components/SoinMedecineInterne";
import TetePage from "@/components/TetePage";

const SoinMedecineInternePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinMedecineInterne />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinMedecineInternePage;