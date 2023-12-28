import React, { Suspense } from 'react';
import './App.css';
import RouterIndex from './router';
import { Provider } from 'react-redux';
import { store } from './store/index';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Suspense fallback={<></>}>
          <RouterIndex />
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
