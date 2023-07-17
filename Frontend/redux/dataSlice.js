import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  posts: [],
  thoughts: [],
  postById: {},
  thoughtById: {},
  loading: false,
  error: null,
};

//Fetch all data
export const fetchAlldata = createAsyncThunk("data/fetchAlldata", async () => {
  try {
    const posts = await axios.get("//64.227.154.19:5000/api/post/all");
    const thoughts = await axios.get("//64.227.154.19:5000/api/thought/all");
    const res = posts.data.concat(thoughts.data);
    return res;
  } catch {
    console.log(error);
    throw Error(error);
  }
});

//Fetch all posts
export const fetchAllPosts = createAsyncThunk(
  "data/fetchAllPosts",
  async () => {
    try {
      const res = await axios.get("//64.227.154.19:5000/api/post/all");
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
      const res = await axios.get("//64.227.154.19:5000/api/thought/all");
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
      const res = await axios.get(`//64.227.154.19:5000/api/post/${id}`);
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
      const res = await axios.get(`//64.227.154.19:5000/api/thought/${id}`);
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
      const res = await axios.get(`//64.227.154.19:5000/api/post/${address}`);
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
        `//64.227.154.19:5000/api/thought/${address}`
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
