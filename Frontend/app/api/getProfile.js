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

export const login = async (evmAddress, sign) => {
  const res = await axios.post("https://dotcombackend.me/api/auth", {
    evmAddress,
    sign,
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

export const postThought = async (evmAddress, content, type) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.post(
    "https://dotcombackend.me/api/thought",
    {
      evmAddress,
      content,
      type,
    },
    header
  );
  return res.data;
};

export const postPost = async (evmAddress, title, cover, content) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.post(
    "https://dotcombackend.me/api/post",
    {
      evmAddress,
      title,
      cover,
      content,
      type: "post",
      web: "3",
      chain: "polkadot",
    },
    header
  );
  return res.data;
};

export const likeThought = async (id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.put(
    `https://dotcombackend.me/api/thought/like/${id}`,
    {},
    header
  );
  return res.data;
};

export const likePost = async (id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.put(
    `https://dotcombackend.me/api/post/like/${id}`,
    {},
    header
  );
  return res.data;
};

export const followUser = async (id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.put(
    `https://dotcombackend.me/api/user/evm/${id}/follow`,
    {},
    header
  );
  return res.data;
};

export const unfollowUser = async (id) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.put(
    `https://dotcombackend.me/api/user/evm/${id}/unfollow`,
    {},
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
