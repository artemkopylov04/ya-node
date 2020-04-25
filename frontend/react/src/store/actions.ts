import axios from 'axios';
import { Dispatch } from 'redux';
import { Settings } from './state';

export interface Action {
  type: string,
  payload: any,
}

export const setAppLoaded = () => ({
  type: "SET_APP_LOADED",
});

export const setSettings = (settings: Settings) => ({
  type: "SET_SETTINGS",
  payload: settings,
});

export const setActiveBuild = (build: any) => ({
  type: "SET_ACTIVE_BUILD",
  payload: build,
});

export const setBuildLoading = (status: boolean) => ({
  type: "SET_BUILD_LOADING",
  payload: status,
});

export const setActiveLog = (log: string) => ({
  type: "SET_ACTIVE_LOG",
  payload: log,
});

export const setLogLoading = (status: boolean) => ({
  type: "SET_LOG_LOADING",
  payload: status,
});

export const setFormButtonsToStatusDisabled = (status: boolean) => ({
  type: "SET_FORM_BUTTONS_TO_STATUS",
  payload: status,
});

export const getSettings = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get('/api/settings');
      const data = res.data.data.data;
      if (data) {
        dispatch(setSettings({
          repoName: data.repoName,
          buildCommand: data.buildCommand,
          mainBranch: data.mainBranch,
          period: data.period,
        }));
      }
      dispatch(setAppLoaded());
    } catch(e) {
      console.error(e);
    }
  }
}

export const setNewSettings = (settings: Settings) => {
  return () => axios({
    method: 'POST',
    url: '/api/settings',
    data: {
      repoName: settings.repoName,
      buildCommand: settings.buildCommand,
      mainBranch: settings.mainBranch,
      period: Number(settings.period),
    },
  });
}

export const runBuild = (hash: string) => {
  return () => axios.post(`/api/builds/${hash}`);
}

export const getBuilds = (offset: string | number) => {
  return () => axios.get(`/api/builds?limit=10&offset=${offset}`)
}

export const reBuild = (commitHash: string) => {
    return () => axios.post(`/api/builds/${commitHash}`)
}

export const getBuildDetails = (id: string | number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setBuildLoading(false));
      dispatch(setLogLoading(false));
      let build: any = axios.get(`/api/builds/${id}`)
      let log: any = axios.get(`/api/builds/${id}/logs`);
      build = await build;
      dispatch(setActiveBuild(build.data.data.data));
      dispatch(setBuildLoading(true));
      log = await log;
      dispatch(setActiveLog(log.data));
      dispatch(setLogLoading(true));
    } catch(e) {
      console.error(e);
    }
  }
}