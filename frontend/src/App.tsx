import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
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
import { Layout } from './components/layout/Layout';

function App() {
  // Main application routing using React Router
  return (
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
  );
}

export default App;
