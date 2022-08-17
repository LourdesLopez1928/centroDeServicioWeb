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
import useSession from 'src/@core/context/session'
import Button from '@mui/material/Button'
import ConditionalRender from '../../ConditionalRender'
import LoadingSpinner from '../../LoadingData'
import _get from 'lodash/get'
import _has from 'lodash/has'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import DeleteIcon from 'mdi-material-ui/Delete'
import EditIcon from 'mdi-material-ui/Pencil'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from 'mdi-material-ui/Plus';
import Switch from '@mui/material/Switch';
import { companyService } from 'src/services'

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
};

import FormCreateCompany from './Create'
import FormUpdateCompany from './Update'

const columns = [
  { id: 'number', label: '#', minWidth: 100 },
  { id: 'id', label: 'Código', minWidth: 100 },
  { id: 'rfc', label: 'RFC', minWidth: 100 },
  { id: 'personType', label: 'Tipo', minWidth: 100, align: 'center' },
  { id: 'name', label: 'Empresa', minWidth: 100 },
  { id: 'email', label: 'Correo electrónico', minWidth: 100, align: 'center' },
  { id: 'address', label: 'Dirección', minWidth: 100 },
  { id: 'phone', label: 'Teléfono', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Estatus', minWidth: 100, align: 'center' },
  { id: 'actions', label: '', minWidth: 100, align: 'center' },
]

const ListCompanies = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [listCompanies, setCompanies] = useState([])
  const [sessionToken, setSessionToken] = useState('')
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [isShowCreateModal, setIsShowCreateModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [currentCompanyId, setCurrentCompanyId] = useState(0)
  const [currentCompany, setCurrentCompany] = useState({})

  const handleFormUpdateCompany = async (event) => {
    event.preventDefault()
    setLoading(true)
    const { target: { id } } = event
    const { status, company } = await companyService.getById(id, sessionStorage.getItem('token'))

    if (status === 'success') {
      setCurrentCompany(company)
      setOpen(true)
    } else {
      setLoading(false)
    }
  }

  const handleClose = () => {
    fetchListCompanies()
    setCurrentCompany({})
    setOpen(false)
    setLoading(false)
  }

  const handleCloseCreateModal = () => {
    fetchListCompanies()
    setOpenCreateModal(false)
  }

  const handleFormCreateCompany = async () => {
    setOpenCreateModal(true)
  }

  async function fetchListCompanies () {
    setLoading(true)
    const { status, companies } = await companyService.list(sessionStorage.getItem('token'))
    if (status === 'success') {
      setCompanies(companies)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSessionToken(sessionStorage.getItem('token'))
    fetchListCompanies()
  }, [sessionToken])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDeleteCompany = async event => {
    event.preventDefault()
    const { target: { id } } = event
    console.log('deleteItem')
    setLoading(true)

    const { status } = await companyService.update(
      id,
      { status: 0 },
      sessionStorage.getItem('token')
    )

    if (status === 'success') {
        setLoading(false)
        fetchListCompanies()
    } else {
      setLoading(false)
    }
  }

  const ToggleItem = ({ id, status }) => {
    const [toggleThisElement, setToggleThisElement] = useState(status)

    const handleCompanyStatus = async (event) => {
      const { target: { id } } = event
      setToggleThisElement(!toggleThisElement)
      setLoading(true)

      const statusButton = !toggleThisElement ? 1 : 2
      const { status } = await companyService.update(id, { status: statusButton }, sessionStorage.getItem('token'))

      if (status === 'success') {
        setLoading(false)
        fetchListCompanies()
      } else {
        setLoading(false)
      }
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
        <Box sx={{ '& > :not(style)': { m: 1 }, float: 'right', 'margin-left': '10%' }}  ali>
            <Fab color="primary" aria-label="add" size="small">
              <AddIcon onClick={handleFormCreateCompany}/>
            </Fab>
        </Box>
        <ConditionalRender cond={!isShowCreateModal}>
          <Modal
            keepMounted
            open={openCreateModal}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <FormCreateCompany closeModal={handleCloseCreateModal}/>
            </Box>
          </Modal>
        </ConditionalRender>
        <ConditionalRender cond={!isShowModal && _has(currentCompany, 'name')}>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <FormUpdateCompany company={currentCompany} closeModal={handleClose}/>
            </Box>
          </Modal>
        </ConditionalRender>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
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
                {listCompanies
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((company, position) => (
                    <TableRow key={position}>
                      <TableCell align={'left'}>{position + 1}</TableCell>
                      <TableCell align={'left'}>{company._id}</TableCell>
                      <TableCell align={'left'}>{_get(company, 'rfc', 'N/A')}</TableCell>
                      <TableCell align={'center'}>{_get(company, 'personType', 'N/A')}</TableCell>
                      <TableCell align={'left'}>{company.name}</TableCell>
                      <TableCell align={'center'}>{_get(company, 'email', 'N/A')}</TableCell>
                      <TableCell align={'left'}>{company.address}</TableCell>
                      <TableCell align={'center'}>{_get(company, 'phone', 'Sin número')}</TableCell>
                      {/* <TableCell align={'center'}>{company?.status == 1 ? 'Activo' : 'Desactivado'}</TableCell> */}
                      <TableCell align={'center'}>
                        <ToggleItem id={company._id} status={company?.status == 1}/>
                      </TableCell>
                      <TableCell align={'right'}>
                      <Stack direction='row' spacing={1.5}>
                        <IconButton aria-label='edit' color='primary'>
                          <EditIcon id={company._id} onClick={handleFormUpdateCompany} />
                        </IconButton>
                        <IconButton aria-label='delete' color='error'>
                          <DeleteIcon id={company._id} onClick={handleDeleteCompany} />
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
            count={listCompanies?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ListCompanies
