import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'x',
      headerName: 'x',
      type: 'number',
      flex: 1
    },
    {
      field: 'y',
      headerName: 'y',
      type: 'number',
      flex: 1
    },
    {
      field: 'r',
      headerName: 'r',
      type: 'number',
      flex: 1
    },
    {
      field: 'isHit',
      headerName: 'isHit',
      type: 'boolean',
      flex: 1
    },
];
  

function DataTable({dots}) {
    return (
        <Box sx={{ margin: "0 auto"}}>
            <DataGrid
                rows={dots}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                autoHeight
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
  );
}

export default DataTable;