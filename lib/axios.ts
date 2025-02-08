"use client";

import axios from "axios";

export const Axiosinstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
