export interface DashboardState {
    seo_score: number;
    issues: string[];
    improvements: string[];
    trend: 'improving' | 'stable';
    modules: {
        strategy: boolean;
        page: boolean;
        product: boolean;
        keywords: boolean;
        gaps: boolean;
    };
    last_updated: string;
}
