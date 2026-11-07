import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import SurveyListPage from './pages/SurveyListPage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route element={user ? <Layout /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<SurveyListPage />} />
        <Route path="/survey/:id" element={<SurveyPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;