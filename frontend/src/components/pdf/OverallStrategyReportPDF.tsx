import React from 'react';
import type { OverallStrategyReportData } from '../../types/index';

interface OverallStrategyReportPDFProps {
    data: OverallStrategyReportData;
    generatedAt: string;
}

/**
 * PDF-Optimized Report Component - INLINE STYLES ONLY
 * 
 * This component uses ONLY inline styles because html2pdf.js
 * does not reliably apply external CSS or <style> tags.
 * 
 * Key Rules:
 * - ALL styles must be inline (style={{ }})
 * - No CSS classes
 * - No Tailwind
 * - Simple HTML structure
 */
export const OverallStrategyReportPDF: React.FC<OverallStrategyReportPDFProps> = ({ data, generatedAt }) => {

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Common styles
    const containerStyle: React.CSSProperties = {
        width: '100%',
        padding: '20px',
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '10pt',
        lineHeight: '1.6',
        color: '#000000'
    };

    const headerStyle: React.CSSProperties = {
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        padding: '30px',
        marginBottom: '20px'
    };

    const h1Style: React.CSSProperties = {
        fontSize: '24pt',
        fontWeight: 'bold',
        marginBottom: '10px',
        margin: 0
    };

    const h2Style: React.CSSProperties = {
        fontSize: '16pt',
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginTop: '30px',
        marginBottom: '15px',
        paddingBottom: '8px',
        borderBottom: '2px solid #3b82f6'
    };

    const h3Style: React.CSSProperties = {
        fontSize: '13pt',
        fontWeight: 'bold',
        color: '#1e40af',
        marginTop: '15px',
        marginBottom: '10px'
    };

    const tableStyle: React.CSSProperties = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '15px',
        marginBottom: '15px',
        fontSize: '9pt'
    };

    const thStyle: React.CSSProperties = {
        backgroundColor: '#f1f5f9',
        color: '#1e293b',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '10px 8px',
        border: '1px solid #cbd5e1'
    };

    const tdStyle: React.CSSProperties = {
        padding: '8px',
        border: '1px solid #cbd5e1',
        verticalAlign: 'top'
    };

    const infoBoxStyle: React.CSSProperties = {
        backgroundColor: '#f0f9ff',
        borderLeft: '4px solid #3b82f6',
        padding: '15px',
        marginTop: '15px',
        marginBottom: '15px'
    };

    const warningBoxStyle: React.CSSProperties = {
        backgroundColor: '#fffbeb',
        borderLeft: '4px solid #f59e0b',
        padding: '15px',
        marginTop: '15px',
        marginBottom: '15px'
    };

    const cardStyle: React.CSSProperties = {
        border: '1px solid #cbd5e1',
        padding: '15px',
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: '#ffffff'
    };

    const getBadgeStyle = (priority: string): React.CSSProperties => {
        const base: React.CSSProperties = {
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '8pt',
            fontWeight: 'bold'
        };

        if (priority === 'High') {
            return { ...base, backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' };
        } else if (priority === 'Medium') {
            return { ...base, backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' };
        } else {
            return { ...base, backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #86efac' };
        }
    };

    const getDifficultyBadgeStyle = (difficulty: number): React.CSSProperties => {
        const base: React.CSSProperties = {
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '8pt',
            fontWeight: 'bold'
        };

        if (difficulty > 70) {
            return { ...base, backgroundColor: '#fee2e2', color: '#991b1b' };
        } else if (difficulty > 40) {
            return { ...base, backgroundColor: '#fef3c7', color: '#92400e' };
        } else {
            return { ...base, backgroundColor: '#dcfce7', color: '#166534' };
        }
    };

    const pageBreakStyle: React.CSSProperties = {
        pageBreakBefore: 'always'
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <h1 style={h1Style}>Overall SEO Strategy Report</h1>
                <div style={{ fontSize: '9pt', marginTop: '10px' }}>
                    Generated on {formatDate(generatedAt)} at {formatTime(generatedAt)}
                    <br />
                    Competitors Analyzed: {data.competitor_count}
                </div>
            </div>

            {/* Strategic Goal */}
            <div style={infoBoxStyle}>
                <h3 style={{ ...h3Style, marginTop: 0 }}>Strategic Goal</h3>
                <p style={{ margin: 0 }}>{data.goal}</p>
            </div>

            {/* Seed Keywords */}
            <div style={pageBreakStyle}>
                <h2 style={h2Style}>Seed Keywords Overview</h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Keyword</th>
                            <th style={thStyle}>Search Volume</th>
                            <th style={thStyle}>Difficulty</th>
                            <th style={thStyle}>Intent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.seed_keywords.map((kw, i) => (
                            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                                <td style={tdStyle}><strong>{kw.keyword}</strong></td>
                                <td style={tdStyle}>{kw.search_volume.toLocaleString()}</td>
                                <td style={tdStyle}>
                                    <span style={getDifficultyBadgeStyle(kw.difficulty)}>{kw.difficulty}</span>
                                </td>
                                <td style={tdStyle}>{kw.intent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Competitor Analysis */}
            <div style={pageBreakStyle}>
                <h2 style={h2Style}>Competitor Analysis</h2>
                {data.competitor_analysis.map((comp, i) => (
                    <div key={i} style={cardStyle}>
                        <h3 style={{ ...h3Style, marginTop: 0 }}>{comp.title}</h3>
                        <p style={{ color: '#3b82f6', fontSize: '8pt', marginBottom: '10px' }}>{comp.url}</p>

                        <table style={{ ...tableStyle, marginTop: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ ...tdStyle, width: '40%' }}><strong>Word Count:</strong></td>
                                    <td style={tdStyle}>{comp.word_count}</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}><strong>CTA Links:</strong></td>
                                    <td style={tdStyle}>{comp.cta_links}</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}><strong>Schema Detected:</strong></td>
                                    <td style={tdStyle}>{comp.schema_detected ? 'Yes' : 'None'}</td>
                                </tr>
                            </tbody>
                        </table>

                        <p style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>H1 Headings:</p>
                        <ul style={{ margin: '0 0 0 20px', padding: 0 }}>
                            {comp.h1.map((h, k) => <li key={k} style={{ marginBottom: '3px' }}>{h}</li>)}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Gap Analysis */}
            <div style={pageBreakStyle}>
                <h2 style={h2Style}>Gap Analysis</h2>
                {data.gaps.map((gap) => (
                    <div key={gap.id} style={warningBoxStyle}>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ fontSize: '12pt' }}>{gap.type} Gap</strong>
                            <span style={{ ...getBadgeStyle(gap.fix_plan.priority), marginLeft: '10px' }}>
                                {gap.fix_plan.priority} Priority
                            </span>
                        </div>
                        <p style={{ marginBottom: '10px' }}><strong>Description:</strong> {gap.description}</p>

                        <table style={tableStyle}>
                            <tbody>
                                <tr>
                                    <td style={{ ...tdStyle, width: '20%' }}><strong>What:</strong></td>
                                    <td style={tdStyle}>{gap.fix_plan.what}</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}><strong>Why:</strong></td>
                                    <td style={tdStyle}>{gap.fix_plan.why}</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}><strong>Where:</strong></td>
                                    <td style={tdStyle}>{gap.fix_plan.where}</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}><strong>How:</strong></td>
                                    <td style={tdStyle}>{gap.fix_plan.how}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {/* Keyword Clusters */}
            <div style={pageBreakStyle}>
                <h2 style={h2Style}>Keyword Clusters</h2>
                {data.clusters.map((cluster, i) => (
                    <div key={i} style={{ marginBottom: '15px' }}>
                        <h3 style={h3Style}>{cluster.name}</h3>
                        <p><strong>Intent:</strong> {cluster.intent}</p>
                        <p><strong>Keywords:</strong> {cluster.keywords.join(', ')}</p>
                    </div>
                ))}
            </div>

            {/* Execution Roadmap */}
            <div style={pageBreakStyle}>
                <h2 style={h2Style}>Execution Roadmap</h2>
                {data.roadmap.map((step) => (
                    <div key={step.step_number} style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{
                                backgroundColor: '#3b82f6',
                                color: '#ffffff',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                marginRight: '10px'
                            }}>
                                {step.step_number}
                            </span>
                            <div>
                                <strong style={{ fontSize: '12pt' }}>{step.issue}</strong>
                                <span style={{ ...getBadgeStyle(step.priority), marginLeft: '10px' }}>
                                    {step.priority} Priority
                                </span>
                            </div>
                        </div>

                        <p><strong>Evidence:</strong> {step.evidence}</p>

                        <p style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>Fix Plan:</p>
                        <ul style={{ margin: '0 0 0 20px', padding: 0 }}>
                            {step.fix_plan_bullets.map((bullet, k) => (
                                <li key={k} style={{ marginBottom: '3px' }}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid #cbd5e1',
                textAlign: 'center',
                fontSize: '8pt',
                color: '#64748b'
            }}>
                <p>© 2024 SEO Analyzer Tool | This report is auto-generated based on competitive analysis.</p>
            </div>
        </div>
    );
};
