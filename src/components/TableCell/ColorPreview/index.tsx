import * as React from 'react';

interface TableCellColorPreviewProps {
  color?: string;
}

const TableCellColorPreview: React.FC<TableCellColorPreviewProps> = ({
  color,
}) => {
  if (!color) {
    return null;
  }

  return (
    <div
      key={color}
      style={{
        backgroundColor: color,
        width: 16,
        height: 16,
        borderRadius: 2,
      }}
    />
  );
};

export { TableCellColorPreview };

export type { TableCellColorPreviewProps };
