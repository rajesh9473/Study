import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import baseurl from "../../Config";

const ModalChangeStatus = ({ open, handleOpen, updateId }) => {
    const [inputs, setInputs] = useState({
        course: "", // Initialize with a default value or an empty string
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { course } = inputs;

        fetch(baseurl + `/api/students/${updateId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: course }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Update API Response:", data);
                handleOpen(); // Close the dialog on successful submit
            })
            .catch((error) => {
                console.error("Error during update:", error);
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
                    Student Status
                </DialogHeader>
                <DialogBody divider className="overflow-y-scroll">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mt-5 mb-6">
                            <div className="w-full px-3 mb-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="course"
                                >
                                    Select Course
                                </label>
                                <select
                                    label="Select Course"
                                    className="p-2 border focus-visible:outline-none w-full rounded-md"
                                    value={inputs.course}
                                    name="course"
                                    onChange={handleChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="break">Break</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" type="submit" color="blue">
                                <span>Change</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default ModalChangeStatus;
