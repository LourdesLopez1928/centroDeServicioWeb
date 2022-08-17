// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CompanyDomain from 'mdi-material-ui/Domain'
import AccountBox from 'mdi-material-ui/AccountBox'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ConditionalRender from 'src/@core/components/ConditionalRender'
import UseSession from 'src/@core/context/session'
import { FormattedMessage } from 'react-intl'
import { IoFolderOpenSharp,IoHammerSharp,IoConstructSharp,IoIdCardSharp,IoReceiptSharp,IoReaderSharp } from "react-icons/io5";


// TODO: Menu lateral
const navigation = () => {
  const { session } = UseSession()
  console.log('Log de session: ')
  let role = session?.data?.me?.role

  // super Admin
  if (role === 1) {
    return [
      // {
      //   title: 'Dashboard',
      //   icon: HomeOutline,
      //   path: '/dashboard'
      // },
      {
        title: 'Empresas',
        icon: CompanyDomain,
        path: '/admin/companies'
      },

      // {
      //   title: 'Sucursales',
      //   icon: AccountGroupOutline,
      //   path: '/account-settings'
      // },
      {
        title: 'Usuarios',
        icon: AccountBox,
        path: '/users'
      },
        {
        sectionTitle: '.'
      },
      {
        title: <FormattedMessage id='terms-and-conditions' defaultMessage='Terms' />,
        icon: IoReceiptSharp,
        path: 'https://versel.s3.us-east-2.amazonaws.com/documents/T%C3%89RMINOS+Y+CONDICIONES.pdf'
      },
      {
        title: <FormattedMessage id='privacyti' defaultMessage='Aviso' />,
        icon: IoReaderSharp,
        path: 'https://versel.s3.us-east-2.amazonaws.com/documents/AVISO+DE+PRIVACIDAD+PROVEEDORES.pdf'
      }

      // {
      //   sectionTitle: 'Pages'
      // },
      // {
      //   title: 'Login',
      //   icon: Login,
      //   path: '/pages/login',
      //   openInNewTab: true
      // },
      // {
      //   title: 'Register',
      //   icon: AccountPlusOutline,
      //   path: '/pages/register',
      //   openInNewTab: true
      // },
      // {
      //   title: 'Error',
      //   icon: AlertCircleOutline,
      //   path: '/pages/error',
      //   openInNewTab: true
      // },
      // {
      //   sectionTitle: 'User Interface'
      // },
      // {
      //   title: 'Typography',
      //   icon: FormatLetterCase,
      //   path: '/typography'
      // },
      // {
      //   title: 'Icons',
      //   path: '/icons',
      //   icon: GoogleCirclesExtended
      // },
      // {
      //   title: 'Cards',
      //   icon: CreditCardOutline,
      //   path: '/cards'
      // },
      // {
      //   title: 'Tables',
      //   icon: Table,
      //   path: '/tables'
      // },
      // {
      //   icon: CubeOutline,
      //   title: 'Form Layouts',
      //   path: '/form-layouts'
      // }
    ]
  }

  // Admin Company
  if (role === 2) {
  }

  // Technical
  if (role === 3) {
    return [
      {
        title: 'Ordenes',
        icon: CompanyDomain,
        path: '/technical-orders'
      },
      {
      sectionTitle: '.'
    },
    {
      title: <FormattedMessage id='terms-and-conditions' defaultMessage='Terms' />,
      icon: IoReceiptSharp,
      path: 'https://versel.s3.us-east-2.amazonaws.com/documents/T%C3%89RMINOS+Y+CONDICIONES.pdf'
    },
    {
      title: <FormattedMessage id='privacyti' defaultMessage='Aviso' />,
      icon: IoReaderSharp,
      path: 'https://versel.s3.us-east-2.amazonaws.com/documents/AVISO+DE+PRIVACIDAD+PROVEEDORES.pdf'
    }
    ]
  }

  // Secretary
  if (role === 4) {
    return [
      {
        title: <FormattedMessage id='vertical-user' defaultMessage='Users' />,
        icon: AccountBox,
        path: '/users'
      },
      {
        title: <FormattedMessage id='vertical-order' defaultMessage='Orders' />,
        icon: IoFolderOpenSharp,
        path: '/orders'
      },
      {
        title: <FormattedMessage id='vertical-spareparts' defaultMessage='Spareparts' />,
        icon: IoHammerSharp ,
        path: '/spareparts'
      },
      {
        title: <FormattedMessage id='vertical-machines' defaultMessage='Machines' />,
        icon: IoConstructSharp,
        path: '/machines'
      },
      {
        title: <FormattedMessage id='vertical-customers' defaultMessage='Customers' />,
        icon: IoIdCardSharp,
        path: '/customers'
      },
        {
        sectionTitle: '.'
      },
      {
        title: <FormattedMessage id='terms-and-conditions' defaultMessage='Terms' />,
        icon: IoReceiptSharp,
        path: 'https://versel.s3.us-east-2.amazonaws.com/documents/T%C3%89RMINOS+Y+CONDICIONES.pdf'
      },
      {
        title: <FormattedMessage id='privacyti' defaultMessage='Aviso' />,
        icon: IoReaderSharp,
        path: 'https://versel.s3.us-east-2.amazonaws.com/documents/AVISO+DE+PRIVACIDAD+PROVEEDORES.pdf'
      }
    ]
  }

  // client
  if (role === 5) {
  }
}

export default navigation
