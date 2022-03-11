import * as PATH from './constant'

export const ServiceItem = [
  {
    title: 'My services',
    path: `${PATH.partnerBaseUrl}/myservices/`,
    className: 'dropdown-link',
  },
  {
    title: 'Service Requests',
    // path: `${PATH.partnerBaseUrl}/pendingservices/`,
    path: `/`,
    className: 'dropdown-link',
  },
]

export const ServiceCategory = [
  'Hair Cutting',
  'Home Decoration',
  'Personal Beauty',
  'Spa',
]
