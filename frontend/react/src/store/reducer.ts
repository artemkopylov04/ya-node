import { defaultState, State } from './state';
import { Action } from './actions';

export const rootReducer = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case "SET_APP_LOADED":
      return {
        ...state,
        isLoaded: true,
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settingsSetted: true,
        settings: action.payload,
      };
    case "SET_FORM_BUTTONS_TO_STATUS":
      return {
        ...state,
        formButtonsDisabled: action.payload,
      };
    case "SET_ACTIVE_BUILD":
      return {
        ...state,
        activeBuild: {
          ...state.activeBuild,
          buildCard: action.payload,
        }
      };
    case "SET_BUILD_LOADING":
      return {
        ...state,
        activeBuild: {
          ...state.activeBuild,
          buildCardLoaded: action.payload,
        }
      };
    case "SET_ACTIVE_LOG":
      return {
        ...state,
        activeBuild: {
          ...state.activeBuild,
          buildLog: action.payload,
        }
      };
    case "SET_LOG_LOADING":
      return {
        ...state,
        activeBuild: {
          ...state.activeBuild,
          buildLogLoaded: action.payload,
        }
      };
    default:
      return state;
  }
};