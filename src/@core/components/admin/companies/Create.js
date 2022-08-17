// ** React Imports
import { useState, useReducer } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { FormattedMessage, useIntl } from 'react-intl'
import LoadingSpinner from 'src/@core/components/LoadingData'
import useSession from 'src/@core/context/session'

// ** Icons Imports
import _assign from 'lodash/assign'
import _get from 'lodash/get'
import _set from 'lodash/set'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import { companyService } from '../../../../services/company.service'

const FormCreateCompany = ({ closeModal }) => {

  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
  }

  // ** States
  const { session } = useSession()
  const { formatMessage } = useIntl()
  const [formData, setFormData] = useReducer(formReducer, {})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    const params = {
      rfc: formData.rfc,
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      personType: formData.personType,
      userId: _get(session, 'data.me._id'),
    }

    const { status } = await companyService.create(sessionStorage.getItem('token'), params)
    
    if (status === 'success') {
      setLoading(false)
      closeModal()
    }
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    })
  }

  return (
    <>
      <Card>
        <ConditionalRender cond={loading}>
          <LoadingSpinner openSpinner={true} />
        </ConditionalRender>

        <CardHeader
          title={<FormattedMessage id='create-company' defaultMessage='Create' />}
          titleTypographyProps={{ variant: 'h7' }}
        />
        <Divider sx={{ margin: 0 }} />

        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  type='text'
                  size='small'
                  label={formatMessage({
                    id: 'name_or_fiscal_name',
                    defaultMessage: 'name'
                  })}
                  placeholder=''
                  required={true}
                  value={formData.name || ''}
                  name='name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  type='text'
                  size='small'
                  label={formatMessage({
                    id: 'rfc',
                    defaultMessage: 'RFC'
                  })}
                  required={true}
                  placeholder=''
                  value={formData.rfc || ''}
                  name='rfc'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='type-person' defaultMessage='type-person' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'type-person',
                      defaultMessage: 'Person type'
                    })}
                    size='small'
                    required={true}

                    // defaultValue={formData.typePerson || ''}
                    value={formData.personType || ''}
                    name='personType'
                    onChange={handleChange}
                  >
                    <MenuItem value='Moral'>Moral</MenuItem>
                    <MenuItem value='Física'>Fisica</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  type='text'
                  size='small'
                  label={formatMessage({
                    id: 'address',
                    defaultMessage: 'address'
                  })}
                  required={true}
                  placeholder=''
                  value={formData.address || ''}
                  name='address'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='small'
                    label={formatMessage({
                      id: 'phone',
                      defaultMessage: 'Phone'
                    })}
                    required={true}
                    placeholder='3301987652'
                    value={formData.phone || ''}
                    name='phone'
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size='small'
                    label={formatMessage({
                      id: 'email',
                      defaultMessage: 'Email'
                    })}
                    required={true}
                    placeholder='3301987652'
                    value={formData.email || ''}
                    name='email'
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size='medium' type='submit' sx={{ mr: 2 }} variant='contained'>
              <FormattedMessage id='add-btn' defaultMessage='Guardar' />
            </Button>
            <Button size='medium' color='secondary' variant='outlined' onClick={closeModal}>
              <FormattedMessage id='cancel-btn' defaultMessage='Cancelar' />
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  )
}

export default FormCreateCompany
