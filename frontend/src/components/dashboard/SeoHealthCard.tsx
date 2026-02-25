import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface SeoHealthCardProps {
    score: number;
    trend: 'improving' | 'stable';
    lastUpdated: string;
}

export const SeoHealthCard: React.FC<SeoHealthCardProps> = ({ score, trend, lastUpdated }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        // Animate score from 0 to target
        const duration = 1500;
        const steps = 60;
        const stepTime = Math.abs(Math.floor(duration / steps));
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep += 1;
            const progress = currentStep / steps;
            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setAnimatedScore(Math.round(easeOutQuart * score));

            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedScore(score);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [score]);

    // Determine colors based on score
    let scoreColor = 'text-green-500';
    let ringColor = 'stroke-green-500';
    if (score < 50) {
        scoreColor = 'text-red-500';
        ringColor = 'stroke-red-500';
    } else if (score < 80) {
        scoreColor = 'text-amber-500';
        ringColor = 'stroke-amber-500';
    }

    // Calculate SVG stroke dasharray for the circular progress
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">SEO Health Score</h2>
                    <p className="text-sm text-gray-500 mt-1">Overall optimization rating</p>
                </div>

                {/* Trend Badge */}
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${trend === 'improving' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                    {trend === 'improving' ? (
                        <>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            <span>Improving</span>
                        </>
                    ) : (
                        <>
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span>Stable</span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center py-4">
                {/* Circular Progress Indicator */}
                <div className="relative flex items-center justify-center">
                    {/* Background Ring */}
                    <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                            className="text-gray-100 stroke-current"
                            strokeWidth="12"
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="transparent"
                        />
                        {/* Progress Ring */}
                        <circle
                            className={`${ringColor} transition-all duration-100 ease-out`}
                            strokeWidth="12"
                            strokeLinecap="round"
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className={`text-5xl font-bold ${scoreColor}`}>{animatedScore}</span>
                        <span className="text-xs font-medium text-gray-400 mt-1">/ 100</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-right">
                <p className="text-xs text-gray-400">
                    Last synced: {new Date(lastUpdated).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                </p>
            </div>
        </div>
    );
};
