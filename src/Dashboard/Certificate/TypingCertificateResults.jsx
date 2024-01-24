import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import baseurl from '../../Config';
import moment from 'moment/moment';

const TypingCertificateResults = ({ open, handleClose, openAddCertificate }) => {

  const [loader, setLoader] = useState(true);
  const [typingResults, setTypingResults] = useState([])

  const getFetchResult = async () => {
    try {

      const response = await fetch(`${baseurl}/api/typing-result/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setTypingResults(result.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  useEffect(() => {
    getFetchResult()
  }, [])


  return (
    <>
      <Dialog
        open={open}
        className="min-w-[90%] md:min-w-[60%] lg:min-w-[90%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Typing Results
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <div className="overflow-x-auto">
            <div className="flex justify-end">
              <Button onClick={openAddCertificate} >Add Result</Button>
            </div>
            <table className="min-w-full border border-gray-300 my-2">
              <thead>
                <tr>
                  {/* Header columns */}
                  <th className="border border-gray-300 p-2">Student Name</th>
                  <th className="border border-gray-300 p-2">Reg. No.</th>
                  <th className="border border-gray-300 p-2">Language</th>
                  <th className="border border-gray-300 p-2">Father Name</th>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">Speed</th>
                  <th className="border border-gray-300 p-2">Accuracy</th>
                  <th className="border border-gray-300 p-2">From</th>
                  <th className="border border-gray-300 p-2">To</th>
                  <th className="border border-gray-300 p-2">Total Marks</th>
                  <th className="border border-gray-300 p-2">Obtained Marks</th>
                  <th className="border border-gray-300 p-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                {/* Table rows go here */}
                {
                  typingResults.map((item, index) => (
                    <tr className="border border-gray-300">
                      <td className="border border-gray-300 p-2">{item?.student?.name}</td>
                      <td className="border border-gray-300 p-2">{item?.regno}</td>
                      <td className="border border-gray-300 p-2">{item?.typingLang}</td>
                      <td className="border border-gray-300 p-2">{item?.fname}</td>
                      <td className="border border-gray-300 p-2"><p>{item?.student?.address}</p></td>
                      <td className="border border-gray-300 p-2">{item?.speed}</td>
                      <td className="border border-gray-300 p-2">{item?.accuracy}</td>
                      <td className="border border-gray-300 p-2">{moment(item?.from).format('MM Do YYYY')}</td>
                      <td className="border border-gray-300 p-2">{moment(item?.to).format('MM Do YYYY')}</td>
                      <td className="border border-gray-300 p-2">{item?.total_marks}</td>
                      <td className="border border-gray-300 p-2">{item?.obtain_marks}</td>
                      <td className="border border-gray-300 p-2">{

                        item?.obtain_marks < 60
                          ? 'B'
                          : item?.obtain_marks >= 60 && item?.obtain_marks <= 80
                            ? 'A'
                            : item?.obtain_marks > 80
                              ? 'A+'
                              : null

                      }</td>
                    </tr>
                  ))
                }
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default TypingCertificateResults