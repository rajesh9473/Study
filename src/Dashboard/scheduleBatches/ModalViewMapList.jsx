import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import Select from "react-select";


const ModalViewMapList = ({ open, handleOpen, data }) => {

    const students = data?.students || [];

    const options = students.map((student) => ({
        value: student.regno,
        label: student.name,
    }));



    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
            >
                <DialogHeader className="text-center justify-center">
                    Map Student List
                </DialogHeader>
                <DialogBody divider className="h-[25rem] overflow-y-scroll">
                    <div className="grid grid-cols-1">
                        <Select options={options} />
                        <table className="table-auto">
                            <thead>
                                <tr className="text-left">
                                    <th>Reg No.</th>
                                    <th>Student Name</th>
                                    <th>Course</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.regno}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.course}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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

export default ModalViewMapList;
