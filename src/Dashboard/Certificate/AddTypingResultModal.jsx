import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import baseurl from '../../Config';
import Select from 'react-select';
import { toast } from 'react-toastify';

const AddTypingResultModal = ({ open, handleClose, getFetchResult, openList }) => {
    const [inputs, setInputs] = useState({});
    const [loader, setLoader] = useState(true);

    const [selectStudent, setSelectStudent] = useState(null);
    const [selectStudentData, setSelectStudentData] = useState([]);
    const [typingLang, setTypingLang] = useState(null);




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSelectStudent = (selectedOption) => {
        setSelectStudent(selectedOption);
    };

    const handleSelectTypingLang = (selectedOption) => {
        setTypingLang(selectedOption);
        setInputs((values) => ({ ...values, typingLang: selectedOption.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            student: selectStudent.value,
            regno: selectStudent?.regno || '',
            typingLang: typingLang?.value || '',
            fname: selectStudent.fname || '',
            speed: inputs.speed || '',
            accuracy: inputs.accuracy || '',
            from: inputs.from || '',
            to: inputs.to || '',
            total_marks: inputs.total_marks || '',
            obtain_marks: inputs.obtain_marks || ''
        };

        console.log("Form submitted:", formData);


        fetch(baseurl + "/api/typing-result/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((result) => {
                toast.success("Added Successfully");
                handleClose()
                setInputs({
                    ...inputs,
                    student: '',
                    regno: '',
                    typingLang: '',
                    fname: '',
                    speed: '',
                    accuracy: '',
                    from: '',
                    to: '',
                    total_marks: '',
                    obtain_marks: ''
                });
                getFetchResult();
            })
            .catch((err) => {
                // Handle fetch error
                console.error("Fetch error:", err);
                toast.warning(err);
            });
    }

    const getStudentList = async () => {
        try {
            const response = await fetch(`${baseurl}/api/course-students/65599995416b71fffc09d5ff`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setSelectStudentData(result.data[0].student);
        } catch (error) {
            console.error("Error fetching student list:", error);
        }
    };

    useEffect(() => {
        getStudentList();
    }, []);

    const options = [
        { value: 'english', label: 'English Language' },
        { value: 'hindi', label: 'Hindi Language' },
    ]

    return (
        <>
            <Dialog
                open={open}
                className="min-w-[90%] md:min-w-[60%] lg:min-w-[55%]"
            >
                <DialogHeader className="text-center justify-center">
                    {" "}
                    Add Typing Result
                </DialogHeader>
                <DialogBody divider className="h-[25rem] overflow-y-scroll">
                    <form onSubmit={handleSubmit}>
                        <div className="py-2">
                            <Select
                                id="name"
                                name="name"
                                value={selectStudent}
                                onChange={handleSelectStudent}
                                options={selectStudentData?.map((item) => ({
                                    label: item?.name,
                                    value: item?._id,
                                    ...item
                                }))}
                                placeholder="Select Student"
                                isSearchable
                            />
                        </div>

                        <div className="py-2">
                            <Input
                                type="text"
                                id="regno"
                                name="regno"
                                value={selectStudent?.regno}
                                label="Reg. No."
                                size="regular"
                                fullWidth
                            />
                        </div>

                        <div className="py-2">
                            <Input
                                type="text"
                                id="fname"
                                name="fname"
                                value={selectStudent?.fname || ''}
                                label="Father Name"
                                size="regular"
                                fullWidth
                            />
                        </div>

                        <div className="py-2">
                            <Select
                                id="typingLang"
                                name="typingLang"
                                value={typingLang}
                                onChange={handleSelectTypingLang}
                                options={options}
                                placeholder="Select Typing Language"
                                isSearchable
                            />

                        </div>

                        <div className="py-2">
                            <Input
                                type="number"
                                id="speed"
                                name="speed"
                                value={inputs.speed || ''}
                                onChange={handleChange}
                                label="Speed"
                                size="regular"
                                fullWidth
                            />
                        </div>
                        <div className="py-2">
                            <Input
                                type="number"
                                id="accuracy"
                                name="accuracy"
                                value={inputs.accuracy || ''}
                                onChange={handleChange}
                                label="Accuracy"
                                size="regular"
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-2 py-2 gap-4">
                            <div className="">
                                <Input
                                    type="date"
                                    id="from"
                                    name="from"
                                    value={inputs.from || ''}
                                    onChange={handleChange}
                                    label="From"
                                    size="regular"
                                    fullWidth
                                />
                            </div>
                            <div className="">
                                <Input
                                    type="date"
                                    id="to"
                                    name="to"
                                    value={inputs.to || ''}
                                    onChange={handleChange}
                                    label="To"
                                    size="regular"
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="py-2">
                            <Input
                                type="number"
                                id="obtain_marks"
                                name="obtain_marks"
                                value={inputs.obtain_marks || ''}
                                onChange={handleChange}
                                label="Obtain Marks"
                                size="regular"
                                fullWidth
                            />
                        </div>
                        <div className="py-2">
                            <Input
                                type="number"
                                id="total_marks"
                                name="total_marks"
                                value={inputs.total_marks || ''}
                                onChange={handleChange}
                                label="Total Marks"
                                size="regular"
                                fullWidth
                            />
                        </div>
                        {/* Add more fields as needed */}
                        <Button
                            type="submit"
                            buttonType="filled"
                            size="lg"
                            ripple="light"
                            fullWidth
                            className='flex justify-center items-center mt-2'
                        >
                            Submit
                        </Button>
                    </form>
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
    );
}

export default AddTypingResultModal;
