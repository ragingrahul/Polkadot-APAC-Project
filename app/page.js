"use client";

import Onboarding_1 from "./components/Onboarding/Onboarding_1";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Onboarding_1 />
      </Provider>
    </>
  );
}
