// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import Collapse from '@mui/material/Collapse'

// import CloseIcon from '@mui/icons-material/IconButton';
import { FormattedMessage, useIntl } from 'react-intl'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
// import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// Services
import { userService } from '../../../services'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const { formatMessage } = useIntl()
  useEffect(() => {
    setUser({
      email: 'admin@gmail.com',
      password: '123456'
    })
  }, [])

  // ** State
  const [user, setUser] = useState({
    email: 'admin@gmail.com',
    password: '123456',
    showPassword: false
  })

  const [request, setRequest] = useState({
    loading: false,
    status: ''
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleAuthClick = async () => {
    setRequest({ ...request, loading: true })

    const { loading, status } = await userService.auth(user)

    setRequest({ ...request, loading, status })

    if (status === 'success') {
      router.push('/users')
    } else {
      setTimeout(() => {
        setRequest({ ...request, status: '' })
      }, 2000)
    }
  }

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.id

    setUser({
      ...user,
      [name]: value
    })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img alt={themeConfig.templateName} src='/images/logos/AdTools.png' />
           {/* <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>*/}
          </Box>
          <form autoComplete='off'>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label={formatMessage({
                id: 'email',
                defaultMessage: 'Email'
              })}
              sx={{ marginBottom: 4 }}
              value={user.email}
              onChange={handleInputChange}
              required
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='password'>
              <FormattedMessage id='password' defaultMessage='Password' />
              </InputLabel>
              <OutlinedInput
                label={formatMessage({
                  id: 'password',
                  defaultMessage: 'Password'
                })}
                id='password'
                required
                onChange={handleInputChange}
                value={user.password}
                type={user.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {user.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />}
              label={formatMessage({
                  id: 'remember-me',
                  defaultMessage: 'Remember Me'
                })} />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>
                <FormattedMessage id='forgot-password' defaultMessage='Forgot password' />
                </LinkStyled>
              </Link>
            </Box>

            <LoadingButton
              fullWidth
              size='large'
              sx={{ marginBottom: 7 }}
              loading={request.loading}
              loadingPosition='start'
              variant='outlined'
              onClick={handleAuthClick}
            >
               <FormattedMessage id='login' defaultMessage='Log In' />
            </LoadingButton>

            <Collapse in={request.status === 'error'}>
              <Alert severity='error'>
              <FormattedMessage id='incorrect-data' defaultMessage='Incorrect data' />
              </Alert>
            </Collapse>
          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
