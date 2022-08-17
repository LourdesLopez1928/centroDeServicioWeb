// ** React Imports
import { forwardRef, useState } from 'react'

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
import { fetchPostUser } from '../../services/user.service'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { FormattedMessage, useIntl } from 'react-intl'
import LoadingSpinner from 'src/@core/components/loadingData'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { userService } from '../../services/user.service'
import useSession from 'src/@core/context/session'
import ConditionalRender from 'src/@core/components/ConditionalRender'

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

const FormCreateUser = () => {
  const { formatMessage } = useIntl()
  const { session } = useSession()

  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [user, setUser] = useState(null)
  const [companyId, setCompanyId] = useState(null)
  const [status, setStatus] = useState(null)
  const [role, setRole] = useState(null)
  const [phone, setPhone] = useState(null)
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

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
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  const savedForm = async () => {
    setLoading(true)

    const object = {
      email,
      password: values.password2,
      name,
      lastName,
      role: Number(role),
      phone,
      status: 1,
      companyId: session.data.me.companyId
    }

    const { status } = await userService.create(object)

    if (status === 'success') {
      setTimeout(() => {
        setLoading(false)
        setEmail('')
        setName('')
        setLastName('')
        setValues({
          password: '',
          password2: '',
          showPassword: false,
          showPassword2: false
        })
        setRole('')
        setPhone('')
      }, 1500)
    }

    // setTimeout(() => {

    // }, 1500);
  }

  const canceldForm = () => {}

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

        {/* <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} /> */}
        <Divider sx={{ margin: 0 }} />

        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  <FormattedMessage id='account-tittle' defaultMessage='Account' />
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
              <TextField 
              fullWidth 
              label={formatMessage({
                id: "user",
                defaultMessage: "User",
              })} 
              placeholder='User01' 
              value={user}
              onChange={(event) => { setUser(event.target.value) }}
                />
            </Grid> */}
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='form-layouts-separator-password'>
                    <FormattedMessage id='password' defaultMessage='Password' />
                  </InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={values.password}
                    id='form-layouts-separator-password'
                    onChange={handlePasswordChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='form-layouts-separator-password-2'>
                    <FormattedMessage id='confirm-password' defaultMessage='Confirm Password' />
                  </InputLabel>
                  <OutlinedInput
                    value={values.password2}
                    label='Confirm Password'
                    id='form-layouts-separator-password-2'
                    onChange={handleConfirmChange('password2')}
                    type={values.showPassword2 ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {values.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
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
              {/* <Grid item xs={12} sm={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => setDate(date)}
              />
            </Grid> */}
              {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Language</InputLabel>
                <Select
                  multiple
                  value={language}
                  onChange={handleSelectChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Language' id='select-multiple-language' />}
                >
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='Spanish'>Spanish</MenuItem>
                  <MenuItem value='Portuguese'>Portuguese</MenuItem>
                  <MenuItem value='Italian'>Italian</MenuItem>
                  <MenuItem value='German'>German</MenuItem>
                  <MenuItem value='Arabic'>Arabic</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='role' defaultMessage='role' />
                  </InputLabel>
                  <Select
                    label='Role'
                    defaultValue={role}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setRole(event.target.value)
                    }}
                  >
                    <MenuItem value='1'>Administrador</MenuItem>
                    <MenuItem value='2'>Admonistrador empresa</MenuItem>
                    <MenuItem value='3'>Auxiliar</MenuItem>
                    <MenuItem value='4'>Tecnico</MenuItem>
                    <MenuItem value='5'>Cliente</MenuItem>
                  </Select>
                </FormControl>
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
      </Card>
    </>
  )
}

export default FormCreateUser
