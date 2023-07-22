import axios from "axios";

export const getProfile = async (evmAddress) => {
  const res = await axios.get(
    `https://dotcombackend.me/api/user/evm/${evmAddress}`
  );
  return res.data;
};

export const getPost = async (ipfsLink) => {
  const res = await axios.get(ipfsLink);
  return res.data;
};

export const login = async (address, evmAddress, sign) => {
  const res = await axios.post("https://dotcombackend.me/api/auth", {
    sign: sign,
    address: address,
    evmAddress: evmAddress,
  });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
};

export const checkLogin = async (address) => {
  const header = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.post(
    "https://dotcombackend.me/api/auth/check",
    {
      address: address,
    },
    header
  );
  return res.data;
};

export const postThought = async (address, evmAddress, content, type) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.post(
    "https://dotcombackend.me/api/thought",
    {
      address: address,
      evmAddress,
      content,
      type,
    },
    header
  );
  return res.data;
};

export const postPost = async (address, evmAddress, title, cover, content) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.post(
    "https://dotcombackend.me/api/post",
    {
      address: address,
      evmAddress,
      title,
      cover,
      content,
      type: "post",
      web: "2",
      chain: "polkadot",
    },
    header
  );
  return res.data;
};

export const likeThought = async (address, id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.put(
    `https://dotcombackend.me/api/thought/like/${id}`,
    { address: address },
    header
  );
  return res.data;
};

export const likePost = async (address, id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.put(
    `https://dotcombackend.me/api/post/like/${id}`,
    { address: address },
    header
  );
  return res.data;
};

export const followUser = async (address, id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.post(
    `https://dotcombackend.me/api/user/evm/${id}/follow`,
    { address: address },
    header
  );
  return res.data;
};

export const unfollowUser = async (address, id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.post(
    `https://dotcombackend.me/api/user/evm/${id}/unfollow`,
    { address: address },
    header
  );
  return res.data;
};

export const getFollowing = async (evmAddress) => {
  const res = await axios.get(
    `https://dotcombackend.me/api/user/evm/${evmAddress}/following`
  );
  return res.data;
};

export const getViews = async (evmAddress) => {
  const res = await axios.get(
    `https://dotcombackend.me/api/user/evm/${evmAddress}/views`
  );
  return res.data;
};

export const getFollowers = async (evmAddress) => {
  const res = await axios.get(
    `https://dotcombackend.me/api/user/evm/${evmAddress}/followers`
  );
  return res.data;
};
