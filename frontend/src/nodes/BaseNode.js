// BaseNode.js - Node Abstraction Layer
// This provides a reusable base for all node types

import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A flexible abstraction for creating pipeline nodes
 * 
 * @param {Object} props
 * @param {string} props.id - Node ID
 * @param {Object} props.data - Node data
 * @param {string} props.title - Node title displayed in header
 * @param {string} props.icon - Icon emoji or character
 * @param {string} props.color - Accent color for the node
 * @param {Array} props.inputs - Array of input handle configs {id, label, position?}
 * @param {Array} props.outputs - Array of output handle configs {id, label, position?}
 * @param {React.ReactNode} props.children - Node content/body
 * @param {Object} props.style - Additional style overrides
 * @param {number} props.minWidth - Minimum width
 * @param {number} props.minHeight - Minimum height
 */
export const BaseNode = ({
  id,
  data,
  title,
  icon,
  color = '#6366f1',
  inputs = [],
  outputs = [],
  children,
  style = {},
  minWidth = 240,
  minHeight = 'auto',
  dynamicInputs = [],
  className = ''
}) => {
  // Calculate handle positions for multiple inputs/outputs
  const getHandlePosition = (index, total) => {
    if (total === 1) return 50;
    return ((index + 1) / (total + 1)) * 100;
  };

  const allInputs = [...inputs, ...dynamicInputs];

  return (
    <div
      className={`base-node ${className}`}
      style={{
        minWidth,
        minHeight,
        background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
        border: `1px solid ${color}40`,
        borderRadius: '12px',
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${color}15`,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        ...style
      }}
      data-testid={`node-${id}`}
    >
      {/* Node Header */}
      <div
        className="node-header"
        style={{
          background: `linear-gradient(90deg, ${color}30 0%, ${color}10 100%)`,
          borderBottom: `1px solid ${color}30`,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {icon && (
          <span style={{ fontSize: '18px' }}>{icon}</span>
        )}
        <span
          style={{
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}
        >
          {title}
        </span>
      </div>

      {/* Node Body */}
      <div
        className="node-body"
        style={{
          padding: '14px',
          position: 'relative'
        }}
      >
        {children}
      </div>

      {/* Input Handles */}
      {allInputs.map((input, index) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: input.position ? `${input.position}%` : `${getHandlePosition(index, allInputs.length)}%`,
            width: '12px',
            height: '12px',
            background: color,
            border: '2px solid #1e1e2e',
            transition: 'all 0.2s ease'
          }}
          data-testid={`handle-input-${input.id}`}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: output.position ? `${output.position}%` : `${getHandlePosition(index, outputs.length)}%`,
            width: '12px',
            height: '12px',
            background: color,
            border: '2px solid #1e1e2e',
            transition: 'all 0.2s ease'
          }}
          data-testid={`handle-output-${output.id}`}
        />
      ))}

      {/* Input Labels (on left side) */}
      {allInputs.map((input, index) => (
        input.label && (
          <div
            key={`label-input-${input.id}`}
            style={{
              position: 'absolute',
              left: '18px',
              top: input.position ? `${input.position}%` : `${getHandlePosition(index, allInputs.length)}%`,
              transform: 'translateY(-50%)',
              fontSize: '10px',
              color: '#9ca3af',
              pointerEvents: 'none'
            }}
          >
            {input.label}
          </div>
        )
      ))}

      {/* Output Labels (on right side) */}
      {outputs.map((output, index) => (
        output.label && (
          <div
            key={`label-output-${output.id}`}
            style={{
              position: 'absolute',
              right: '18px',
              top: output.position ? `${output.position}%` : `${getHandlePosition(index, outputs.length)}%`,
              transform: 'translateY(-50%)',
              fontSize: '10px',
              color: '#9ca3af',
              textAlign: 'right',
              pointerEvents: 'none'
            }}
          >
            {output.label}
          </div>
        )
      ))}
    </div>
  );
};

// Reusable form field components
export const NodeInput = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
  <div style={{ marginBottom: '12px' }}>
    <label
      style={{
        display: 'block',
        color: '#9ca3af',
        fontSize: '11px',
        fontWeight: 500,
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
    >
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '8px 12px',
        background: '#0f0f1a',
        border: '1px solid #374151',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '13px',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        boxSizing: 'border-box'
      }}
      onFocus={(e) => e.target.style.borderColor = '#6366f1'}
      onBlur={(e) => e.target.style.borderColor = '#374151'}
      data-testid={`node-input-${label.toLowerCase().replace(/\s/g, '-')}`}
    />
  </div>
);

export const NodeSelect = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: '12px' }}>
    <label
      style={{
        display: 'block',
        color: '#9ca3af',
        fontSize: '11px',
        fontWeight: 500,
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
    >
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '8px 12px',
        background: '#0f0f1a',
        border: '1px solid #374151',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '13px',
        outline: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box'
      }}
      data-testid={`node-select-${label.toLowerCase().replace(/\s/g, '-')}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export const NodeTextArea = ({ label, value, onChange, placeholder = '', rows = 3 }) => (
  <div style={{ marginBottom: '12px' }}>
    {label && (
      <label
        style={{
          display: 'block',
          color: '#9ca3af',
          fontSize: '11px',
          fontWeight: 500,
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {label}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '8px 12px',
        background: '#0f0f1a',
        border: '1px solid #374151',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '13px',
        outline: 'none',
        resize: 'none',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
        lineHeight: '1.5'
      }}
      onFocus={(e) => e.target.style.borderColor = '#6366f1'}
      onBlur={(e) => e.target.style.borderColor = '#374151'}
      data-testid={`node-textarea-${(label || 'text').toLowerCase().replace(/\s/g, '-')}`}
    />
  </div>
);

export const NodeCheckbox = ({ label, checked, onChange }) => (
  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        width: '16px',
        height: '16px',
        cursor: 'pointer',
        accentColor: '#6366f1'
      }}
      data-testid={`node-checkbox-${label.toLowerCase().replace(/\s/g, '-')}`}
    />
    <label
      style={{
        color: '#d1d5db',
        fontSize: '13px',
        cursor: 'pointer'
      }}
    >
      {label}
    </label>
  </div>
);

export default BaseNode;
