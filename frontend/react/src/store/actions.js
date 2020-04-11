import axios from 'axios';

export const setSettings = (settings) => ({
    type: "SET_SETTINGS",
    payload: settings
});

export const getSettings = () => {
  return () => axios.get('/api/settings');
}

export const setNewSettings = (settings) => {
  return () => axios({
    method: 'POST',
    url: '/api/settings',
    data: {
      repoName: settings.repoName,
      buildCommand: settings.buildCommand,
      mainBranch: settings.mainBranch,
      period: parseInt(settings.period, 10),
    },
  });
}

export const runBuild = (hash) => {
  return () => axios.post(`/api/builds/${hash}`);
}

export const getBuilds = (offset) => {
  return () => axios.get(`/api/builds?limit=10&offset=${offset}`)
}

export const getLog = (id) => {
  return () => axios.get(`/api/builds/${id}/logs`)
}

export const getBuild = (id) => {
  return () => axios.get(`/api/builds/${id}`)
}

export const reBuild = (commitHash) => {
    return () => axios.post(`/api/builds/${commitHash}`,)
}

