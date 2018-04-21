import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./Category/CategoryProvider";
import Table from "./Category/CategoryTable";

const App = () => (
  <DataProvider endpoint="api/category/" render={data => <Table data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;