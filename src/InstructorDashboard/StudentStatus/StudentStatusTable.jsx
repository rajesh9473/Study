import { Button, Checkbox } from "@material-tailwind/react";
import React, { useState } from "react";

const StudentStatusTable = ({ item }) => {
  return (
    <>
      <tr className="bg-white border-b">
        <td className=" py-4">
          <Checkbox />
        </td>
        <td className="px-6 py-4 font-semibold text-black">{item.name}</td>
        {/* <td className="px-6 py-4 hidden sm:table-cell max-w-xs">CCC</td> */}
        <td className="px-6 py-4 hidden sm:table-cell">{item.regno}</td>
        <td className="px-6 py-4 max-w-xs">{item.status}</td>
      </tr>
    </>
  );
};

export default StudentStatusTable;
