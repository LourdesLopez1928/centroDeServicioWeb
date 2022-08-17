// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import TableOrder from 'src/@core/components/FormOrders/TableOrders'
import { useEffect, useState } from 'react'
import { CardHeader, Divider } from '@mui/material'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import FormUpdateOrders from 'src/@core/components/TechnicalOrder/FormUpdate'


// Styled Grid component
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


const CardOrderTechnical = ({ token, order,customer }) => {

    const [pageDiagnostic, setPageDiagnostic] = useState(false)
    const [idOrderUpdate, setIdOrder] = useState('')

  const retutnPage =() =>{
    window.location.reload()
 }
 
 const btnDiagnostic = (id) =>{
    setIdOrder(id)
    setPageDiagnostic(true)
 }
 

  return (
    <>
    <ConditionalRender cond={pageDiagnostic == false} >
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
            {/* ------------------------------------------------------------------- */}
            {/* <Grid container spacing={6}> */}
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
                  <Typography variant='body2' sx={{ marginBottom: 3.25 }}>
                    {data?.diagnostic?.notes}
                  </Typography>
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
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Precio de refacciones + IVA: ${data?.diagnostic?.total}<br></br>
                Garantía: {data?.diagnostic?.warranty === false ? 'SI' : 'NO'}<br></br>
              </CardContent>
                <StyledGrid2>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' />
                  </CardContent>
                </StyledGrid2>
                <br></br>
            <Button onClick={()=>btnDiagnostic(data._id)} >Diagnostico</Button>

              </Card>
            ))}
           
            {/* </Grid> */}
            {/* ------------------------------------------------------------------- */}
          </CardContent>
          <CardActions className='card-action-dense' sx={{ width: '100%' }}>
            <Button onClick={()=>retutnPage()} >Regresar</Button>
            {/* <Button>Reviews</Button> */}
          </CardActions>
        </StyledGrid1>
      </Grid>
    </Card>
    </ConditionalRender>
    <ConditionalRender cond={pageDiagnostic == true} >
          <FormUpdateOrders order={order} customer={customer} />
    </ConditionalRender>

    </>

  )
}

export default CardOrderTechnical
