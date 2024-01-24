import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuthContext } from "../../context/useStateContext";

const ModalAddHoliday = ({ open, handleOpen, updateEventsData }) => {
  const { CreateHoliday } = useAuthContext();
  const [formData, setFormData] = useState({});
  const [Dates, setDates] = useState({});
  const HandleFormData = (name, value, text) => {
    if (text.toLowerCase() === "date") {
      setDates({ ...Dates, [name]: value });
      setFormData({ ...formData, [name]: new Date(value).toISOString() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (formData) => {
    await CreateHoliday(formData);
    handleOpen();
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Add Holiday
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* event */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="event"
                >
                  Hoilday Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="event"
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    HandleFormData(e.target.name, e.target.value, "name")
                  }
                  placeholder="Holi"
                />
              </div>
              {/* from */}
              <div className="w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="from"
                >
                  From
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="from"
                  name="from"
                  value={Dates.from || ""}
                  onChange={(e) =>
                    HandleFormData(e.target.name, e.target.value, "date")
                  }
                  type="date"
                />
              </div>
              {/* to */}
              <div className="w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="from"
                >
                  To
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="from"
                  name="to"
                  value={Dates.to || ""}
                  onChange={(e) =>
                    HandleFormData(e.target.name, e.target.value, "date")
                  }
                  type="date"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSubmit(formData)}
              className="p-2 bg-[var(--theme-color)] rounded-lg text-white hover:bg-[var(--secondary-color)] cursor-pointer transition-all"
            >
              Submit
            </button>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalAddHoliday;
