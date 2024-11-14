import PiedPage from "@/components/PiedPage";
import SoinCardiologie from "@/components/SoinCardiologie";
import TetePage from "@/components/TetePage";

const SoinCardiologiePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinCardiologie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinCardiologiePage;