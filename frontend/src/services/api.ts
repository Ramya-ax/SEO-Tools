import axios from 'axios';
import type {
    OverallStrategyPayload,
    OverallStrategyResponse,
    ProductAnalysisPayload,
    ProductAnalysisResponse,
    SharedMissingKeywordsPayload,
    SharedMissingKeywordsResponse,
    MonthWisePlanPayload,
    MonthWisePlanResponse,
    LoginPayload,
    LoginResponse
} from '../types';

// Use current origin or local dev tunnel. 
// Assuming the backend is running on the same host or proxied suitable for development.
// If backend is on 8000 and frontend on 5173, we might need full URL or proxy.
// User instructions said "Base URL: same origin / dev tunnel"
// We will default to relative path, assuming proxy or same origin.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const SeoApi = {
    // 1. Overall Strategy
    submitOverallStrategy: async (payload: OverallStrategyPayload): Promise<OverallStrategyResponse> => {
        const response = await api.post<OverallStrategyResponse>('/Overall_Strategy', payload);
        return response.data;
    },

    // 2. Product Analysis
    submitProductAnalysis: async (payload: ProductAnalysisPayload): Promise<ProductAnalysisResponse> => {
        const response = await api.post<any>('/Product', payload);
        return response.data.Report || response.data;
    },

    // 3. Shared & Missing Keywords
    submitSharedMissingKeywords: async (payload: SharedMissingKeywordsPayload): Promise<SharedMissingKeywordsResponse> => {
        const response = await api.post<SharedMissingKeywordsResponse>('/Shared_Missing_Keywords', payload);
        return response.data;
    },

    // 4. Month Wise Plan
    submitMonthWisePlan: async (payload: MonthWisePlanPayload): Promise<MonthWisePlanResponse> => {
        const response = await api.post<any>('/Month', payload);
        return response.data.Report || response.data;
    },

    // 5. Keyword Sitemap
    submitKeywordSitemap: async (payload: { Keyword: string }): Promise<any> => {
        const response = await api.post<any>('/Keyword_sitemap', payload);
        return response.data;
    },

    // 6. Keyword Research
    submitKeywordResearch: async (payload: { Keywords: string[] }): Promise<any> => {
        const response = await api.post<any>('/Keyword', payload);
        return response.data;
    },

    // 7. Keyword Distribution
    submitKeywordDistribution: async (payload: { Keyword: string }): Promise<any> => {
        const response = await api.post<any>('/Keyword_Pie', payload);
        return response.data;
    },

    // 8. Page Analysis
    submitPageAnalysis: async (payload: { Domain_Url: string; Comp_Url: string[] }): Promise<any> => {
        const response = await api.post<any>('/Page', payload);
        // The backend returns { "Page": { ... } }
        // We usually want the inner content, but let's return the whole object and let component destructure if needed
        return response.data;
    },

    // 9. Login
    submitLogin: async (payload: LoginPayload): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/Login', payload);
        return response.data;
    }
};
