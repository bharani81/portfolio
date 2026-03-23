import { useState, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@context/ThemeContext';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { LoadingScreen } from '@components/LoadingScreen';
import { Navbar } from '@components/Navbar';
import { ScrollProgress } from '@components/ScrollProgress';
import { Hero } from '@sections/Hero';
import { About } from '@sections/About';
import { Experience } from '@sections/Experience';
import { Projects } from '@sections/Projects';
import { Skills } from '@sections/Skills';
import { ProofOfWork } from '@sections/ProofOfWork';
import { Contact } from '@sections/Contact';
import { SystemSimulator } from '@features/SystemSimulator';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Main content (hidden during loading) */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <ScrollProgress />
        <Navbar />

        <main>
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>

          <ErrorBoundary>
            <About />
          </ErrorBoundary>

          <ErrorBoundary>
            <Experience />
          </ErrorBoundary>

          <ErrorBoundary>
            <Projects />
          </ErrorBoundary>

          <ErrorBoundary>
            <Skills />
          </ErrorBoundary>

          <ErrorBoundary>
            <ProofOfWork />
          </ErrorBoundary>

          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </main>

        {/* Signature feature: floating system simulator terminal */}
        <SystemSimulator />

        {/* Vercel Analytics */}
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;
