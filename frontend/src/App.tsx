import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './components/layout/Layout';
import { OverallStrategy } from './pages/OverallStrategy';
import { ProductAnalysis } from './pages/ProductAnalysis';
import { ProductAnalysisReport } from './pages/ProductAnalysisReport';
import { SharedMissingKeywords } from './pages/SharedMissingKeywords';
import { SharedMissingKeywordsReport } from './pages/SharedMissingKeywordsReport';
import { KeywordResearch } from './pages/KeywordResearch';
import KeywordResearchReport from './pages/KeywordResearchReport';
import { OverallStrategyReport } from './pages/OverallStrategyReport';

import { MonthWisePlan } from './pages/MonthWisePlan';
import MonthWisePlanReport from './pages/MonthWisePlanReport';
import { PageAnalysis } from './pages/PageAnalysis';
import { PageAnalysisReport } from './pages/PageAnalysisReport';
import { SitemapSeedKeyword } from './pages/SitemapSeedKeyword';
import { SitemapReport } from './pages/SitemapReport';
import { KeywordDistribution } from './pages/KeywordDistribution';
import { KeywordDistributionReport } from './pages/KeywordDistributionReport';
import { Navigate, useLocation } from 'react-router-dom';
import { Login } from './pages/Login';

// Auth Guard Component
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  // Main application routing using React Router
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes wrapped in Layout */}
      <Route path="/*" element={
        <RequireAuth>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/overall-strategy" element={<OverallStrategy />} />
              <Route path="/report/overall-strategy" element={<OverallStrategyReport />} />
              <Route path="/product-analysis" element={<ProductAnalysis />} />
              <Route path="/report/product-analysis" element={<ProductAnalysisReport />} />
              <Route path="/shared-missing-keywords" element={<SharedMissingKeywords />} />
              <Route path="/report/shared-missing-keywords" element={<SharedMissingKeywordsReport />} />
              <Route path="/keyword-research" element={<KeywordResearch />} />
              <Route path="/report/keyword-research" element={<KeywordResearchReport />} />
              <Route path="/month-wise-plan" element={<MonthWisePlan />} />
              <Route path="/report/month-wise-plan" element={<MonthWisePlanReport />} />
              <Route path="/page-analysis" element={<PageAnalysis />} />
              <Route path="/report/page-analysis" element={<PageAnalysisReport />} />
              <Route path="/sitemap-seed-keyword" element={<SitemapSeedKeyword />} />
              <Route path="/report/sitemap-seed-keyword" element={<SitemapReport />} />
              <Route path="/keyword-distribution" element={<KeywordDistribution />} />
              <Route path="/report/keyword-distribution" element={<KeywordDistributionReport />} />
            </Routes>
          </Layout>
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;
