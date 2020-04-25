export interface Settings {
  repoName: string,
  buildCommand: string,
  mainBranch: string,
  period: number,
}

export interface buildPage {
  buildCard: any,
  buildCardLoaded: boolean,
  buildLog: string,
  buildLogLoaded: boolean,
}

export interface State {
  settingsSetted: boolean,
  isLoaded: boolean,
  settings: Settings,
  activeBuild: buildPage,
  formButtonsDisabled: boolean,
}

export const defaultState: State = {
  settingsSetted: false,
  isLoaded: false,
  settings: {
    repoName: '',
    buildCommand: '',
    mainBranch: '',
    period: 10
  },
  activeBuild: {
    buildCard: {},
    buildCardLoaded: false,
    buildLog: '',
    buildLogLoaded: false,
  },
  formButtonsDisabled: false,
};