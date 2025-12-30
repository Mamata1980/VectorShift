// timerNode.js - New Node demonstrating abstraction (Part 1)

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect, NodeCheckbox } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || '1000');
  const [unit, setUnit] = useState(data?.unit || 'ms');
  const [repeat, setRepeat] = useState(data?.repeat || false);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Timer"
      icon="⏱️"
      color="#14b8a6"
      inputs={[{ id: 'trigger', label: 'Trigger' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <NodeInput
        label="Delay"
        type="number"
        value={delay}
        onChange={(e) => setDelay(e.target.value)}
        placeholder="Enter delay"
      />
      <NodeSelect
        label="Unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        options={[
          { value: 'ms', label: 'Milliseconds' },
          { value: 's', label: 'Seconds' },
          { value: 'm', label: 'Minutes' },
          { value: 'h', label: 'Hours' }
        ]}
      />
      <NodeCheckbox
        label="Repeat"
        checked={repeat}
        onChange={(e) => setRepeat(e.target.checked)}
      />
      <div style={{ 
        marginTop: '8px', 
        padding: '8px', 
        background: '#14b8a620', 
        borderRadius: '6px',
        fontSize: '11px',
        color: '#5eead4'
      }}>
        ⏰ Delays execution by {delay} {unit}
      </div>
    </BaseNode>
  );
};
