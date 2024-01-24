const GetAllCourses = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        data: null,
        error: false,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        data: null,
        error: true,
      };
    default:
      return state;
  }
};

export default GetAllCourses;
