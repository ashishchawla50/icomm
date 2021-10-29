import React from "react";
import "./App.css";
import { QuickFilter } from "./QuickFilter";
import DataTable from "./DataTable";
import { Filter } from "./Filter";

function App() {
  const [messageData, setMessageData] = React.useState<any>();
  const handleFilteredData = (messageData: any) => {
    console.log("in app", messageData);
    setMessageData(messageData);
  };
  return (
    <div className="App">
      {/* <QuickFilter handleFilteredData={handleFilteredData} /> */}
      <Filter handleFilteredData={handleFilteredData} />
      <DataTable messageData={messageData} />
    </div>
  );
}

export default App;
