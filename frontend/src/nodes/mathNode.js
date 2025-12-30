// mathNode.js - New Node demonstrating abstraction (Part 1)

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || '');

  const operationSymbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    modulo: '%',
    power: '^',
    sqrt: '√',
    abs: '|x|'
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      icon="🧮"
      color="#06b6d4"
      inputs={[
        { id: 'a', label: 'A', position: 35 },
        { id: 'b', label: 'B', position: 65 }
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
    >
      <NodeSelect
        label="Operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        options={[
          { value: 'add', label: 'Add (+)' },
          { value: 'subtract', label: 'Subtract (−)' },
          { value: 'multiply', label: 'Multiply (×)' },
          { value: 'divide', label: 'Divide (÷)' },
          { value: 'modulo', label: 'Modulo (%)' },
          { value: 'power', label: 'Power (^)' },
          { value: 'sqrt', label: 'Square Root (√)' },
          { value: 'abs', label: 'Absolute (|x|)' },
          { value: 'min', label: 'Minimum' },
          { value: 'max', label: 'Maximum' }
        ]}
      />
      <NodeInput
        label="Static Value (Optional)"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value or connect input"
      />
      <div style={{ 
        marginTop: '8px', 
        padding: '12px', 
        background: '#06b6d420', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <span style={{ 
          fontSize: '24px', 
          fontWeight: 700,
          color: '#22d3ee',
          fontFamily: 'monospace'
        }}>
          A {operationSymbols[operation] || '?'} B
        </span>
        <div style={{ 
          marginTop: '6px',
          fontSize: '10px', 
          color: '#67e8f9'
        }}>
          Connect inputs or use static value
        </div>
      </div>
    </BaseNode>
  );
};
