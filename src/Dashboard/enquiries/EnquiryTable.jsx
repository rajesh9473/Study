import React, { useState } from "react";
import { Button, Checkbox, Tooltip } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import ModalEnrollStudent from "./ModalEnrollStudent";
import ModalEditEnquiry from "./ModalEditEnquiry";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const EnquiryTable = ({ item, getEnquiryList, checked, index }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);

  const navigate = useNavigate()


  async function deleteData(contact) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${baseurl}/api/enquiry/${contact}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await response.json();
        toast.success("Deleted Successfully");
        getEnquiryList();
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }


  async function HandleEnquiryStatus(id, status) {
    const statusQuery = new URLSearchParams({ status }).toString()
    try {
      console.log(`${baseurl}/api/enquiry?${statusQuery}`)
      const response = await fetch(`${baseurl}/api/enquiry/${id}?${statusQuery}`, {
        method: 'GET',
      });

      if (response.ok) {
        await response.json();
        toast.success("Status Update Successfully");
        getEnquiryList();

      } else {
        toast.error("failed to update status ")
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <tr className="bg-white border-b" key={item._id}>
      <td className=" py-4">
        <Checkbox
          checked={checked}
        />
      </td>
      <td className="">{item.enquiryNo}</td>
      <th scope="row" className="px-6 py-4 font-semibold text-black">
        <div>{item.name}</div>
        <div className="font-light my-1 text-gray-500">{item.email}</div>
      </th>
      <td className="">{item.fname}</td>
      <td className="max-w-0 truncate">
        <Tooltip
          content={item.address}
          className="max-w-xs text-white bg-[var(--theme-color)] rounded-md"
          placement="bottom-end"
        >
          {item.address}
        </Tooltip>
      </td>
      <td className="">{item.contact}</td>
      <td className="">{item.gender}</td>
      <td className="">{item.maritalStatus}</td>
      {/* <td className=" hidden md:table-cell">{item.ref_by}</td> */}
      <td className="">{item.dob}</td>
      <td className="">{item.academicQualifications}</td>
      <td className="">{item.computerAwareness}</td>
      <td className="">{item.previousknowledge}</td>
      <td className="">{item.counseller}</td>
      <td className="">{item.course}</td>
      <td className="">{item.pdClasses ? 'Yes' : 'No'}</td>
      <td className="">{item.carrierClasses ? 'Yes' : 'No'}</td>
      <td className="">{item.ref_by}</td>
      <td className="">
        <p>{moment(item.updatedAt).format('MMM Do YY')}</p>
        {moment(item.updatedAt).format('h:mm:ss a')}
      </td>
      <td className={`${item.status === 'pending' ? 'text-yellow-700' :
        item.status === 'joined' ? 'text-green-700' :
          item.status === 'not-interested' ? 'text-red-700' : ''
        }`}>{
          item.status === 'pending' ? 'Pending' :
            item.status === 'joined' ? 'Joined' :
              item.status === 'not-interested' ? 'Not Interested' : ''
        }
      </td>
      <td className="">
        {
          item.status === 'joined' ?
            <Button size="sm" onClick={() => navigate('/admin/students')}>
              Check
            </Button>
            : <Button size="sm" onClick={handleOpen}>
              Enroll
            </Button>
        }
      </td>
      <ModalEnrollStudent open={open} handleOpen={handleOpen} item={item} HandleEnquiryStatus={HandleEnquiryStatus} />
      <td className="px-1 py-4">
        <Menu>
          <MenuHandler>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={handleOpen2}>
              <div onClick={handleOpen2} className="flex ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                Edit
              </div>
            </MenuItem>
            {item.status === 'joined' ? null : <MenuItem onClick={() => { HandleEnquiryStatus(item?._id, 'not-interested') }}>
              <div className="flex ">
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-4 h-4 mx-2">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Not Intrested
              </div>
            </MenuItem>}
            <MenuItem onClick={() => deleteData(item?.contact)}>
              <div className="flex ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
                Delete
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
        <ModalEditEnquiry
          item={item}
          open={open2}
          handleOpen={handleOpen2}
          getEnquiryList={getEnquiryList}
        />
      </td>
    </tr>
  );
};

export default EnquiryTable;
