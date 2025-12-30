// noteNode.js - New Node demonstrating abstraction (Part 1)

import { useState } from 'react';
import { BaseNode, NodeSelect } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');
  const [color, setColor] = useState(data?.color || 'yellow');

  const colors = {
    yellow: { bg: '#fef3c7', border: '#fbbf24', text: '#92400e' },
    blue: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
    green: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
    pink: { bg: '#fce7f3', border: '#ec4899', text: '#9d174d' },
    purple: { bg: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' }
  };

  const selectedColor = colors[color] || colors.yellow;

  return (
    <BaseNode
      id={id}
      data={data}
      title="Note"
      icon="📌"
      color={selectedColor.border}
      style={{
        background: `linear-gradient(135deg, ${selectedColor.bg}90 0%, ${selectedColor.bg}60 100%)`,
        border: `2px solid ${selectedColor.border}`
      }}
    >
      <NodeSelect
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        options={[
          { value: 'yellow', label: '🟡 Yellow' },
          { value: 'blue', label: '🔵 Blue' },
          { value: 'green', label: '🟢 Green' },
          { value: 'pink', label: '🔴 Pink' },
          { value: 'purple', label: '🟣 Purple' }
        ]}
      />
      <div style={{ marginTop: '8px' }}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your notes here..."
          rows={4}
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.7)',
            border: `1px solid ${selectedColor.border}50`,
            borderRadius: '8px',
            color: selectedColor.text,
            fontSize: '13px',
            outline: 'none',
            resize: 'vertical',
            fontFamily: "'Patrick Hand', cursive, sans-serif",
            boxSizing: 'border-box',
            lineHeight: '1.6'
          }}
          data-testid="note-textarea"
        />
      </div>
      <div style={{ 
        marginTop: '8px', 
        fontSize: '10px', 
        color: selectedColor.text,
        opacity: 0.7,
        fontStyle: 'italic'
      }}>
        📝 Notes are for documentation only
      </div>
    </BaseNode>
  );
};
