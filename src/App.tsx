import { useEffect, useState } from 'react';
import alLogo from './assets/al-logo.png';
import { Button } from '@/components/ui/button';
import { SystemInfoComponent } from './features/system/components/system-info';

function App() {
  // the types looks crazy, but it's pretty straight forward
  // Awaited<T> is a utility type that unwraps a promise type
  // ReturnType<T> is a utility type that extracts the return type of a function
  const [systemInfo, setSystemInfo] = useState<Awaited<
    ReturnType<typeof window.ipcRenderer.system.getInfo>
  > | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.ipcRenderer.system.getInfo().then(setSystemInfo);
  }, []);

  return (
    <main className='container p-4 '>
      <div className='flex flex-col items-center justify-center'>
        <img
          src={alLogo}
          alt='react logo'
          className='h-24 hover:animate-spin'
        />

        <h1 className='text-xl font-bold text-center'>
          Electron + Vite + React + TailwindCSS + ShadCN + TypeScript
        </h1>
        <p className='text-center'>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p className='text-center'>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </Button>
        </p>

        <SystemInfoComponent systemInfo={systemInfo} className='mt-4' />
      </div>
    </main>
  );
}

export default App;
