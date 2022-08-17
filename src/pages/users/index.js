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
import {IoLayers } from "react-icons/io5";

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import ListUser from 'src/views/user-views/ListUser'

// ** Demo Tabs Imports
import CreateUser from 'src/views/user-views/CreateUser'

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

const Users = () => {
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
                  <AccountOutline />
                  <TabName>
                    <FormattedMessage id='create-user' defaultMessage='Create User' />
                  </TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IoLayers />
                  <FormattedMessage id='list-user' defaultMessage='List user' />
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
            <CreateUser />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='security'>
            <ListUser />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='info'>
            {/* <TabInfo /> */}
          </TabPanel>
        </TabContext>
      </Card>
    </>
  )
}

export default withAuth(Users)
