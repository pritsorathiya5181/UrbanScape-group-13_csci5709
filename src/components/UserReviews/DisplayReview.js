import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { BASE_URL } from '../../utils/string'

function createData(index, name, review, ratings) {
  return { index, name, review, ratings }
}

//const rows = [ { "index": 1, "name": "Janhavi", "review": "Amazing service", "ratings": 3 }, { "index": 2, "name": "Sai", "review": "Amazing service", "ratings": 4 }, { "index": 3, "name": "John", "review": "Superb Services!!", "ratings": 4 }, { "index": 4, "name": "Jany", "review": "On time services provided.Happy!", "ratings": 5 }, { "index": 5, "name": "Jany", "review": "On time services provided.Happy!", "ratings": 5 } ];
const rows = []

export default function BasicTable() {
  const [data, setData] = React.useState([])
  const navigateHome = useNavigate()

  const handleClick = (event) => {
    navigateHome('/addReview')
  }
  console.log('janhavI111')
  React.useEffect(() => {
    console.log('janhavi')
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(`${BASE_URL}reviews/displayReview`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result).result)
        console.log(data)

        // JSON.parse(result).result.map((item,index)=>{
        //     rows.push(createData(index+1,item.firstname,item.review,item.ratings))
        // })
        // console.log(rows);
      })
      .catch((error) => console.log('error', error))
  }, [])
  console.log(data)
  return (
    <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead></TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.firstname}
                </TableCell>
                <TableCell align='center'>{row.review}</TableCell>
                <TableCell align='right'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-large'
                      defaultValue={row.ratings}
                      size='large'
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        Wanna add review?{' '}
        <Button variant='contained' onClick={handleClick}>
          Add Review
        </Button>
      </p>
    </div>
  )
}
