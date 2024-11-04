import { useEffect, useState } from 'react';
import { AbacusColumn } from '@/components/abacus-column';

interface AbacusProps {
  value: number;
  onChange: (value: number) => void;
}

export function Abacus({ value, onChange }: AbacusProps) {
  const [columns, setColumns] = useState<number[]>(Array(13).fill(0));

  useEffect(() => {
    // Convert value to array of digits
    const newColumns = Array(13).fill(0);
    let remaining = value;
    
    for (let i = 0; i < 13 && remaining > 0; i++) {
      newColumns[i] = remaining % 10;
      remaining = Math.floor(remaining / 10);
    }
    
    setColumns(newColumns);
  }, [value]);

  const handleColumnChange = (columnIndex: number, columnValue: number) => {
    const newColumns = [...columns];
    newColumns[columnIndex] = columnValue;
    
    // Calculate new total value
    const newValue = newColumns.reduce((sum, digit, index) => 
      sum + digit * Math.pow(10, index), 0);
    
    onChange(newValue);
  };

  return (
    <div className="flex flex-col-reverse gap-6 items-center">
      {columns.map((columnValue, index) => (
        <AbacusColumn
          key={index}
          value={columnValue}
          onChange={(value) => handleColumnChange(index, value)}
          multiplier={Math.pow(10, index)}
        />
      ))}
    </div>
  );
}