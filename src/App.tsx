import React from "react";
import "./App.css";
import { QuickFilter } from "./QuickFilter";
import  DataTable  from "./DataTable";

function App() {
  return (
    <div className="App">
      <QuickFilter />
      <DataTable />
    </div>
  );
}

export default App;
