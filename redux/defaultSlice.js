import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polkadotAddress: null,
  evmAddress: null,
  onBoardingStep: 0,
  web3auth:null,
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
    initiateOnboarding: (state) => {
      state.onBoardingStep = 1;
    },
    previousOnboardingStep: (state) => {
      if (state.onBoardingStep > 1)
        state.onBoardingStep = state.onBoardingStep - 1;
    },
    nextOnboardingStep: (state) => {
      if (state.onBoardingStep < 3)
        state.onBoardingStep = state.onBoardingStep + 1;
    },
    setWeb3Auth:(state,action)=>{
      state.web3auth=action.payload;
    }
  },
});

export const {
  setPolkadotAddress,
  setEvmAddress,
  setWeb3Auth,
  initiateOnboarding,
  previousOnboardingStep,
  nextOnboardingStep,
} = defaultSlice.actions;
