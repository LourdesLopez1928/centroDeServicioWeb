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
import Modal from '../modals/Modal'
import FormUpdateMachines from './FormUpdate'
import EditIcon from 'mdi-material-ui/Pencil'
import Stack from '@mui/material/Stack'
import DeleteIcon from 'mdi-material-ui/Delete'
import Switch from '@mui/material/Switch'
import TableOrder from './TableOrders'
import CardHorizontalRatings from 'src/views/cards/CardHorizontalRatings'
import { customerService } from 'src/services/customer.service'

const ViewOrder = ({ idOrder }) => {
  const [getorder, setGetOrder] = useState([])
  const [sessionToken, setSessionToken] = useState('')
  const [closeModal, setIsCloseModal] = useState(false)
  const [customer, setCustomer] = useState([])

  useEffect(async () => {
    setSessionToken(sessionStorage.getItem('token'))
    const { status, order } = await orderService.getById(sessionStorage.getItem('token'), idOrder)
    setGetOrder(order)
    const { customer } = await customerService.getById(sessionStorage.getItem('token'), order?.customerId)
    setCustomer(customer)
  }, [sessionToken])

 const goBackTable = () =>{

    setIsCloseModal(true)
  }

//   return <></>

  return <>

<Grid spacing={6}>
<CardHorizontalRatings 
order={getorder}
token={sessionToken}
customer={customer}
/>
</Grid>
      {/* <ConditionalRender cond={!closeModal}>
        
      </ConditionalRender>

      <ConditionalRender cond={closeModal}>
        <TableOrder />
      </ConditionalRender> */}
    </>
  
}

export default ViewOrder
