import { Build } from "../typings";

export interface Settings {
  repoName: string,
  buildCommand: string,
  mainBranch: string,
  period: number,
}

export interface buildPage {
  buildCard: Build,
  buildCardLoaded: boolean,
  buildLog: string,
  buildLogLoaded: boolean,
}

export interface State {
  lang: string,
  settingsSetted: boolean,
  isLoaded: boolean,
  settings: Settings,
  activeBuild: buildPage,
  formButtonsDisabled: boolean,
}

export const defaultState: State = {
  lang: localStorage.getItem('lang') || 'none',
  settingsSetted: false,
  isLoaded: false,
  settings: {
    repoName: '',
    buildCommand: '',
    mainBranch: '',
    period: 10
  },
  activeBuild: {
    buildCard: {
      id: '',
      buildNumber: '',
      commitMessage: '',
      branchName: '',
      commitHash: '',
      authorName: '',
      start: ''
    },
    buildCardLoaded: false,
    buildLog: '',
    buildLogLoaded: false,
  },
  formButtonsDisabled: false,
};