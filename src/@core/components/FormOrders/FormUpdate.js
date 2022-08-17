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
import TableOrders from './TableOrders'

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

const FormUpdateOrders = ({idUser}) => {
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

  return <></>


}

export default FormUpdateOrders
