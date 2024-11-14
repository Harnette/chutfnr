import Apropos from "@/components/Apropos";
import PiedPage from "@/components/PiedPage";

const AproposPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Apropos />
        <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        <PiedPage />
    </main>
    )
};

export default AproposPage;