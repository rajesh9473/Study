import React from "react";
import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import moment from "moment";

const ModalAddAttendance = ({ open, handleOpen }) => {
    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                className="min-w-[80%] md:min-w-[60%] lg:min-w-[60%] focus-visible:outline-none"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogBody
                    divider
                    className="h-[35rem] text-[var(--secondary-color)] overflow-y-scroll border-0 "
                >
                <div>
                    
                </div>

                </DialogBody>
            </Dialog>
        </>
    );
};

export default ModalAddAttendance;
