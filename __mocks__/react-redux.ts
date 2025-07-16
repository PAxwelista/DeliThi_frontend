export const useDispatch = jest.fn(() => jest.fn());
export const useSelector = jest.fn((selectorFn) =>
  selectorFn({
    login: {
      username: "Axel",
      token: "12345",
      role : "admin",
    },
  })
);