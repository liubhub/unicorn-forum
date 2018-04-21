import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./CategoryProvider";
import Table from "./CategoryTable";

const App = () => (
  <DataProvider endpoint="api/category/" render={data => <Table data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;