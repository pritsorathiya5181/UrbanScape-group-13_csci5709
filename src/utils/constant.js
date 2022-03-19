//customer- navbar
export const pages = ['Services', 'Offers', 'Reviews', 'FAQs', 'Support']
export const profileSettings = ['My Profile', 'My Order History', 'Login']

//professional-navbar
export const professionalPages = ['Services', 'Schedule']
export const professionalProfileSetting = ['My Profile', 'Logout']

//professional-servicerequest-listing-tableheaders
export const SERVICE_REQUEST_HEADERS = [
  { id: 'serviceNo', label: 'No.', minWidth: '10%' },
  { id: 'serviceName', label: 'Service name', minWidth: 100 },
  {
    id: 'customerName',
    label: 'Customer name',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'customerLocation',
    label: 'Customer Location',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'mobileNo',
    label: 'Mobile No',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
]
