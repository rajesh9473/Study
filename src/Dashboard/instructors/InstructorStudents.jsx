import React from 'react'
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";


const InstructorMapedStudents = () => {


    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarQuickFilter />
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    };


    const Data = [
        {
            id: 1,
            name: 'Dummy',
            from: '7 AM',
            to: '8 AM',
            regNo: 12345,
            studentName: 'Ram',
            course: 'DCA',
            instructorName: 'Sourabh Verma'
        }

    ]

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 100 },
        { field: "from", headerName: "From", width: 100 },
        { field: "to", headerName: "To", width: 100 },
        { field: "studentName", headerName: "Student Name", width: 100 },
        { field: "regNo", headerName: "Reg No", width: 100 },
        { field: "course", headerName: "Course", width: 100 },
        { field: "instructorName", headerName: "Teacher Name", width: 150 }

    ];

    return (
        <div >

            <DataGrid
                rows={Data}
                columns={columns}
                components={{ Toolbar: CustomToolbar }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default InstructorMapedStudents