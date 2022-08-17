// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'


// ** Third Party Imports
import { FormattedMessage, useIntl } from 'react-intl'
import LoadingSpinner from 'src/@core/components/LoadingData'

// ** Icons Imports

import { customerService } from '../../../services/customer.service'
import useSession from 'src/@core/context/session'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import TableOrders from './TableOrders'
import { orderService } from 'src/services/orders.service'


import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { CardHeader, Divider } from '@mui/material'

const StyledGrid1 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 4.75),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}))

const statusOrder = {
  1: 'Recibida',
  2: 'Por cotizar',
  3: 'Cotizada',
  4: 'Incosteable ',
  5: 'En reparación  ',
  6: 'Por entregar ',
  7: 'Entregada'
}

// Styled Grid component
const StyledGrid2 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0 !important'
  },
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '11rem',
  borderRadius: theme.shape.borderRadius
}))

const CustomInput = forwardRef((props, ref) => {
  const { formatMessage } = useIntl()

  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label={formatMessage({
        id: 'birth-day',
        defaultMessage: 'Fecha de nacimiento'
      })}
      autoComplete='off'
    />
  )
})

const FormUpdateOrders = ({ order,customer }) => {
  const { formatMessage } = useIntl()
  const { session } = useSession()

  // ** States

  const [loading, setLoading] = useState(false)
  const [sessionToken, setSessionToken] = useState('')
  const [closeModal, setIsCloseModal] = useState(false)
  const [getorder, setGetOrder] = useState([])
  const [notes, setNotes] = useState(null)
  console.log(order)

  const savedForm = async () => {
    setLoading(true)



    const { status } = await customerService.update(idUser, object, sessionToken)
    if (status === 'success') {
      setTimeout(() => {
        setLoading(false)

      }, 1500)
    }
  }

  const btnSaveDiagnostic = (id) =>{

  }

  const canceldForm = () => {
    console.log('canceldForm')
    setIsCloseModal(true)
  }
  console.log(customer);

  return (
    <>
      <Card>
        <Grid container spacing={6}>
          <StyledGrid1 item xs={12} md={6} lg={7}>
            <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Orden: {order?.id}
            </Typography>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Cliente: {customer?.name} {customer?.lastName}
            </Typography>
            Garantía: {order?.diagnostic?.warranty === false ? 'SI' : 'NO'}<br></br>

            {order?.machines?.map(data => (
              <Card>
                <CardHeader title={`${data?.type} ${data?.brand} ${data?.model}`} />
                <CardContent>
                  <Typography variant='body2' sx={{ marginBottom: 4 }}>
                    Número de serie: {data?.serialNumber}
                  </Typography>
                  <Typography variant='body2' sx={{ marginBottom: 4 }}>
                    Notas: {data?.notes}
                  </Typography>
                  <CardHeader title={`Diagnostico`} />

                  <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label={formatMessage({
                    id: 'notes',
                    defaultMessage: 'Notas'
                  })}
                  placeholder=''
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  defaultValue={notes}
                  onChange={event => {
                    setNotes(event.target.value)
                  }}

                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position='start'>
                  //       <MessageOutline />
                  //     </InputAdornment>
                  //   )
                  // }}
                />
              </Grid>
              <CardHeader title={`Refacciones`} />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label={formatMessage({
                    id: 'notes',
                    defaultMessage: 'Notas'
                  })}
                  placeholder=''
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  defaultValue={notes}
                  onChange={event => {
                    setNotes(event.target.value)
                  }}

                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position='start'>
                  //       <MessageOutline />
                  //     </InputAdornment>
                  //   )
                  // }}
                />
              </Grid>

                </CardContent>
                {data?.diagnostic?.spareParts?.map(parts => (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ marginBottom: 0 }} />
                    </Grid>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Refacción: {parts?.type} <br></br>
                      Descripción: {parts?.notes} <br></br>
                      Marca: {parts?.brand}<br></br>
                      Cantidad: {parts?.quantity}<br></br>
                      SKU: {parts?.sku}<br></br>
                      Precio: ${parts?.unitPrice}<br></br>

                    </CardContent>
                    <Grid item xs={12}>
                      <Divider sx={{ marginBottom: 0 }} />
                    </Grid>
                  </>
                ))}
                <br></br>
            <Button onClick={()=>btnSaveDiagnostic(data._id)} >Guardar</Button>

              </Card>
            ))}
            </CardContent>
          </StyledGrid1>
        </Grid>
      </Card>
    </>
  )
}

export default FormUpdateOrders
