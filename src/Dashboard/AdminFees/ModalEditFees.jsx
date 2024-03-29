import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
  Select,
  Option,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";

const ModalEditFees = ({ item, open, handleOpen, getFeesList }) => {
  const [studentsData, setStudentsData] = useState([]);
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [transId, setTransId] = useState("");
  const [paid, setPaid] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = () => {
    fetch(baseurl + "/api/students?limit=10000&page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setStudentsData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = { name, regno, amount, mode, transId, paid, date };

  //   Prefill Form Data
  useEffect(() => {
    setName(item.name);
    setRegno(item.regno);
    setAmount(item.amount);
    setMode(item.mode);
    setTransId(item.transId);
    setPaid(item.paid);
    setDate(item.date);
  }, [item]);

  const reg = item.regno;

  const onSubmitClick = () => {
    // Empty the fields
    setName("");
    setRegno("");
    setAmount("");
    setMode("");
    setTransId("");
    setPaid("");
    setDate("");

    // Post Api For Posting Data
    fetch(baseurl + "/api/fee/" + reg, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        toast.info("Fees Updated Successfully");
        handleOpen();
        getFeesList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudentName(regno);
  }, [regno]);

  const getStudentName = (id) => {
    studentsData?.map((student) => {
      if (student?.regno === id) {
        setName(student?.name);
      }
    });
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
          Edit Fees
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Reg No. */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="regno"
                >
                  Reg No.
                </label>
                <Select
                  id="regno"
                  label="Select Student"
                  // value={regno}
                  onChange={(value) => {
                    setRegno(value);
                  }}
                >
                  {studentsData?.map((student) => (
                    <Option value={student?.regno}>
                      {student?.regno} | {student?.name}
                    </Option>
                  ))}
                </Select>
              </div>
              {/* NAme */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="disabled:text-gray-500 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  value={name}
                  disabled
                />
              </div>
              {/* amount */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="amount"
                  type="number"
                  placeholder="15000"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              {/* mode */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Mode
                </label>
                <div className="flex flex-wrap gap-2">
                  <Radio
                    id="online"
                    name="type"
                    label="Online"
                    onChange={() => {
                      setMode("online");
                    }}
                  />
                  <Radio
                    id="offline"
                    name="type"
                    label="Offline"
                    onChange={() => {
                      setMode("offline");
                    }}
                  />
                </div>
              </div>
              {/* Transaction ID */}
              {mode === "online" ? (
                <div className="w-full px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="transId"
                  >
                    Transaction ID
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="transId"
                    type="text"
                    placeholder="7645"
                    value={transId}
                    onChange={(e) => {
                      setTransId(e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {/* Paid */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="paid"
                >
                  Paid
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="paid"
                  type="number"
                  placeholder="7645"
                  value={paid}
                  onChange={(e) => {
                    setPaid(e.target.value);
                  }}
                />
              </div>
              {/* Date */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
            </div>
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
          <Button variant="gradient" color="blue" onClick={onSubmitClick}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalEditFees;
