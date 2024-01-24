import axios from "axios";
import baseurl from "../Config";
import { toast } from "react-toastify";
import GetStudentWithCourseReducer from "./reducer/GetStudentWithCourseReducer";
import GetAllCourses from "./reducer/GetAllCourses";

const { createContext, useContext, useReducer } = require("react");

const CreateCertificate = createContext();

const CertificateProvider = ({ children }) => {
  const [courseInfo, dispatchCourseInfo] = useReducer(
    GetStudentWithCourseReducer,
    {
      loading: true,
      students: null,
      courseWithStudent: null,
      error: false,
    }
  );
  const GetStudentList = async (id) => {
    try {
      dispatchCourseInfo({ type: "LOADING" });
      const response = await toast.promise(
        axios.get(baseurl + `/api/course-students/${id}`),
        {
          pending: "wait fetching student",
        }
      );
      if (response.status == 200) {
        dispatchCourseInfo({ type: "SUCCESS", payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
      dispatchCourseInfo({ type: "ERROR" });
    }
  };

  const [course, dispatchCourse] = useReducer(GetAllCourses, {
    loading: false,
    error: false,
    data: null,
  });

  const GetCourses = async () => {
    dispatchCourse({ type: "LOADING" });
    try {
      const response = await axios.get(baseurl + "/api/course");
      if (response.status === 200) {
        dispatchCourse({ type: "SUCCESS", payload: response.data });
      }
    } catch (error) {
      console.log(error);
      dispatchCourse({ type: "ERROR" });
    }
  };

  return (
    <CreateCertificate.Provider
      value={{ courseInfo, GetStudentList, GetCourses, course }}
    >
      {children}
    </CreateCertificate.Provider>
  );
};

export const useCertificate = () => {
  return useContext(CreateCertificate);
};

export default CertificateProvider;
