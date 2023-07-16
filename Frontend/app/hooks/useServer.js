import axios from "axios";
import React from "react";

export default function useServer() {
  const getFeed = async () => {
    try {
      const posts = await axios.get("http://64.227.154.19:5000/api/post/all");
      const thoughts = await axios.get(
        "http://64.227.154.19:5000/api/thought/all"
      );
      const res = posts.data.concat(thoughts.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return [getFeed];
}
