import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import DashboardPage from './DashboardPage.tsx';
import InvoicePage from './invoicePage.tsx';

export default function App() {
    return <BrowserRouter>
        <aside>
            <header>Gefina</header>
            <nav>
                <Link to='/'>Painel Inicial</Link> | <Link to='/faturas'>Faturas</Link>
            </nav>
        </aside><main>

            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/faturas' element={<InvoicePage />} />
            </Routes>
        </main>
        </BrowserRouter>
}