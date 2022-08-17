// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import { fetchPostUser } from '../../../services/user.service'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { FormattedMessage, useIntl } from 'react-intl'
import LoadingSpinner from 'src/@core/components/LoadingData'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import useSession from 'src/@core/context/session'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import { sparePartsCatalogService } from 'src/services/catalogSpareparts.service'


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

const FormCreateSpareparts = () => {
  const { formatMessage } = useIntl()
  const { session } = useSession()

  // ** States
  const [type, setType] = useState('')
  const [brand, setBrand] = useState('')
  const [sku, setSku] = useState('')
  const [description, setDescription] = useState('')
  const [sessionToken, setSessionToken] = useState('')

  const [loading, setLoading] = useState(false)

  // Handle Password

  // Handle Confirm Password
  useEffect(() => {
    setSessionToken(sessionStorage.getItem('token'))
  }, [sessionToken])

  const savedForm = async () => {
    setLoading(true)

    const object = {
      type,
      brand,
      sku,
      description
    }

    const { status } = await sparePartsCatalogService.create(sessionToken,object)
    console.log(status);

    if (status === 'success') {
      setTimeout(() => {
        setType('')
        setBrand('')
        setSku('')
        setDescription('')
        setLoading(false)
      }, 1500)
    }

    // setTimeout(() => {

    // }, 1500);
  }

  const canceldForm = () => {
    setType('')
    setBrand('')
    setSku('')
    setDescription('')
  }

  // Handle Select

  return (
    <>
      <Card>
        <ConditionalRender cond={loading}>
          <LoadingSpinner openSpinner={true} />
        </ConditionalRender>

        {/* <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} /> */}
        <Divider sx={{ margin: 0 }} />

        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  <FormattedMessage id='spareparts-tittle' defaultMessage='Spareparts' />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'type-sparepart',
                    defaultMessage: 'Name'
                  })}
                  placeholder=''      
                  value={type}
                  onChange={event => {
                    setType(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'brands-spareparts',
                    defaultMessage: 'Number part'
                  })}
                  placeholder=''
                  value={brand}
                  onChange={event => {
                    setBrand(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'sku-spareparts',
                    defaultMessage: 'serial part'
                  })}
                  placeholder=''
                  value={sku}
                  onChange={event => {
                    setSku(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'description-spareparts',
                    defaultMessage: 'price'
                  })}
                  placeholder=''
                  value={description}
                  onChange={event => {
                    setDescription(event.target.value)
                  }}
                />
              </Grid>

            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={savedForm}>
              <FormattedMessage id='saved-btn' defaultMessage='Guardar' />
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={canceldForm}>
              <FormattedMessage id='cancel-btn' defaultMessage='Cancelar' />
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  )
}

export default FormCreateSpareparts
