import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AbacusColumnProps {
  value: number;
  onChange: (value: number) => void;
  multiplier: number;
}

interface Bead {
  value: number;
  active: boolean;
}

export function AbacusColumn({ value, onChange, multiplier }: AbacusColumnProps) {
  const [beads, setBeads] = useState<Bead[]>([
    { value: 5, active: false },
    { value: 1, active: false },
    { value: 1, active: false },
    { value: 1, active: false },
    { value: 1, active: false },
  ]);

  useEffect(() => {
    const newBeads = [...beads];
    let remaining = value;

    // Reset all beads
    newBeads.forEach(bead => bead.active = false);

    // Set heaven bead (5)
    if (remaining >= 5) {
      newBeads[0].active = true;
      remaining -= 5;
    }

    // Set earth beads (1s)
    for (let i = 1; i <= remaining && i < newBeads.length; i++) {
      newBeads[i].active = true;
    }

    setBeads(newBeads);
  }, [value]);

  const handleBeadClick = (index: number) => {
    const newBeads = [...beads];
    const bead = newBeads[index];
    
    if (index === 0) { // Heaven bead
      bead.active = !bead.active;
    } else { // Earth beads
      if (!bead.active) {
        // Activate this bead and all beads below it
        for (let i = newBeads.length - 1; i >= index; i--) {
          newBeads[i].active = false;
        }
        for (let i = 1; i <= index; i++) {
          newBeads[i].active = true;
        }
      } else {
        // Deactivate this bead and all beads above it
        for (let i = 1; i <= index; i++) {
          newBeads[i].active = false;
        }
      }
    }

    setBeads(newBeads);
    
    // Calculate new value
    const newValue = newBeads.reduce((sum, bead) => 
      sum + (bead.active ? bead.value : 0), 0);
    onChange(newValue);
  };

  return (
    <div className="flex items-center h-16">
      {/* Horizontal rod */}
      <div className="h-0.5 w-[120px] bg-amber-300 relative">
        {/* Separator beam */}
        <div className="absolute left-1/4 top-1/2 h-16 w-1.5 bg-amber-300 -translate-y-1/2" />
        
        {/* Beads */}
        {beads.map((bead, index) => (
          <button
            key={index}
            onClick={() => handleBeadClick(index)}
            className={cn(
              "absolute top-1/2 h-12 w-12 rounded-full -translate-y-1/2 transition-all duration-300 cursor-pointer",
              "hover:scale-105 active:scale-95",
              index === 0
                ? "bg-amber-600 left-[15%]" // Heaven bead
                : "bg-amber-400", // Earth beads
              bead.active
                ? index === 0
                  ? "translate-x-8" // Heaven bead moves right
                  : "-translate-x-8" // Earth beads move left
                : "",
              // Position earth beads
              index === 1 && "left-[40%]",
              index === 2 && "left-[55%]",
              index === 3 && "left-[70%]",
              index === 4 && "left-[85%]",
            )}
          />
        ))}
      </div>
    </div>
  );
}