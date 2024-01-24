import axios from "axios";
import baseurl from "../Config";
import { toast } from "react-toastify";
import getHolidaysReducer from "./reducer/GetHolidaysReducer";

const {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [marksData, setMarksData] = useState([]);
  const [instructorStudents, setInstructorStudents] = useState(null);
  const [loader, setLoader] = useState(true);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const getStudentData = (auth) => {
    fetch(`${baseurl}/api/students/${auth}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        sessionStorage.setItem("user", JSON.stringify(result));
        // setStudent(result);
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMarksData = () => {
    fetch(`${baseurl}/api/marks/${currentUser._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setMarksData(result);
        setLoader(false);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [imageUploads, setImageUploads] = useState({});

  const UploadImage = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(baseurl + "/api/uploadfile/", {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.info("uploaded Image Success");
          res.json().then((data) => {
            console.log(data);
            const value = { [e.target.name]: data.fileName };
            setImageUploads({ ...imageUploads, ...value });
            console.log(imageUploads);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetInstructorStudents = async (instructorId) => {
    try {
      const response = await axios.get(
        baseurl + `/api/course/students/${instructorId}`
      );
      if (response.status === 200) {
        setInstructorStudents(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Holiday Creation
  const [HolidaysList, dispatch] = useReducer(getHolidaysReducer, {
    loading: false,
    data: null,
    error: false,
  });

  const GetAllholidays = async () => {
    dispatch({ type: "LOADING" });

    try {
      const res = await fetch(baseurl + "/api/holiday/get", { method: "GET" });

      if (res.status === 200) {
        const data = await res.json();
        dispatch({ type: "SUCCESS", payload: data.data });
      } else {
        dispatch({ type: "ERROR" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ERROR" });
    }
  };

  const CreateHoliday = async (formdata) => {
    try {
      const response = await toast.promise(
        axios.post(baseurl + "/api/holiday/create", formdata),
        {
          pending: "creating Holiday",
          success: "created Successfully👌",
          error: "Failed to create 🤯",
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        GetAllholidays();
        toast.success("Created Holiday successfully ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        getStudentData,
        getMarksData,
        marksData,
        setMarksData,
        loader,
        setLoader,
        imageUploads,
        UploadImage,
        setImageUploads,
        GetInstructorStudents,
        instructorStudents,
        GetAllholidays,
        HolidaysList,
        CreateHoliday,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
