import axios from 'axios';
import type {
    OverallStrategyPayload,
    OverallStrategyResponse,
    ProductAnalysisPayload,
    ProductAnalysisResponse,
    SharedMissingKeywordsPayload,
    SharedMissingKeywordsResponse,
    MonthWisePlanPayload,
    MonthWisePlanResponse
} from '../types';

// Use current origin or local dev tunnel. 
// Assuming the backend is running on the same host or proxied suitable for development.
// If backend is on 8000 and frontend on 5173, we might need full URL or proxy.
// User instructions said "Base URL: same origin / dev tunnel"
// We will default to relative path, assuming proxy or same origin.
const API_BASE_URL = 'http://localhost:8000';

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
    }
};
