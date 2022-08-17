import { useEffect, useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Grid from '@mui/material/Grid'
import { orderService } from 'src/services/orders.service'
import { useIntl } from 'react-intl'
import useSession from 'src/@core/context/session'
import { Button, IconButton } from '@mui/material'
import ConditionalRender from '../ConditionalRender'
import LoadingSpinner from '../LoadingData'
import EditIcon from 'mdi-material-ui/Pencil'
import Stack from '@mui/material/Stack'
import DeleteIcon from 'mdi-material-ui/Delete'
import Switch from '@mui/material/Switch'
import ViewOrder from './ViewOrder'

const columns = [
  { id: 'order', label: 'Número de orden', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'equipos', label: 'Equipos', minWidth: 100, align: 'center' },
  { id: 'watch', label: 'Acción', minWidth: 100, align: 'left' }
]

const statusOrder = {
  1: 'Recibida',
  2: 'Por cotizar',
  3: 'Cotizada',
  4: 'Incosteable ',
  5: 'En reparación  ',
  6: 'Por entregar ',
  7: 'Entregada'
}

const rows = []

const TableOrderTechnical = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [listorders, setOrders] = useState([])
  const [sessionToken, setSessionToken] = useState('')
  const [idForUpdate, setIdForUpdate] = useState('')
  const { formatMessage } = useIntl()
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [goViewOrder, setGoViewOrder] = useState(false)
  const [idOrder, setIdOrder] = useState('')

  useEffect(async () => {
    setSessionToken(sessionStorage.getItem('token'))
    const { orders, status } = await orderService.getAll(sessionStorage.getItem('token'))
    setOrders(orders)
  }, [sessionToken])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const updateItem = async (id) => {
    console.log('updateItem: ', id)
    setIdForUpdate(id)
    setIsShowModal(true)
  }


  const deleteItem = async (id) => {
    console.log('deleteItem')
    setLoading(true)

    const {
      status: storder,
      update,
      message
    } = await orderService.update(
      id,
      {
        status: 0
      },
      sessionToken
    )

    if (storder === 'success') {
      setTimeout(async () => {
        setLoading(false)
        const { orders, status } = await orderService.getAll(sessionToken)
        setOrders(orders)
      }, 1500)
    } else {
      setLoading(false)
      console.log(message)
    }
  }

  const viewOrderAction = (id) => {
    setIdOrder(id)
    setGoViewOrder(true)
  }

  return (
    <>
      <ConditionalRender cond={!goViewOrder}>
        <Grid container spacing={6}>
          <ConditionalRender cond={loading}>
            <LoadingSpinner openSpinner={true} />
          </ConditionalRender>
          <Grid item xs={12}>
            <ConditionalRender cond={isShowModal}>
              {/* <FormUpdateMachines idMachine={idForUpdate} /> */}
            </ConditionalRender>
            <ConditionalRender cond={!isShowModal}>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                      <TableRow>
                        {columns.map(column => (
                          <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listorders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
                        <TableRow key={i}>
                          <TableCell>{data.id}</TableCell>
                          <TableCell>{statusOrder[data.status]}</TableCell>
                          <TableCell align={'center'}>{data.machines.length}</TableCell>

                          {/* <TableCell align={'right'}>
                            <Stack direction='row' spacing={1.5}>
                              <IconButton aria-label='edit' color='primary'>
                                <EditIcon onClick={() => updateItem(data._id)} />
                              </IconButton>
                            </Stack>
                          </TableCell> */}
                          {/* <TableCell align={'center'}>
                            <Stack direction='row' spacing={1.5}>
                              <IconButton aria-label='delete' color='error'>
                                <DeleteIcon onClick={() => deleteItem(data._id)} />
                              </IconButton>
                            </Stack>
                          </TableCell> */}

                          <TableCell align={'left'}>
                            <Button size='small' onClick={() => viewOrderAction(data._id)} variant='contained'>
                              Diagnosticar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component='div'
                  count={listorders?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </ConditionalRender>
          </Grid>
        </Grid>
      </ConditionalRender>

      <ConditionalRender cond={goViewOrder}>
          <ViewOrder idOrder={idOrder} />
      </ConditionalRender>
    </>
  )
}

export default TableOrderTechnical
