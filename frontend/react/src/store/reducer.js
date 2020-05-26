const defaultState = {
  settingsSetted: false,
  settings: {} 
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        ...state,
        settingsSetted: true,
        settings: action.payload,
      };
    default:
      return state;
  }
};
