import './globals.css';
import Inscription from '@/components/Inscription';

export default function Home() {
  return (
    <main className="flex-col items-center justify-between">
      <br /><br /><br /><br />
          <div className="row h-50 align-items-center justify-content-center">
            <div className="col-xl-4">
              <div className="bg-light rounded p-sm-5 my-4 mx-3">
                <div className="d-flex justify-content-center mb-3">
                  <h2>INSCRIPTION</h2>
                </div>
                <Inscription />
              </div>
            </div>
          </div>
    </main>

  );
}
