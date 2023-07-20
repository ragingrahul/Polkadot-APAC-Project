import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  posts: [],
  thoughts: [],
  postById: {},
  thoughtById: {},
  selectedUser: [],
  loggedInUser: [],
  loading: false,
  error: null,
};

//Fetch user data
export const fetchUser = createAsyncThunk("data/fetchUser", async (address) => {
  try {
    const res = await axios.get(
      `https://dotcombackend.me/api/user/evm/${address}`
    );
    return res.data;
  } catch {
    console.log(error);
    throw Error(error);
  }
});

//
export const fetchLoggedInUser = createAsyncThunk(
  "data/fetchLoggedInUser",
  async (address) => {
    try {
      const res = await axios.get(
        `https://dotcombackend.me/api/user/evm/${address}`
      );
      return res.data;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

//Fetch all data
export const fetchAlldata = createAsyncThunk("data/fetchAlldata", async () => {
  try {
    const posts = await axios.get("https://dotcombackend.me/api/post/web3/all");
    const web2post = await axios.get("https://dotcombackend.me/api/post/all");
    var uriJson = [];
    console.log(posts.data[0]);
    await Promise.all(
      posts.data.map(async (post) => {
        const uri = await axios.get(`https://` + post);
        uriJson.push(uri.data);
      })
    );
    const thoughts = await axios.get(
      "https://dotcombackend.me/api/thought/all"
    );
    const res = web2post.data.concat(uriJson.concat(thoughts.data));
    return res;
  } catch {
    console.log(error);
    throw Error(error);
  }
});

//Fetch all user data
export const fetchAllUserData = createAsyncThunk(
  "data/fetchAllUserData",
  async (address) => {
    try {
      const posts = await axios.get(
        `https://dotcombackend.me/api/post/user/${address}`
      );
      const thoughts = await axios.get(
        `https://dotcombackend.me/api/thought/user/${address}`
      );
      const res = posts.data.concat(thoughts.data);
      return res;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

//Fetch all posts
export const fetchAllPosts = createAsyncThunk(
  "data/fetchAllPosts",
  async () => {
    try {
      const res = await axios.get("https://dotcombackend.me/api/post/all");
      return res.data;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

//Fetch all thoughts
export const fetchAllThoughts = createAsyncThunk(
  "data/fetchAllThoughts",
  async () => {
    try {
      const res = await axios.get("https://dotcombackend.me/api/thought/all");
      return res.data;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

//Fetch post by id
export const fetchPostById = createAsyncThunk(
  "data/fetchPostById",
  async (id) => {
    try {
      const res = await axios.get(`https://dotcombackend.me/api/post/${id}`);
      return res.data;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

//Fetch thought by id
export const fetchThoughtById = createAsyncThunk(
  "data/fetchThoughtById",
  async (id) => {
    try {
      const res = await axios.get(`https://dotcombackend.me/api/thought/${id}`);
      return res.data;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

//Fetch posts by address
export const fetchPostsByAddress = createAsyncThunk(
  "data/fetchPostsByAddress",
  async (address) => {
    try {
      const res = await axios.get(
        `https://dotcombackend.me/api/post/${address}`
      );
      return res.data;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

//Fetch thoughts by address
export const fetchThoughtsByAddress = createAsyncThunk(
  "data/fetchThoughtsByAddress",
  async (address) => {
    try {
      const res = await axios.get(
        `https://dotcombackend.me/api/thought/${address}`
      );
      return res.data;
    } catch {
      console.log(error);
      throw Error(error);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAlldata.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlldata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlldata.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAllUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAllThoughts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllThoughts.fulfilled, (state, action) => {
        state.thoughts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllThoughts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postById = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchThoughtById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThoughtById.fulfilled, (state, action) => {
        state.thoughtById = action.payload;
        state.loading = false;
      })
      .addCase(fetchThoughtById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchPostsByAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsByAddress.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsByAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchThoughtsByAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThoughtsByAddress.fulfilled, (state, action) => {
        state.thoughts = action.payload;
        state.loading = false;
      })
      .addCase(fetchThoughtsByAddress.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      }),
});

export default dataSlice.reducer;
