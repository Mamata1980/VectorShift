// textNode.js - With dynamic sizing and variable extraction

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 280, height: 150 });

  // Extract variables from text - memoized to avoid recalculation
  const extractedVariables = useMemo(() => {
    const variables = [];
    const seen = new Set();
    
    // Use a fresh regex each time to avoid state issues
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1];
      if (!seen.has(varName)) {
        seen.add(varName);
        variables.push(varName);
      }
    }
    
    return variables;
  }, [currText]);

  // Create dynamic input handles from variables
  const dynamicInputs = useMemo(() => {
    return extractedVariables.map((varName, index) => ({
      id: `var-${varName}`,
      label: varName,
      position: 30 + (index * 25) // Distribute handles vertically
    }));
  }, [extractedVariables]);

  // Dynamic sizing based on text content
  const calculateDimensions = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Calculate width based on longest line
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length));
      const calculatedWidth = Math.max(280, Math.min(500, maxLineLength * 8 + 60));
      
      // Calculate height based on content
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const calculatedHeight = Math.max(150, Math.min(400, scrollHeight + 100));
      
      setDimensions({
        width: calculatedWidth,
        height: calculatedHeight
      });
    }
  }, [currText]);

  useEffect(() => {
    calculateDimensions();
  }, [currText, calculateDimensions]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      icon="📝"
      color="#3b82f6"
      dynamicInputs={dynamicInputs}
      outputs={[{ id: 'output', label: 'Output' }]}
      minWidth={dimensions.width}
      minHeight={dimensions.height}
      style={{
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ marginBottom: '8px' }}>
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
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text... Use {{variableName}} for variables"
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '10px 12px',
            background: '#0f0f1a',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '13px',
            outline: 'none',
            resize: 'both',
            fontFamily: "'Monaco', 'Menlo', monospace",
            boxSizing: 'border-box',
            lineHeight: '1.6',
            overflow: 'auto'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#374151'}
          data-testid="text-node-input"
        />
      </div>

      {/* Variables Display */}
      {extractedVariables.length > 0 && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            background: '#3b82f615',
            borderRadius: '8px',
            border: '1px solid #3b82f630'
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#60a5fa',
              fontWeight: 600,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            🔗 Detected Variables ({extractedVariables.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {extractedVariables.map((varName) => (
              <span
                key={varName}
                style={{
                  padding: '4px 10px',
                  background: '#3b82f6',
                  color: '#ffffff',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 500,
                  fontFamily: 'monospace'
                }}
                data-testid={`variable-tag-${varName}`}
              >
                {varName}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Help text */}
      <div
        style={{
          marginTop: '8px',
          fontSize: '10px',
          color: '#6b7280',
          fontStyle: 'italic'
        }}
      >
        💡 Tip: Use {'{{'} variableName {'}'} to create input handles
      </div>
    </BaseNode>
  );
};
