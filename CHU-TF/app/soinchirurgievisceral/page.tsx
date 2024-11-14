import PiedPage from "@/components/PiedPage";
import SoinChirurgieVisceral from "@/components/SoinChirurgieVisceral";
import TetePage from "@/components/TetePage";

const SoinChirurgieVisceralPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TetePage />
        <SoinChirurgieVisceral />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default SoinChirurgieVisceralPage;