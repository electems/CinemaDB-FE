import React, { Suspense, useState } from 'react';
import './lazy.css';
import { ErrorBoundary } from 'react-error-boundary'
import fallbackRender from './ErrorBoundry';
const ComponentA = React.lazy(() => import('./ComponentA'));
const ComponentB = React.lazy(() => import('./ComponentB'));

const LazyLoad: React.FC = () => {
  const [showComponentA, setShowComponentA] = useState(false);
  const [showComponentB, setShowComponentB] = useState(false);

  return (
    <div className="App">
      <h1>Lazy Loading Example</h1>
      <button onClick={() => setShowComponentA(!showComponentA)}>
        Toggle Component A
      </button>
      <button onClick={() => setShowComponentB(!showComponentB)}>
        Toggle Component B
      </button>

        <Suspense
          fallback={
            <div>
              <h1>Loading...</h1>
            </div>
          }
        >
        <ErrorBoundary FallbackComponent={fallbackRender} >
          {showComponentA && <ComponentA />}
          </ErrorBoundary>
          {showComponentB && <ComponentB />}
        </Suspense>

    </div>
  );
};

export default LazyLoad;
