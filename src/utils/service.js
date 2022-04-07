/**
 * Author: Prit Ajaykumar Sorathiya - B00890175
 */

import * as PATH from './string'

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

export const SERVICE_CATEGORY = [
  {
    serviceCategory: 'Beauty',
    serviceList: [
      'Haircut',
      'Head Massage',
      'Hair Coloring',
      'Spa',
      'Facial',
      'Body Massage',
    ],
  },
  {
    title: 'Home',
    serviceList: [
      'Home Decoration',
      'Home Cleaning',
      'Home Renovation',
      'Home Repair',
    ],
  },
  {
    title: 'Health',
    serviceList: ['Dental', 'Medical', 'Diet', 'Fitness'],
  },
]
