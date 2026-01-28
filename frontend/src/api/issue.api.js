import api from "./axios";

export const createIssue = async (repoId, issueData) => {
  const response = await api.post(`/repos/${repoId}/issues`, issueData);

  return response.data;
};

export const getIssuesByRepo = async (repoId) => {
  const response = await api.get(`/repos/${repoId}/issues`);

  return response.data;
};

export const getIssueById = async (repoId, issueId) => {
  const response = await api.get(`/repos/${repoId}/issues/${issueId}`);

  return response.data;
};

export const updateIssue = async (repoId, issueId, updates) => {
  const response = await api.put(`/repos/${repoId}/issues/${issueId}`, updates);

  return response.data;
};

export const deleteIssue = async (repoId, issueId) => {
  const response = await api.delete(`/repos/${repoId}/issues/${issueId}`);

  return response.data;
};
