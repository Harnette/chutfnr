import Sidebar from "@/components/Sidebar";
import Service from "@/components/Service";

const ServicePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <Service />
      </div>
    </main>
    )
};

export default ServicePage;