import React from "react";
import "./App.css";
// import { QuickFilter } from "./QuickFilter";
import { Filter } from "./Filter";
import DataTable from "./TableData";

function App() {
  const [messageData, setMessageData] = React.useState<any>();
  const [dataSource, setDataSource] = React.useState<any>();
  const [channelType, setChannelType] = React.useState<any>();
  const handleFilteredData = (
    messageData: any,
    dataSource: any,
    channelType: any
  ) => {
    //console.log(dataSource, channelType);
    setDataSource(dataSource);
    setChannelType(channelType);
    console.log("in app", messageData, dataSource, channelType);
    setMessageData(messageData);
  };
  return (
    <div className="App">
      {/* <QuickFilter handleFilteredData={handleFilteredData} /> */}
      <Filter handleFilteredData={handleFilteredData} />
      <DataTable
        messageData={messageData}
        dataSource={dataSource}
        channelType={channelType}
      />
    </div>
  );
}

export default App;
