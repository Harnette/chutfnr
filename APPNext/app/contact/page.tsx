import Contacts from "@/components/Contacts";
import Sidebar from "@/components/Sidebar";

const ContactPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="content bg-light">
        <Contacts />
      </div>
    </main>
    )
};

export default ContactPage;