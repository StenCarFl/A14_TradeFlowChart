
import React from 'react';
import { FlowchartNode } from './FlowchartNode';

interface AdjustmentFlowchartProps {
  activeNode: string;
}

export const AdjustmentFlowchart: React.FC<AdjustmentFlowchartProps> = ({ activeNode }) => {
  return (
    <div className="flex flex-col items-center space-y-8 p-4 font-sans">
      <FlowchartNode id="start_adjustment" activeNode={activeNode} type="start_end">Start</FlowchartNode>
      
      <div className="flex justify-center items-center">
        <FlowchartNode id="is_adjustment" activeNode={activeNode} type="decision">Is there already an Adjustment?</FlowchartNode>
      </div>
      
      <div className="grid grid-cols-2 gap-x-32">
        {/* No Path */}
        <div className="flex flex-col items-center space-y-8">
            <p className="font-bold">No</p>
            <FlowchartNode id="no_adj_spx_gt_a" activeNode={activeNode} type="decision">SPX &gt; A</FlowchartNode>
            <FlowchartNode id="no_adj_spx_lt_be" activeNode={activeNode} type="decision">SPX &lt; BE</FlowchartNode>
            <FlowchartNode id="no_adj_spx_lt_thresh" activeNode={activeNode} type="decision">SPX &lt; A - (60% * (A-BE))</FlowchartNode>
            <FlowchartNode id="no_adj_spx_lt_m" activeNode={activeNode} type="decision">SPX &lt; M</FlowchartNode>
        </div>

        {/* Yes Path */}
        <div className="flex flex-col items-center space-y-8">
            <p className="font-bold">Yes</p>
            <FlowchartNode id="is_downside" activeNode={activeNode} type="decision">Is Existing Adjustment DOWNSIDE?</FlowchartNode>
            <FlowchartNode id="adj_spx_gt_u" activeNode={activeNode} type="decision">SPX &gt; U</FlowchartNode>
            <FlowchartNode id="adj_spx_lt_be" activeNode={activeNode} type="decision">SPX &lt; BE</FlowchartNode>
            <FlowchartNode id="adj_spx_lt_thresh" activeNode={activeNode} type="decision">SPX &lt; A - (60% * (A-BE))</FlowchartNode>
            <FlowchartNode id="adj_spx_lt_m" activeNode={activeNode} type="decision">SPX &lt; M</FlowchartNode>
        </div>
      </div>
      <FlowchartNode id="no_action" activeNode={activeNode} type="start_end">Hold</FlowchartNode>
    </div>
  );
};
