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
import { customerService } from 'src/services/customer.service'
import { useIntl } from 'react-intl'
import useSession from 'src/@core/context/session'
import ConditionalRender from '../ConditionalRender'
import LoadingSpinner from '../LoadingData'
import Modal from '../modals/Modal'
import FormUpdateCustomer from './formUpdate'
import { Button, IconButton } from '@mui/material'
import EditIcon from 'mdi-material-ui/Pencil'
import Stack from '@mui/material/Stack'
import DeleteIcon from 'mdi-material-ui/Delete'
import Switch from '@mui/material/Switch';

const columns = [
  { id: 'name', label: 'Nombres', minWidth: 100 },
  { id: 'lastname', label: 'Apellidos', minWidth: 100 },
  { id: 'email', label: 'Correo', minWidth: 100,align: 'center' },
  { id: 'jj', label: 'Telefono', minWidth: 100, align: 'right' },
  { id: 'actdes', label: 'Activar/Desactivar', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Actualizar', minWidth: 100, align: 'left' },
  { id: 'delete', label: 'Eliminar', minWidth: 100, align: 'left' },
]

const rows = []

const TableCustomer = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [listcustomer, setCustomer] = useState([])
  const [sessionToken, setSessionToken] = useState('')
  const [idForUpdate, setIdForUpdate] = useState('')
  const { formatMessage } = useIntl()
  const [loading, setLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)

  useEffect(async () => {
    setSessionToken(sessionStorage.getItem('token'))
    const { customers, status } = await customerService.getAll(sessionStorage.getItem('token'))
    setCustomer(customers)
  }, [sessionToken])
  console.log(listcustomer);

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const updateItem = async id => {
    console.log('updateItem: ', id)
    setIdForUpdate(id)
    setIsShowModal(true)
  }

  const deleteItem = async id => {
    console.log('deleteItem')
    setLoading(true)

    const { status, update, message } = await customerService.update(
      id,
      {
        status: 0
      },
      sessionToken
    )

    if (status === 'success') {
      setTimeout(async () => {
        setLoading(false)
        const { customers, status } = await customerService.getAll(sessionToken)
        setCustomer(customers)
      }, 1500)
    } else {
      setLoading(false)
      console.log(message)
    }
  }

  const ToggleItem = ({ id, status }) => {
    const [toggleThisElement, setToggleThisElement] = useState(status)

    const handleCompanyStatus = async (event) => {
      const { target: { id } } = event
      setToggleThisElement(!toggleThisElement)

      const statusButton = !toggleThisElement ? 1 : 2
      const { status } = await customerService.update(id, { status: statusButton }, sessionToken)

      if (status == 'succes') {
        setTimeout(async () => {
          const { customers, status } = await customerService.getAll(sessionToken)
          setCustomer(customers)
        }, 1500)
      }

      console.log('Log de sparepart: ',status);

    }

    return ( 
      <Switch
        key={id}
        checked={toggleThisElement}
        onChange={handleCompanyStatus}
        inputProps={{ 'id': id }}
        size="small"
      />
    );
  };
  
return (
    <Grid container spacing={6}>
      <ConditionalRender cond={loading}>
        <LoadingSpinner openSpinner={true} />
      </ConditionalRender>
      <Grid item xs={12}>
      <ConditionalRender cond={isShowModal}>
        <FormUpdateCustomer idUser={idForUpdate} />
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
                {listcustomer?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
                  <TableRow key={i}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.lastName}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell align={'right'}>{data.phone}</TableCell>
                    <TableCell align={'center'}>
                        <ToggleItem id={data._id} status={data?.status == 1}/>
                      </TableCell>
                      <TableCell align={'center'}>
                      <Stack direction='row' spacing={1.5}>
                        <IconButton aria-label='edit' color='primary'>
                          <EditIcon onClick={() => updateItem(data._id)} />
                        </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell align={'center'}>
                      <Stack direction='row' spacing={1.5}>
                      <IconButton aria-label='delete' color='error'>
                          <DeleteIcon onClick={() => deleteItem(data._id)} />
                        </IconButton>
                      </Stack>

                      </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={listcustomer.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        </ConditionalRender>
      </Grid>


    </Grid>
  )
}

export default TableCustomer
