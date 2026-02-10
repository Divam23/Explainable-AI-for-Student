import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import PredictionPage from './pages/PredictionPage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="predict" element={<PredictionPage />} />
      </Routes>
    </Router>
  )
}

export default App
