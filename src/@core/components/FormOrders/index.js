// ** React Imports
import { forwardRef, useEffect, useState } from 'react'
import { Box, styled, Typography } from '@mui/material'

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
import { orderService } from '../../../services/orders.service'
import useSession from 'src/@core/context/session'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import { userService } from 'src/services'
import { customerService } from 'src/services/customer.service'
import { machinesService } from 'src/services/machines.service'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

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

const FormCreateOrder = () => {
  const { formatMessage } = useIntl()
  const { session } = useSession()

  // ** States
  const [idUser, setIdUser] = useState(null)
  const [idMachine, setIdMachine] = useState(null)
  const [serialNumber, setSerialNumber] = useState(null)
  const [typeMachine, setTypeMachine] = useState(null)
  const [brand, setBrand] = useState(null)
  const [model, setModel] = useState(null)
  const [notes, setNotes] = useState(null)
  const [warranty, setWarranty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sessionToken, setSessionToken] = useState('')
  const [listcustomer, setCustomer] = useState([])
  const [listmachines, setMachines] = useState([])
  const [formTwoo, setFormTwoo] = useState([])
  const [formThree, setformThree] = useState([])
  const [formFour, setFormFour] = useState([])
  const [formFive, setFormFive] = useState([])
  const [formSix, setFormSix] = useState([])
  const [closeModal, setIsCloseModal] = useState(false)

  // ----------------------------------------------------------
  const [idMachine2, setIdMachine2] = useState(null)
  const [serialNumber2, setSerialNumber2] = useState(null)
  const [typeMachine2, setTypeMachine2] = useState(null)
  const [brand2, setBrand2] = useState(null)
  const [model2, setModel2] = useState(null)
  const [notes2, setNotes2] = useState(null)
  const [warranty2, setWarranty2] = useState(false)

  // ----------------------------------------------------------
  const [idMachine3, setIdMachine3] = useState(null)
  const [serialNumber3, setSerialNumber3] = useState(null)
  const [typeMachine3, setTypeMachine3] = useState(null)
  const [brand3, setBrand3] = useState(null)
  const [model3, setModel3] = useState(null)
  const [notes3, setNotes3] = useState(null)
  const [warranty3, setWarranty3] = useState(false)

  // ----------------------------------------------------------
  const [idMachine4, setIdMachine4] = useState(null)
  const [serialNumber4, setSerialNumber4] = useState(null)
  const [typeMachine4, setTypeMachine4] = useState(null)
  const [brand4, setBrand4] = useState(null)
  const [model4, setModel4] = useState(null)
  const [notes4, setNotes4] = useState(null)
  const [warranty4, setWarranty4] = useState(false)

  // ----------------------------------------------------------
  const [idMachine5, setIdMachine5] = useState(null)
  const [serialNumber5, setSerialNumber5] = useState(null)
  const [typeMachine5, setTypeMachine5] = useState(null)
  const [brand5, setBrand5] = useState(null)
  const [model5, setModel5] = useState(null)
  const [notes5, setNotes5] = useState(null)
  const [warranty5, setWarranty5] = useState(false)

  // ----------------------------------------------------------
  // ----------------------------------------------------------

  useEffect(async () => {
    setSessionToken(sessionStorage.getItem('token'))
    const { customers, status } = await customerService.getAll(sessionStorage.getItem('token'))
    setCustomer(customers)
    const { machines, status: statusMachine } = await machinesService.getAll(sessionStorage.getItem('token'))
    setMachines(machines)
  }, [sessionToken])

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

    // Obetener el equipo Seleccionado
    let machine = {}
    let machine2 = {}
    let machine3 = {}
    let machine4 = {}
    let machine5 = {}

    if (idMachine == 1) {
      await machinesService.create(sessionToken, { brand: brand, model: model, type: typeMachine })
    } else {
      const { machine: m1 } = await machinesService.getById(sessionToken, idMachine)
      machine = m1
    }
    if (idMachine2 == 1) {
      await machinesService.create(sessionToken, { brand: brand2, model: model2, type: typeMachine2 })
    } else {
      const { machine: m2 } = await machinesService.getById(sessionToken, idMachine2)
      machine2 = m2
    }

    // const { machine:m3 } = await machinesService.getById(sessionToken, idMachine3)
    // machine3 = m3
    // if (idMachine3 == 1) {

    //   await machinesService.create(sessionToken, { brand: brand3, model: model3, type: typeMachine3 })
    // }
    // const { machine:m4 } = await machinesService.getById(sessionToken, idMachine4)
    // machine4 = m4
    // if (idMachine4 == 1) {

    //   await machinesService.create(sessionToken, { brand: brand4, model: model4, type: typeMachine4 })
    // }
    // const { machine:m5 } = await machinesService.getById(sessionToken, idMachine5)
    // machine5 = m5
    // if (idMachine5 == 1) {

    //   await machinesService.create(sessionToken, { brand: brand5, model: model5, type: typeMachine5 })
    // }

    let obeject2 = {
      serialNumber: serialNumber2,
      type: idMachine2 == 1 ? typeMachine2 : machine2.type,
      brand: idMachine2 == 1 ? brand2 : machine2.brand,
      model: idMachine2 == 1 ? model2 : machine2.model,
      notes: notes2,
      warranty: warranty2
    }

    // let obeject3 ={
    //   serialNumber: serialNumber3,
    //   type: idMachine3 == 1 ? typeMachine3 : machine3.type,
    //   brand: idMachine3 == 1 ? brand3 : machine3.brand,
    //   model: idMachine3 == 1 ? model3 : machine3.model,
    //   notes: notes3,
    //   warranty: warranty3
    // }

    // let obeject4 ={
    //   serialNumber: serialNumber4,
    //   type: idMachine4 == 1 ? typeMachine4 : machine4.type,
    //   brand: idMachine4 == 1 ? brand4 : machine4.brand,
    //   model: idMachine4 == 1 ? model4 : machine4.model,
    //   notes: notes4,
    //   warranty: warranty4
    // }

    // let obeject5 ={
    //   serialNumber: serialNumber5,
    //   type: idMachine5 == 1 ? typeMachine5 : machine5.type,
    //   brand: idMachine5 == 1 ? brand5 : machine5.brand,
    //   model: idMachine5 == 1 ? model5 : machine5.model,
    //   notes: notes5,
    //   warranty: warranty5
    // }

    const object = {
      customerId: idUser,
      registeredId: session.data.me._id,
      branchId: session.data.me.company[0]._id,
      machines: [
        {
          // technicianId: '',
          serialNumber: serialNumber,
          type: idMachine == 1 ? typeMachine : machine.type,
          brand: idMachine == 1 ? brand : machine.brand,
          model: idMachine == 1 ? model : machine.model,
          notes: notes,
          warranty: warranty
        }
      ]
    }

    if (formTwoo == true) {
      object.machines.push(obeject2)
    }

    // if (formThree == true) {
    //   object.machines.push(obeject3)
    // }
    // if (formFour == true) {
    //   object.machines.push(obeject4)
    // }
    // if (formFive == true) {
    //   object.machines.push(obeject5)
    // }
    console.log(object)
    const { data, status } = await orderService.create(sessionToken, object)
    console.log(data, status)

    if (status === 'success') {
      setTimeout(() => {
        setLoading(false)

        // Retornar a listar ordenes
      }, 1500)
    }
  }

  const canceldForm = () => {
    console.log('canceldForm')
    setSerialNumber(null)
    setTypeMachine(null)
    setBrand(null)
    setModel(null)
    setNotes(null)
    setWarranty(null)
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  const activateFormTwoo = () => {
    setFormTwoo(true)
  }

  const activateFormThree = () => {
    setformThree(true)
  }

  const activateFormFour = () => {
    setFormFour(true)
  }

  const activateFormFive = () => {
    setFormFive(true)
  }

  const activateFormSix = () => {
    setFormSix(true)
  }

  const desactiveteFormTwoo = () => {
    setFormTwoo(false)
  }

  const desactiveteFormThree = () => {
    setformThree(false)
  }

  const desactiveteFormFour = () => {
    setFormFour(false)
  }

  const desactiveteFormFive = () => {
    setFormFive(false)
  }

  const desactiveteFormSix = () => {
    setFormSix(false)
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
                  <FormattedMessage id='orders-tittle' defaultMessage='Orders' />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='client-label' defaultMessage='Client' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'client-label',
                      defaultMessage: 'Client'
                    })}
                    defaultValue={idUser}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setIdUser(event.target.value)
                    }}
                  >
                    {listcustomer.map(data => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.name} {data.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='machine-name' defaultMessage='Equipo' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Equipo'
                    })}
                    defaultValue={idMachine}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setIdMachine(event.target.value)
                    }}
                  >
                    {listmachines.map(data => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.type} {data.model}
                      </MenuItem>
                    ))}
                    <MenuItem value={1}>N/A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <ConditionalRender cond={idMachine == 1}>
                {/* ------------------------------------ */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Name'
                    })}
                    placeholder=''
                    value={typeMachine}
                    onChange={event => {
                      setTypeMachine(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'brand',
                      defaultMessage: 'Marca'
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
                    type='text'
                    label={formatMessage({
                      id: 'model',
                      defaultMessage: 'Modelo'
                    })}
                    placeholder=''
                    value={model}
                    onChange={event => {
                      setModel(event.target.value)
                    }}
                  />
                </Grid>

                {/* ------------------------------------ */}
              </ConditionalRender>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'serial-part',
                    defaultMessage: 'Serial number'
                  })}
                  placeholder=''
                  value={serialNumber}
                  onChange={event => {
                    setSerialNumber(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='warranty' defaultMessage='Garantia' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'warranty',
                      defaultMessage: 'Garantia'
                    })}
                    defaultValue={warranty}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setWarranty(event.target.value)
                    }}
                  >
                    <MenuItem value={true}>SI</MenuItem>
                    <MenuItem value={false}>NO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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

              <ConditionalRender cond={formTwoo == false}>
                <Grid item xs={12}>
                  <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={activateFormTwoo}>
                    <FormattedMessage id='add' defaultMessage='Agregar' />
                  </Button>
                </Grid>
              </ConditionalRender>

              {/* --------------------------------Formulario 2---------------------------------------- */}
              <ConditionalRender cond={formTwoo == true}>
                <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    <FormattedMessage id='tools-2' defaultMessage='Equipo 2' />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>
                      <FormattedMessage id='machine-name' defaultMessage='Equipo' />
                    </InputLabel>
                    <Select
                      label={formatMessage({
                        id: 'machine-name',
                        defaultMessage: 'Equipo'
                      })}
                      defaultValue={idMachine2}
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      onChange={event => {
                        setIdMachine2(event.target.value)
                      }}
                    >
                      {listmachines.map(data => (
                        <MenuItem key={data._id} value={data._id}>
                          {data.type} {data.model}
                        </MenuItem>
                      ))}
                      <MenuItem value={1}>N/A</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <ConditionalRender cond={idMachine2 == 1}>
                  {/* ------------------------------------ */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='text'
                      label={formatMessage({
                        id: 'machine-name',
                        defaultMessage: 'Name'
                      })}
                      placeholder=''
                      value={typeMachine2}
                      onChange={event => {
                        setTypeMachine2(event.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='text'
                      label={formatMessage({
                        id: 'brand',
                        defaultMessage: 'Marca'
                      })}
                      placeholder=''
                      value={brand2}
                      onChange={event => {
                        setBrand2(event.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='text'
                      label={formatMessage({
                        id: 'model',
                        defaultMessage: 'Modelo'
                      })}
                      placeholder=''
                      value={model2}
                      onChange={event => {
                        setModel2(event.target.value)
                      }}
                    />
                  </Grid>
                </ConditionalRender>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={formatMessage({
                      id: 'serial-part',
                      defaultMessage: 'Serial number'
                    })}
                    placeholder=''
                    value={serialNumber2}
                    onChange={event => {
                      setSerialNumber2(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>
                      <FormattedMessage id='warranty' defaultMessage='Garantia' />
                    </InputLabel>
                    <Select
                      label={formatMessage({
                        id: 'warranty',
                        defaultMessage: 'Garantia'
                      })}
                      defaultValue={warranty2}
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      onChange={event => {
                        setWarranty2(event.target.value)
                      }}
                    >
                      <MenuItem value={true}>SI</MenuItem>
                      <MenuItem value={false}>NO</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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
                    defaultValue={notes2}
                    onChange={event => {
                      setNotes2(event.target.value)
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
                <CardActions>
                  {/* <Grid item xs={12}> */}
                    {/* <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={activateFormThree}>
                      <FormattedMessage id='add' defaultMessage='Agregar' />
                    </Button>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={desactiveteFormTwoo}>
                      <FormattedMessage id='cancel-btn' defaultMessage='Cancelar' />
                    </Button>
                  </Grid>
                </CardActions>
              </ConditionalRender>
              {/* --------------------------------Fin Formulario 2---------------------------------------- */}

              {/* --------------------------------Formulario 3---------------------------------------- */}
              {/* <ConditionalRender cond={formThree == true}>

                   <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    <FormattedMessage id='tools-3' defaultMessage='Equipo 3' />
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='machine-name' defaultMessage='Equipo' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Equipo'
                    })}
                    defaultValue={idMachine3}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setIdMachine3(event.target.value)
                    }}
                  >
                    {listmachines.map(data => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.type} {data.model}
                      </MenuItem>
                    ))}
                    <MenuItem value={1}>N/A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <ConditionalRender cond={idMachine3 == 1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Name'
                    })}
                    placeholder=''
                    value={typeMachine3}
                    onChange={event => {
                      setTypeMachine3(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'brand',
                      defaultMessage: 'Marca'
                    })}
                    placeholder=''
                    value={brand3}
                    onChange={event => {
                      setBrand3(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'model',
                      defaultMessage: 'Modelo'
                    })}
                    placeholder=''
                    value={model3}
                    onChange={event => {
                      setModel3(event.target.value)
                    }}
                  />
                </Grid>

              </ConditionalRender>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'serial-part',
                    defaultMessage: 'Serial number'
                  })}
                  placeholder=''
                  value={serialNumber3}
                  onChange={event => {
                    setSerialNumber3(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='warranty' defaultMessage='Garantia' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'warranty',
                      defaultMessage: 'Garantia'
                    })}
                    defaultValue={warranty3}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setWarranty3(event.target.value)
                    }}
                  >
                    <MenuItem value={true}>SI</MenuItem>
                    <MenuItem value={false}>NO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
                  defaultValue={notes3}
                  onChange={event => {
                    setNotes3(event.target.value)
                  }}
                />
              </Grid>


              <CardActions>
                  <Grid item xs={12}>
                  <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={activateFormFour}>
                    <FormattedMessage id='add' defaultMessage='Agregar' />
                  </Button>
                  </Grid>
                  <Grid item xs={12}>
                  <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={desactiveteFormThree}>
                    <FormattedMessage id='cancel-btn' defaultMessage='Cancelar' />
                  </Button>
                </Grid>
                </CardActions>
                  </ConditionalRender> */}

              {/* --------------------------------Fin Formulario 3---------------------------------------- */}

              {/* --------------------------------Formulario 4---------------------------------------- */}
              {/* <ConditionalRender cond={formFour == true}>
                     <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    <FormattedMessage id='tools-4' defaultMessage='Equipo 4' />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='machine-name' defaultMessage='Equipo' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Equipo'
                    })}
                    defaultValue={idMachine4}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setIdMachine4(event.target.value)
                    }}
                  >
                    {listmachines.map(data => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.type} {data.model}
                      </MenuItem>
                    ))}
                    <MenuItem value={1}>N/A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <ConditionalRender cond={idMachine4 == 1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Name'
                    })}
                    placeholder=''
                    value={typeMachine4}
                    onChange={event => {
                      setTypeMachine4(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'brand',
                      defaultMessage: 'Marca'
                    })}
                    placeholder=''
                    value={brand4}
                    onChange={event => {
                      setBrand4(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'model',
                      defaultMessage: 'Modelo'
                    })}
                    placeholder=''
                    value={model4}
                    onChange={event => {
                      setModel4(event.target.value)
                    }}
                  />
                </Grid>

              </ConditionalRender>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'serial-part',
                    defaultMessage: 'Serial number'
                  })}
                  placeholder=''
                  value={serialNumber4}
                  onChange={event => {
                    setSerialNumber4(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='warranty' defaultMessage='Garantia' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'warranty',
                      defaultMessage: 'Garantia'
                    })}
                    defaultValue={warranty4}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setWarranty4(event.target.value)
                    }}
                  >
                    <MenuItem value={true}>SI</MenuItem>
                    <MenuItem value={false}>NO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
                  defaultValue={notes4}
                  onChange={event => {
                    setNotes4(event.target.value)
                  }}
                />
              </Grid>
              <CardActions>
              <Grid item xs={12}>
            <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={activateFormFive}>
              <FormattedMessage id='add' defaultMessage='Agregar' />
            </Button>
            </Grid>               
                <Grid item xs={12}>
                  <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={desactiveteFormFour}>
                    <FormattedMessage id='cancel-btn' defaultMessage='Cancelar' />
                  </Button>
                </Grid>
                </CardActions>

            </ConditionalRender> */}
              {/* --------------------------------Fin Formulario 4---------------------------------------- */}

              {/* --------------------------------Formulario 5---------------------------------------- */}
              {/* <ConditionalRender cond={formFive == true}>

                       <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    <FormattedMessage id='tools-5' defaultMessage='Equipo 5' />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='machine-name' defaultMessage='Equipo' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Equipo'
                    })}
                    defaultValue={idMachine5}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setIdMachine5(event.target.value)
                    }}
                  >
                    {listmachines.map(data => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.type} {data.model}
                      </MenuItem>
                    ))}
                    <MenuItem value={1}>N/A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <ConditionalRender cond={idMachine5 == 1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'machine-name',
                      defaultMessage: 'Name'
                    })}
                    placeholder=''
                    value={typeMachine5}
                    onChange={event => {
                      setTypeMachine5(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'brand',
                      defaultMessage: 'Marca'
                    })}
                    placeholder=''
                    value={brand5}
                    onChange={event => {
                      setBrand5(event.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label={formatMessage({
                      id: 'model',
                      defaultMessage: 'Modelo'
                    })}
                    placeholder=''
                    value={model5}
                    onChange={event => {
                      setModel5(event.target.value)
                    }}
                  />
                </Grid>

              </ConditionalRender>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={formatMessage({
                    id: 'serial-part',
                    defaultMessage: 'Serial number'
                  })}
                  placeholder=''
                  value={serialNumber5}
                  onChange={event => {
                    setSerialNumber5(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>
                    <FormattedMessage id='warranty' defaultMessage='Garantia' />
                  </InputLabel>
                  <Select
                    label={formatMessage({
                      id: 'warranty',
                      defaultMessage: 'Garantia'
                    })}
                    defaultValue={warranty5}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={event => {
                      setWarranty5(event.target.value)
                    }}
                  >
                    <MenuItem value={true}>SI</MenuItem>
                    <MenuItem value={false}>NO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
                  defaultValue={notes5}
                  onChange={event => {
                    setNotes5(event.target.value)
                  }}

                />
              </Grid>
              <CardActions>
                <Grid item xs={12}>
                  <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={desactiveteFormFive}>
                    <FormattedMessage id='cancel-btn' defaultMessage='Cancelar' />
                  </Button>
                </Grid>
                </CardActions>

                  </ConditionalRender> */}

              {/* --------------------------------Fin Formulario 5---------------------------------------- */}

              {/* <Grid item xs={12}>
            <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={savedForm}>
              <FormattedMessage id='add' defaultMessage='Agregar' />
            </Button>
            </Grid> */}
              {/* <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  <FormattedMessage id='personal-info' defaultMessage='Personal info' />
                </Typography>
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
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
            <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={savedForm}>
              <FormattedMessage id='saved-btn' defaultMessage='Guardar' />
            </Button>
            <Button size='small' color='secondary' variant='outlined' onClick={canceldForm}>
              <FormattedMessage id='cancel-btn' defaultMessage='Cancelar' />
            </Button>
          </CardActions>
        </form>
        {/* <SubmitFirebase /> */}
      </Card>
    </>
  )
}

export default FormCreateOrder
