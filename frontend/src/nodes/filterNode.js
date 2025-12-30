// filterNode.js - New Node demonstrating abstraction (Part 1)

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      icon="🔍"
      color="#ec4899"
      inputs={[{ id: 'input', label: 'Data' }]}
      outputs={[
        { id: 'match', label: 'Match', position: 35 },
        { id: 'nomatch', label: 'No Match', position: 65 }
      ]}
    >
      <NodeSelect
        label="Condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        options={[
          { value: 'equals', label: 'Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' },
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'lessThan', label: 'Less Than' },
          { value: 'regex', label: 'Regex Match' }
        ]}
      />
      <NodeInput
        label="Value"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Enter filter value"
      />
      <div style={{ 
        marginTop: '8px', 
        padding: '8px', 
        background: '#ec489920', 
        borderRadius: '6px',
        fontSize: '11px',
        color: '#f472b6'
      }}>
        🔀 Routes data based on condition
      </div>
    </BaseNode>
  );
};
