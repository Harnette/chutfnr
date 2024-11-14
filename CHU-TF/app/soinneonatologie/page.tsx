import PiedPage from "@/components/PiedPage";
import SoinNeonatologie from "@/components/SoinNeonatologie";
import TetePage from "@/components/TetePage";

const SoinNeonatologiePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinNeonatologie />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinNeonatologiePage;