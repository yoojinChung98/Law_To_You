import React, { Suspense } from "react";
import "./App.css";
import RouterIndex from "./router";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<></>}>
        <RouterIndex />
      </Suspense>
    </div>
  );
}

export default App;
