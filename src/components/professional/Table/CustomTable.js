// Author: Prit Ajaykumar Sorathiya - B00890175

import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import { Button } from '@mui/material'

export default function CustomTable(props) {
  const columns = props?.headerData

  function createData(serviceNo, service) {
    return {
      serviceNo,
      ...service,
    }
  }

  const rows = []

  props?.serviceData?.forEach((service, index) => {
    rows.push(createData(index + 1, service))
  })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [openDetails, setOpenDetails] = useState(false)

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
        width: '100%',
        overflow: 'hidden',
        boxShadow: '3px 3px 8px 0 grey',
        borderRadius: '5px',
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#0d47a1',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <>
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={rowIndex.toString()}
                      style={{ cursor: 'pointer' }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => setOpenDetails(rowIndex)}
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>

                    {openDetails === rowIndex && (
                      <TableRow>
                        <TableCell colSpan={12}>
                          <section>
                            <section>
                              <p>
                                Service time: {row?.serviceTime ?? '10.00 AM'}
                                {', '}
                                {moment(
                                  row?.date ? new Date(row?.date) : new Date()
                                ).format('MMMM Do YYYY')}
                              </p>
                              <p>Notes: {row?.specialInstructions ?? ''}</p>
                              {props?.historyPage && row?.orderItemStatus && (
                                <p>
                                  Service Status:{' '}
                                  <Button
                                    variant='contained'
                                    color={
                                      row?.orderItemStatus === 'Approved'
                                        ? 'success'
                                        : 'error'
                                    }
                                    sx={{
                                      marginLeft: '10px',
                                    }}
                                  >
                                    {row?.orderItemStatus}
                                  </Button>
                                </p>
                              )}
                              {!props?.historyPage ? (
                                <section
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Button
                                    variant='contained'
                                    onClick={() => {
                                      setOpenDetails(false)
                                      props.onApprove(row)
                                    }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant='contained'
                                    color='error'
                                    sx={{
                                      marginLeft: '10px',
                                    }}
                                    onClick={() => {
                                      setOpenDetails(false)
                                      props.onReject(row)
                                    }}
                                  >
                                    Reject
                                  </Button>
                                  <Button
                                    variant='contained'
                                    sx={{
                                      marginLeft: '10px',
                                      backgroundColor: '#D8D5DB',
                                      color: 'black',
                                      '&&: hover': {
                                        backgroundColor: '#D8D5DB',
                                      },
                                    }}
                                    onClick={() => setOpenDetails(false)}
                                  >
                                    Close
                                  </Button>
                                </section>
                              ) : (
                                <section>
                                  <Button
                                    variant='contained'
                                    sx={{
                                      backgroundColor: '#D8D5DB',
                                      color: 'black',
                                      ' &&: hover': {
                                        backgroundColor: '#D8D5DB',
                                      },
                                    }}
                                    onClick={() => setOpenDetails(false)}
                                  >
                                    Okay
                                  </Button>
                                </section>
                              )}
                            </section>
                          </section>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
