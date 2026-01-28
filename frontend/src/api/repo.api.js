import api from "./axios";

export const getRepos = async () => {
  const res = await api.get("/repos/my");
  return res.data;
};

export const createRepo = async (name, description) => {
  const res = await api.post("/repos/create", { name, description });
  return res.data;
};

export const getRepo = async (repoId) => {
  const res = await api.get(`/repos/${repoId}`);
  return res.data;
};