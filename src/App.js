import React from "react";
import Header from "./component/Layout/Header";
import CreateData from "./component/CreateData/CreateData";
import CreateInput from "./Pages/CreateInput";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <CreateInput />
        <CreateData />
      </main>
    </>
  );
};

export default App;
