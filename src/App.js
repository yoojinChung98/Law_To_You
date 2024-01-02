import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import RouterIndex from './router';
import { store } from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
export let persistor = persistStore(store);

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <Suspense fallback={<></>}>
            <RouterIndex />
          </Suspense>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
