import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import InstructorAttendence from "../../InstructorDashboard/instructor-attendence/InstructorAttendence";

const ModalMarkAttendance = ({ open, handleOpen }) => {



    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
            >
                <DialogHeader className="text-center justify-center">
                    {" "}
                    Mark Attendance
                </DialogHeader>
                <DialogBody divider className="h-[25rem] overflow-y-scroll">
                    <InstructorAttendence />
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
                    <Button variant="gradient" color="blue">
                        <span>Add</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default ModalMarkAttendance;
