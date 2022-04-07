import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

const columns = [
  { id: 'orderId', label: 'Order Id', minWidth: 170 },
  { id: 'userName', label: 'User Name', minWidth: 100 },
  {
    id: 'orderDetails',
    label: 'Service Names',
    minWidth: 170,
  },
  {
    id: 'orderAmount',
    label: 'Order Amount',
    minWidth: 170,
  },
]

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function createData(orderNo, order) {
    return {
      orderNo,
      ...order,
    }
  }

  const orderRow = []

  props?.orderData?.forEach((order, index) => {
    orderRow.push(createData(index + 1, order))
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper
      sx={{
        width: '70%',
        overflow: 'hidden',
        alignSelf: 'center',
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderRow
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      if (column.id === 'orderDetails') {
                        return (
                          <TableCell>
                            {value?.map((order) => {
                              return (
                                <section
                                  style={{ padding: '10px' }}
                                  key={order?.itemNo}
                                >
                                  {order?.serviceName}
                                </section>
                              )
                            })}
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={orderRow.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
