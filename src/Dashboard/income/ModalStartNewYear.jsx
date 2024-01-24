import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react'
import React from 'react'

const ModalStartNewYear = ({ open, handleClose, currentYear }) => {
    return (
        <>
            <Dialog
                open={open}
                // handler={handleOpen}
                size="sm"
                className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%]"
            >
                <DialogHeader className="text-center justify-center">
                    {" "}
                    Start New Financial Year
                </DialogHeader>
                <DialogBody divider className="h-[25rem] overflow-y-scroll">
                    <div>
                        <Button variant='outlined' disabled>{currentYear}</Button>
                        <div className='my-2'>
                            
                        <Input
                            type='number'
                            placeholder='Opening Balance ( Previous year Closing is taken as Opening balance by default )'
                        // value={}
                        />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        className="mr-1"
                    >
                        <span>Create New Year</span>
                    </Button>
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

export default ModalStartNewYear