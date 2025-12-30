// draggableNode.js - Enhanced with icons and colors

export const DraggableNode = ({ type, label, icon, color = '#6366f1' }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '90px', 
          padding: '10px 14px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          border: `1px solid ${color}40`,
          justifyContent: 'center', 
          flexDirection: 'column',
          gap: '6px',
          transition: 'all 0.2s ease',
          boxShadow: `0 2px 8px ${color}10`
        }} 
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 4px 16px ${color}25`;
          e.currentTarget.style.borderColor = `${color}70`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 2px 8px ${color}10`;
          e.currentTarget.style.borderColor = `${color}40`;
        }}
        data-testid={`draggable-node-${type}`}
      >
          {icon && (
            <span style={{ fontSize: '20px' }}>{icon}</span>
          )}
          <span style={{ 
            color: '#e5e7eb', 
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.3px'
          }}>
            {label}
          </span>
      </div>
    );
  };
