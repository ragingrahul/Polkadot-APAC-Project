import axios from "axios";

export const getProfile = async (evmAddress) => {
  const res = await axios.get(
    `https://dotcombackend.me/api/user/evm/${evmAddress}`
  );
  return res.data;
};
