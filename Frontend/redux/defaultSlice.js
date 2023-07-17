import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polkadotAddress: "5DkBir9sdbYgxpbUQ2PpPgtQpCznzQy32QpvNWkkKfFqe78S",
  evmAddress: "0xef7bcb9acb294da0eded2d28f7edcbafd81fb0e2",
  selectedAddress: null,
  onBoardingStep: 0,
  currentTab: "feed",
  web3Auth: null,
  provider: null,
};

export const defaultSlice = createSlice({
  name: "default",
  initialState,
  reducers: {
    setPolkadotAddress: (state, action) => {
      state.polkadotAddress = action.payload;
    },
    setEvmAddress: (state, action) => {
      state.evmAddress = action.payload;
    },
    setWeb3Auth: (state, action) => {
      state.web3Auth = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    initiateOnboarding: (state) => {
      state.onBoardingStep = 1;
    },
    previousOnboardingStep: (state) => {
      if (state.onBoardingStep > 0)
        state.onBoardingStep = state.onBoardingStep - 1;
    },
    nextOnboardingStep: (state) => {
      if (state.onBoardingStep < 4)
        state.onBoardingStep = state.onBoardingStep + 1;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    initiateLoggedIn: (state) => {
      state.onBoardingStep = 2;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const {
  setPolkadotAddress,
  setEvmAddress,
  setWeb3Auth,
  setProvider,
  initiateOnboarding,
  previousOnboardingStep,
  nextOnboardingStep,
  setCurrentTab,
  initiateLoggedIn,
  setSelectedAddress,
} = defaultSlice.actions;
