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

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { FormattedMessage, useIntl } from 'react-intl'
import LoadingSpinner from 'src/@core/components/LoadingData'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { customerService } from '../../../services/customer.service'
import useSession from 'src/@core/context/session'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import TableCustomer from './TableCustomer'

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

const FormUpdateCustomer = ({idUser}) => {
  const { formatMessage } = useIntl()
  const { session } = useSession()

  // ** States
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionToken, setSessionToken] = useState('')
  const [closeModal, setIsCloseModal] = useState(false)
  useEffect(async() => {
    setSessionToken(sessionStorage.getItem('token'))
    const user = await customerService.getById(sessionStorage.getItem('token'),idUser)
    setEmail(user?.customer?.email)
    setName(user?.customer?.name)
    setLastName(user?.customer?.lastName)
    setPhone(user?.customer?.phone)
  }, [])

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password



  const savedForm = async () => {
    setLoading(true)

    const object = {
      email,
      name,
      lastName,
      phone,
    }

    const { status } = await customerService.update(idUser,object,sessionToken)
    if (status === 'success') {
      setTimeout(() => {
        setLoading(false)
        setEmail('')
        setName('')
        setLastName('')
        setIsCloseModal(true)
      }, 1500)
    }
  }

  const canceldForm = () => {
    console.log('canceldForm');
    setIsCloseModal(true)
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  return (
    <>
      <Card>
        <ConditionalRender cond={loading}>
          <LoadingSpinner openSpinner={true} />
        </ConditionalRender>        

        <ConditionalRender cond={!closeModal}>
        <Divider sx={{ margin: 0 }} />

        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  <FormattedMessage id='custome-update' defaultMessage='Custome Update' />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  label={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email'
                  })}
                  placeholder='carterleonard@gmail.com'
                  value={email}
                  onChange={event => {
                    setEmail(event.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  <FormattedMessage id='personal-info' defaultMessage='Personal info' />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'names',
                    defaultMessage: 'Names'
                  })}
                  placeholder='Jose'
                  value={name}
                  onChange={event => {
                    setName(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'last-name',
                    defaultMessage: 'last-name'
                  })}
                  placeholder='Martinez'
                  value={lastName}
                  onChange={event => {
                    setLastName(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'phone',
                    defaultMessage: 'Phone'
                  })}
                  placeholder='3301987652'
                  value={phone}
                  onChange={event => {
                    setPhone(event.target.value)
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
        </ConditionalRender>    
        <ConditionalRender cond={closeModal}>
            <TableCustomer />
        </ConditionalRender>    

        {/* <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} /> */}

      </Card>
    </>
  )
}

export default FormUpdateCustomer
