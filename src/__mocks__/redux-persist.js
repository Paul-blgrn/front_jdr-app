export const persistReducer = jest.fn().mockImplementation((config, reducer) => {
  return (state, action) => {
    const persistedState = mockedStorage[config.key];
    const initialState = persistedState ? JSON.parse(persistedState) : state;
    return reducer(initialState || {}, action);
  };
});
export const persistStore = jest.fn();
export const getStoredState = jest.fn();
export const createTransform = jest.fn();
export const storage = {
  getItem: jest.fn((key) => mockedStorage[key] || null),
  setItem: jest.fn((key, value) => {
    mockedStorage[key] = value;
  }),
  removeItem: jest.fn((key) => {
    delete mockedStorage[key];
  }),
};

const mockedStorage = {
  'persist:user': JSON.stringify({ user: { isLoggedIn: false } }),
};