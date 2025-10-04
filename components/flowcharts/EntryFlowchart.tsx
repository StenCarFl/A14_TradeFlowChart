
import React from 'react';
import { FlowchartNode } from './FlowchartNode';

interface EntryFlowchartProps {
    activeNode: string;
    spxPrice: number | null;
}

export const EntryFlowchart: React.FC<EntryFlowchartProps> = ({ activeNode, spxPrice }) => {
    const A = spxPrice ? Math.ceil(spxPrice / 10) * 10 : 'A';
    // FIX: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
    // Using a type guard to ensure A is a number before the arithmetic operation.
    const M = typeof A === 'number' ? A - 40 : 'M';
    // FIX: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
    // Using a type guard to ensure M is a number before the arithmetic operation.
    const Z = typeof M === 'number' ? M - 60 : 'Z';

    return (
        <div className="flex flex-col items-center space-y-8 p-4">
            <FlowchartNode id="start_entry" activeNode={activeNode} type="start_end">Start</FlowchartNode>
            <FlowchartNode id="entry_action" activeNode={activeNode} type="action">
                <div>
                    <p className="font-bold">BWB Set-Up</p>
                    <ul className="text-left text-xs mt-2 space-y-1">
                        <li>Upper Wing (A): {A}</li>
                        <li>Short Strike (M): {M}</li>
                        <li>Lower Wing (Z): {Z}</li>
                        <li>Expiration: Today + 14d</li>
                    </ul>
                </div>
            </FlowchartNode>
        </div>
    );
}
