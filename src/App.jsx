import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import RegisteredPurchases from './pages/RegisteredPurchases';
import Header from './shared/header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/sales" element={<RegisteredPurchases />} />
            </Routes>
        </Router>
    );
}

export default App;
