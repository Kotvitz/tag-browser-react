import React from "react";
import { TagBrowser } from "./TagBrowser";
import { Provider } from "react-redux";
import { store } from "../store";

export default {
  title: "Components/TagBrowser",
  component: TagBrowser,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export const Default = () => <TagBrowser />;
