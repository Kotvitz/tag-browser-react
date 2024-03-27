import React from "react";
import TagBrowser from "./components/TagBrowser";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TagBrowser />
      </div>
    </Provider>
  );
}

export default App;
