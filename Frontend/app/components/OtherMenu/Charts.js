"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  fetchAllPosts,
  fetchAllThoughts,
  fetchAllWeb3Posts,
} from "@/redux/dataSlice";

const Charts = () => {
  const posts = useSelector((state) => state.data.posts);
  const web3Posts = useSelector((state) => state.data.web3Posts);
  const thoughts = useSelector((state) => state.data.thoughts);

  const dispatch = useDispatch();

  const data = [
    {
      name: "Thoughts",
      total: thoughts.length,
    },
    {
      name: "Posts",
      total: posts.length,
    },
    {
      name: "NFTs",
      total: web3Posts.length,
    },
  ];

  React.useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllWeb3Posts());
    dispatch(fetchAllThoughts());
  }, []);

  return (
    <div className="w-full bg-[color:var(--feed-foreground)] text-sm mb-3 p-7 text-zinc-400 rounded-2xl">
      <h1 className="text-white text-xl font-bold mx-3 mb-5">
        DotCom Content Saturation
      </h1>
      <ResponsiveContainer width="80%" height={250}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
