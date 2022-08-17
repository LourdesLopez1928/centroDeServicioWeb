import withAuth from 'src/middleware/withAuth'
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import { FormattedMessage, useIntl } from 'react-intl'
import {IoAlbumsSharp,IoAttachOutline } from "react-icons/io5";

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// TODO: crearlo aun no existe
import ListOrder from 'src/views/order-views/ListOrder'

// ** Demo Tabs Imports
import CreateOrderView from 'src/views/order-views/CreateOrder'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Orders = () => {
  const { formatMessage } = useIntl()

  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='account'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IoAttachOutline />
                  <TabName>
                    <FormattedMessage id='create-order' defaultMessage='Create Order' />
                  </TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IoAlbumsSharp />
                  <FormattedMessage id='list-order' defaultMessage='List Order' />
                </Box>
              }
            />
            {/* <Tab
              value='info'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InformationOutline />
                  <TabName>Info</TabName>
                </Box>
              }
            /> */}
          </TabList>

          <TabPanel sx={{ p: 0 }} value='account'>
            <CreateOrderView />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='security'>
            <ListOrder />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='info'>
            {/* <TabInfo /> */}
          </TabPanel>
        </TabContext>
      </Card>
    </>
  )
}

export default withAuth(Orders)
