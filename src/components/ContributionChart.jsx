import React, { useState, useMemo, useEffect } from 'react';

const CELL_SIZE = 12;
const CELL_GAP = 3;
const DAYS_IN_WEEK = 7;
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getColor = (count) => {
    if (count === 0) return '#161b22';
    if (count <= 2) return '#0e4429';
    if (count <= 5) return '#006d32';
    if (count <= 10) return '#26a641';
    return '#39d353';
};

const ContributionChart = ({ contributionData }) => {
    // contributionData structure: { years: [2024, 2023...], calendar: { "Last Year": {...}, "2024": {...} } }
    const availablePeriods = Object.keys(contributionData?.calendar || {}).sort((a, b) => {
        if (a === 'Last Year') return -1;
        if (b === 'Last Year') return 1;
        return b - a;
    });

    const [selectedPeriod, setSelectedPeriod] = useState('Last Year');

    useEffect(() => {
        if (availablePeriods.length > 0 && !availablePeriods.includes(selectedPeriod)) {
            setSelectedPeriod(availablePeriods[0]);
        }
    }, [availablePeriods, selectedPeriod]);

    const periodData = contributionData?.calendar?.[selectedPeriod];
    const weeks = periodData?.weeks || [];
    const totalContributions = periodData?.totalContributions || 0;

    // Compute month label positions
    const monthPositions = useMemo(() => {
        const positions = [];
        let lastMonth = -1;
        weeks.forEach((week, weekIdx) => {
            const firstDay = week.contributionDays?.[0];
            if (firstDay) {
                const dateObj = new Date(firstDay.date);
                const month = dateObj.getMonth();
                if (month !== lastMonth) {
                    positions.push({ month, weekIdx });
                    lastMonth = month;
                }
            }
        });
        return positions;
    }, [weeks]);

    const chartWidth = weeks.length * (CELL_SIZE + CELL_GAP) + 40;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <h2 className="text-sm font-medium text-github-text-secondary">
                    <span className="text-github-text font-semibold">{totalContributions.toLocaleString()}</span> contributions in {selectedPeriod === 'Last Year' ? 'the last year' : selectedPeriod}
                </h2>
                <div className="flex flex-wrap items-center gap-1">
                    {availablePeriods.map(period => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${selectedPeriod === period
                                ? 'bg-github-accent text-white border-github-accent'
                                : 'text-github-text-secondary hover:bg-github-border/30 border border-github-border'
                                }`}
                        >
                            {period === 'Last Year' ? 'Last Year' : period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Graph */}
            <div className="overflow-x-auto no-scrollbar rounded-md border border-github-border bg-github-bg-secondary p-4">
                <svg width={Math.max(chartWidth, 750)} height={DAYS_IN_WEEK * (CELL_SIZE + CELL_GAP) + 30} className="block">
                    {/* Month labels */}
                    {monthPositions.map(({ month, weekIdx }) => (
                        <text
                            key={`month-${month}-${weekIdx}`}
                            x={weekIdx * (CELL_SIZE + CELL_GAP) + 32}
                            y={10}
                            className="fill-github-text-secondary"
                            fontSize={10}
                        >
                            {MONTH_LABELS[month]}
                        </text>
                    ))}

                    {/* Day labels */}
                    {['Mon', 'Wed', 'Fri'].map((day, i) => (
                        <text
                            key={day}
                            x={0}
                            y={20 + (i * 2 + 1) * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2 + 3}
                            className="fill-github-text-secondary"
                            fontSize={9}
                        >
                            {day}
                        </text>
                    ))}

                    {/* Cells */}
                    {weeks.map((week, weekIdx) => (
                        <g key={weekIdx} transform={`translate(${weekIdx * (CELL_SIZE + CELL_GAP) + 30}, 18)`}>
                            {week.contributionDays.map((day, dayIdx) => (
                                <rect
                                    key={day.date}
                                    x={0}
                                    y={dayIdx * (CELL_SIZE + CELL_GAP)}
                                    width={CELL_SIZE}
                                    height={CELL_SIZE}
                                    rx={2}
                                    ry={2}
                                    fill={getColor(day.contributionCount)}
                                    className="hover:stroke-github-text hover:stroke-1 cursor-pointer transition-colors"
                                >
                                    <title>{`${day.contributionCount} contributions on ${day.date}`}</title>
                                </rect>
                            ))}
                        </g>
                    ))}
                </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-3 text-[11px] text-github-text-secondary">
                <span>Less</span>
                {[0, 2, 5, 10, 15].map(count => (
                    <span
                        key={count}
                        className="w-3 h-3 rounded-sm inline-block"
                        style={{ backgroundColor: count === 0 ? '#161b22' : getColor(count) }}
                    />
                ))}
                <span>More</span>
            </div>
        </div>
    );
};

export default ContributionChart;
