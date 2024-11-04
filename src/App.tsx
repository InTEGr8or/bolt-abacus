import { useState } from 'react';
import { Abacus } from '@/components/abacus';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function App() {
  const [value, setValue] = useState(0);

  const handleReset = () => {
    setValue(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[800px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-950 mb-2">Soroban</h1>
          <p className="text-amber-800">Japanese Abacus</p>
        </div>
        
        <div className="bg-amber-900/90 p-6 rounded-xl shadow-xl overflow-x-auto">
          <div className="min-w-[600px]">
            <Abacus value={value} onChange={setValue} />
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-amber-50 text-xl font-mono">{value.toLocaleString()}</div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleReset}
                className="text-amber-50 hover:text-amber-200 hover:bg-amber-900/50"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}