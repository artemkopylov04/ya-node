const https = require('https');
const axios = require('axios');

interface Settings {
  repoName: string,
  buildCommand: string,
  mainBranch: string,
  period: number,
}

const {
  REPO_URL, API_URL, REPO_PORT, TOKEN,
} = process.env;

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const authHeader = {
  Authorization: `Bearer ${TOKEN}`,
};

const getSettings = () => instance({
  method: 'get',
  url: `${API_URL}/conf`,
  headers: authHeader,
});

const getBuilds = ({ limit = 10, offset = 0 }) => instance({
  method: 'get',
  url: `${API_URL}/build/list?limit=${limit}&offset=${offset}`,
  headers: authHeader,
});

const getBuild = ({ buildId }: { buildId?: string }) => instance({
  method: 'get',
  url: `${API_URL}/build/details?buildId=${buildId}`,
  headers: authHeader,
});

const getBuildLog = ({ buildId }: { buildId?: string }) => instance({
  method: 'get',
  url: `${API_URL}/build/log?buildId=${buildId}`,
  headers: authHeader,
});

const postHash = ({ commitHash }: { commitHash?: string }) => instance({
  method: 'post',
  url: `${REPO_URL}:${REPO_PORT}/add`,
  data: {
    commitHash,
  },
});

const postSettings = ({
  repoName, buildCommand, mainBranch, period,
}: Settings) => instance({
  method: 'post',
  url: `${API_URL}/conf`,
  data: {
    repoName: repoName || 'default',
    buildCommand: buildCommand || 'default',
    mainBranch: mainBranch || 'master',
    period: period || 0,
  },
  headers: authHeader,
});

const postRepository = ({
  repoName, mainBranch,
}: { repoName: string, mainBranch: string }) => instance({
  method: 'post',
  url: `${REPO_URL}:${REPO_PORT}/clone`,
  data: {
    repoName,
    mainBranch,
  },
});

const postRequest = (
  commitHash: string, {
     message, 
     branch,
     author 
    }: { message: string, branch: string, author: string }) => instance({
  method: 'post',
  url: `${API_URL}/build/request`,
  data: {
    commitHash,
    commitMessage: message,
    branchName: branch,
    authorName: author,
  },
  headers: authHeader,
});

const postRequestStart = ({ id }: { id: string }) => instance({
  method: 'post',
  url: `${API_URL}/build/start`,
  data: {
    buildId: id,
    dateTime: new Date().toISOString(),
  },
  headers: authHeader,
});

const postRequestFinish = ({ id }: { id: string }, duration: number) => instance({
  method: 'post',
  url: `${process.env.API_URL}/build/finish`,
  data: {
    buildId: id,
    success: true,
    duration,
    buildLog: Math.random().toString(36),
  },
  headers: authHeader,
});

const deleteSettings = () => instance({
  method: 'delete',
  url: `${API_URL}/conf`,
  headers: authHeader,
});

const existsRepository = (GIT_URL: string, repoName: string) => instance({
  method: 'get',
  url: `${GIT_URL}/${repoName}`,
});

export {
  getSettings,
  getBuilds,
  getBuild,
  getBuildLog,
  deleteSettings,
  postSettings,
  postRepository,
  postHash,
  postRequest,
  postRequestStart,
  postRequestFinish,
  existsRepository,
};
