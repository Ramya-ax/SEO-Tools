export interface ReportData {
    id: string;
    type: string;
    generated_at: string;
    data: any; // Flexible payload for different report types
}

export type ReportType =
    | 'overall-strategy'
    | 'product-analysis'
    | 'product'
    | 'shared-missing-keywords'
    | 'keywords'
    | 'month-wise-plan'
    | 'page-analysis'
    | 'sitemap-seed'
    | 'keyword-distribution';

// ==========================================
// 1. OVERALL STRATEGY
// ==========================================

export interface OverallStrategyPayload {
    Domain_URL: string;
    Competetior_Name: string[];
    Products_Name: string[];
    Important_Keywords: string[];
    Domain_Description: string;
    Target_Audience: string[];
    Goal: string[];
    Current_State_of_SEO: string;
}

export interface SeedKeyword {
    keyword: string;
    search_volume: number;
    difficulty: number;
    intent: string;
}

export interface CompetitorPageAnalysis {
    Competitor?: string;
    competitor?: string;
    Summary?: string;
    summary?: string;
    analysis?: string;
}

export interface RoadmapFixPlanItem {
    what: string;
    why: string;
    where: string;
    how: string;
    priority: string;
    keyywords_to_use?: string[];
    where_to_use_keyword?: Record<string, string>;
}

export interface GapFixPlan {
    what: string;
    why: string;
    where: string;
    how: string;
    priority: 'High' | 'Medium' | 'Low';
}

export interface Gap {
    id: string;
    type?: string;     // Backend: type is sometimes implicit or 'gap_type'
    gap_type?: string; // Backend alternative
    description: string;
    fix_plan: GapFixPlan | GapFixPlan[]; // Backend returns list
}

export interface KeywordCluster {
    name?: string;
    cluster_name?: string; // Backend key
    keywords: string[];
    intent?: string;
    tag?: string;          // Backend key
}

export interface RoadmapStep {
    step_number?: number;
    title?: string;
    step_name?: string;    // Backend key
    issue?: string;
    competitor_issue?: string; // Backend key
    evidence?: string;
    evidence_from_scrape?: any; // Backend returns object {target_page, competitor_page}
    fix_plan_bullets?: string[];
    fix_plan?: RoadmapFixPlanItem[];      // Backend returns structured list
    priority?: 'High' | 'Medium' | 'Low';
    // Top level keywords (if applicable in some versions)
    keywords_to_use?: string[];
    where_to_use_keyword?: Record<string, string>;
}

export interface OverallStrategyResponse {
    Seed_Keyword: SeedKeyword[];
    competetior: string[];
    competetior_Analyisis: CompetitorPageAnalysis[];
    competetor_gap: Gap[];
    Keyword_Cluster: KeywordCluster[];
    Stragery: RoadmapStep[] | Record<string, RoadmapStep>; // Can be object with step keys
    Goal: string;
}

// ==========================================
// 2. PRODUCT ANALYSIS
// ==========================================

export interface ProductAnalysisPayload {
    Domain_Page: string;
    Product_Page_URL: string;
    Competetior_Name: string[];
    Products_Name: string[];
    Important_Keywords: string[];
    Product_Page_Infos: string;
    Target_Audience: string[];
    Goal: string[];
    Prevoivs_Strategy_Used: string;
}

export interface PVerdict {
    status: string;
    reason: string;
    conversion_readiness_score: number;
}

export interface PSeedKeyword {
    keyword: string;
    keyword_source: string;
    relevance_score: number;
    improvement_plan: string;
}

export interface PCompetitorAnalysis {
    competitor: string;
    summary: string;
}

export interface PGapFixPlan {
    what: string;
    why: string;
    where: string;
    how: string;
    priority: string;
}

export interface PCompetitorGap {
    gap_type: string;
    domain_evidence: string;
    competitor_evidence: string;
    fix_plan: PGapFixPlan[];
}

export interface PKeywordCluster {
    cluster_name: string;
    keywords: string[];
    tag: string;
}

export interface PInternalLinking {
    from_page: string;
    to_page: string;
    anchor_text: string;
}

export interface PStepFixPlan {
    page_action: string;
    page_url: string;
    what: string;
    why: string;
    where: string;
    how: string;
    priority: string;
    primary_keyword: string;
    secondary_keywords: string[];
    where_to_use_keyword: Record<string, string>;
    cta?: string;
    internal_linking?: PInternalLinking;
    schema_type?: string[];
}

export interface PStepEvidence {
    target_page: string;
    competitor_pages: string;
}

export interface PStrategyStep {
    step_name: string;
    competitor_issue: string;
    evidence_from_scrape: PStepEvidence;
    fix_plan: PStepFixPlan[];
}

export interface ProductAnalysisResponse {
    Verdict: PVerdict;
    Seed_Keyword: PSeedKeyword[];
    competetior: string[];
    competetior_Analyisis: PCompetitorAnalysis[];
    competetor_gap: PCompetitorGap[];
    Keyword_Cluster: PKeywordCluster[];
    Stragery: { steps: PStrategyStep[] };
    Goal: string;
}


// ==========================================
// 3. SHARED & MISSING KEYWORDS
// ==========================================

export interface SharedMissingKeywordsPayload {
    Domain_URL: string;
    Competetior_Name: string[];
}

// Row tuple: [Domain, Keyword, Search Volume, Difficulty, Intent, URL, Page Title, Present Rank, Previous Rank, Change]
export type KeywordTableRow = [string, string, number, number, string, string, string, number, number, number];

export interface SharedMissingKeywordsResponse {
    Error: boolean;
    shared_count: KeywordTableRow[];
    missing_count: KeywordTableRow[];
}

// ==========================================
// 4. MONTH WISE PLAN
// ==========================================

export interface MonthWisePlanPayload {
    Domain_Page: string;
    Page_URL: string;
    Competetior_Name: string[];
    Products_Name: string[];
    Important_Keywords: string[];
    Page_Info: string;
    Target_Audience: string[];
    Goal: string[];
    Prevoivs_Strategy_Used_for_Prevois_Month: string;
    start_month: string;
    end_month: string;
}

export interface MSeedKeyword {
    keyword: string;
    relevance_score: number;
    keyword_origin: string;
    keyword_source: string;
}

export interface MCompetitorAnalysis {
    competitor: string;
    summary: string;
}

export interface MGapFixPlan {
    what: string;
    why: string;
    where: string;
    how: string;
    priority: string;
}

export interface MCompetitorGap {
    gap_type: string;
    description: string;
    fix_plan: MGapFixPlan[];
}

export interface MKeywordCluster {
    cluster_name: string;
    keywords: { keyword: string; keyword_origin?: string }[];
    tag: string;
}

export interface MStrategyItem {
    month: string;
    s_no: number;
    content_type: string;
    page_action: string;
    page_name: string;
    page_url: string;
    section_target?: string;
    topic: string;
    primary_keyword: string;
    secondary_keywords: string[];
    search_intent: string;
    competitors: string[];
    competitor_links: string[];
    schema_type?: string[];
    internal_links?: string[];
    cta: string;
    conversion_goal: string;
    serp_feature_target?: string[];
    brief: string;
    expected_result: string;
    priority: string;
    keyword_origin?: string;
    keyword_source?: string;
}

export interface MonthWisePlanResponse {
    Seed_Keyword: MSeedKeyword[];
    competetior: string[];
    competetior_Analyisis: MCompetitorAnalysis[];
    competetor_gap: MCompetitorGap[];
    Keyword_Cluster: MKeywordCluster[];
    Stragery: {
        Months_Plan: {
            [key: string]: MStrategyItem[];
        };
    };
    Goal: string;
}

// ==========================================
// 5. KEYWORD RESEARCH
// ==========================================

export interface KeywordResearchPayload {
    Keywords: string[];
}

export interface RelatedKeywordItem {
    Keyword: string;
    Search_Volume: number;
    keyword_difficulty: number | null;
    Intent: string;
}

export interface PeopleAlsoAskItem {
    Keyword: string;
    Search_Volume: number;
    keyword_difficulty: number;
    Intent: string;
    People_Also_Ask_For: string[];
}

export interface LongTailKeywordItem {
    Keyword: string;
    Search_Volume: number;
    keyword_difficulty: number;
    Intent: string;
}

export interface EachKeywordInfo {
    Keyword: string;
    People_Also_Ask_For: PeopleAlsoAskItem[];
    Long_tail_Keyword: LongTailKeywordItem[];
}

export interface KeywordResearchResponse {
    Related_Keywords: RelatedKeywordItem[];
    Each_keyword_info: EachKeywordInfo[];
}
