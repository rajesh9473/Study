const GetStudentWithCourseReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        students: null,
        courseWithStudent: null,
        error: false,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        students: action.payload[0].student,
        courseWithStudent: action.payload,
        error: false,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        students: null,
        courseWithStudent: null,
        error: true,
      };
    default:
      return state;
  }
};

export default GetStudentWithCourseReducer;
