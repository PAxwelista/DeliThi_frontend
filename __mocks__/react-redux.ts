export const useDispatch = jest.fn(() => jest.fn());
export const useSelector = jest.fn((selectorFn) =>
  selectorFn({
    login: {
      username: "Axel",
      groupId: "12345",
      role : "admin",
    },
  })
);