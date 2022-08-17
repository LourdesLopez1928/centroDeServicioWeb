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
import {IoCogSharp,IoConstruct } from "react-icons/io5";

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import ListSpareparts from 'src/views/apareparts-views/ListSpareparts'

// ** Demo Tabs Imports
import CreateSparePart from 'src/views/apareparts-views/CreateSparepart'

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

const SpareParts = () => {
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
                  <IoCogSharp />
                  <TabName>
                    <FormattedMessage id='sparepart-form' defaultMessage='Create Spareparts' />
                  </TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IoConstruct />
                  <FormattedMessage id='list-spareparts' defaultMessage='List Spareparts' />
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
            <CreateSparePart />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='security'>
            <ListSpareparts />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='info'>
            {/* <TabInfo /> */}
          </TabPanel>
        </TabContext>
      </Card>
    </>
  )
}

export default withAuth(SpareParts)
