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
import { machinesService } from '../../../services/machines.service'
import useSession from 'src/@core/context/session'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import TableMachine from './TableMachines'

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

const FormUpdateCustomer = ({idMachine}) => {
  const { formatMessage } = useIntl()
  const { session } = useSession()

  // ** States
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [type, setTypeMachine] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionToken, setSessionToken] = useState('')
  const [machineUpdate, setMachineUpdate] = useState('')
  const [closeModal, setIsCloseModal] = useState(false)
  useEffect(async() => {
    setSessionToken(sessionStorage.getItem('token'))
    const {machine} = await machinesService.getById(sessionStorage.getItem('token'),idMachine)
    setBrand(machine?.brand)
    setModel(machine?.model)
    setTypeMachine(machine?.type)
    setMachineUpdate(machine)
  }, [])

//   Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

//   Handle Confirm Password
  const savedForm = async () => {
    setLoading(true)

    const object = {
        brand,model,type
    }

    const { status } = await machinesService.update(idMachine,object,sessionToken)
    if (status === 'success') {
      setTimeout(() => {
        setLoading(false)
        setBrand('')
        setModel('')
        setTypeMachine('')
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
                  <FormattedMessage id='machine-update' defaultMessage='Machine Update' />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='brand'
                  label={formatMessage({
                    id: 'brand',
                    defaultMessage: 'brand'
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
                    id: 'model',
                    defaultMessage: 'model'
                  })}
                  placeholder=''
                  value={model}
                  onChange={event => {
                    setModel(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'type',
                    defaultMessage: 'type'
                  })}
                  placeholder=''
                  value={type}
                  onChange={event => {
                    setTypeMachine(event.target.value)
                  }}
                />
              </Grid>
                {/* <Grid item xs={12} sm={6}>
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
                </Grid> */}
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
            <TableMachine />
        </ConditionalRender>    

        {/* <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} /> */}

      </Card>
    </>
  )
}

export default FormUpdateCustomer
