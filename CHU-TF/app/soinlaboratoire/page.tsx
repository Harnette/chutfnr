import PiedPage from "@/components/PiedPage";
import SoinLaboratoire from "@/components/SoinLaboratoire";
import TetePage from "@/components/TetePage";

const SoinLaboratoirePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinLaboratoire />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinLaboratoirePage;