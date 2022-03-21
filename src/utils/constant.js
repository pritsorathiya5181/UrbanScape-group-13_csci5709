//customer- navbar
export const PAGES = ['Services', 'Offers', 'Reviews', 'FAQs', 'Support']
export const PROFILE_SETTINGS = ['My Profile', 'My Order History', 'Login']

//professional-navbar
export const PROFESSIONAL_PAGES = ['Services', 'Schedule']
export const PROFESSIONAL_PROFILE_SETTINGS = ['My Profile', 'Logout']

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

//professional-servicelist
export const SERVICE_LIST = [
  {
    serviceId: 1,
    serviceCategory: 'Hair Cutting',
    serviceLocation: 'Quinpool Rd',
    serviceTime: '10.30AM - 12.00PM',
    serviceCost: '14',
    serviceImage: [
      {
        photoId: 1,
        isPhoto: true,
        photoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
      },
      {
        photoId: 0,
        isPhoto: false,
      },
    ],
    serviceDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
  },
  {
    serviceId: 2,
    serviceCategory: 'Home Decoration',
    serviceLocation: 'Joseph Howe dr',
    serviceTime: '11.30AM - 01.00PM',
    serviceCost: '12',
    serviceImage: [
      {
        photoId: 1,
        isPhoto: true,
        photoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
      },
      {
        photoId: 0,
        isPhoto: false,
      },
    ],
    serviceDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
  },
  {
    serviceId: 3,
    serviceCategory: 'Personal Beauty',
    serviceLocation: 'South park rd',
    serviceTime: '11.30AM - 02.00PM',
    serviceCost: '16',
    serviceImage: [
      {
        photoId: 1,
        isPhoto: true,
        photoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
      },
      {
        photoId: 0,
        isPhoto: false,
      },
    ],
    serviceDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
  },
  {
    serviceId: 4,
    serviceCategory: 'Spa',
    serviceLocation: 'Quinpool Rd',
    serviceTime: '10.30AM - 12.00PM',
    serviceCost: '12',
    serviceImage: [
      {
        photoId: 1,
        isPhoto: true,
        photoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
      },
      {
        photoId: 0,
        isPhoto: false,
      },
    ],
    serviceDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
  },
  {
    serviceId: 5,
    serviceCategory: 'Hair Cutting',
    serviceLocation: 'Quinpool Rd',
    serviceTime: '10.30AM - 12.00PM',
    serviceCost: '16',
    serviceImage: [
      {
        photoId: 1,
        isPhoto: true,
        photoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
      },
      {
        photoId: 0,
        isPhoto: false,
      },
    ],
    serviceDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
  },
  {
    serviceId: 6,
    serviceCategory: 'Hair Cutting',
    serviceLocation: 'Quinpool Rd',
    serviceTime: '10.30AM - 12.00PM',
    serviceCost: '18',
    serviceImage: [
      {
        photoId: 1,
        isPhoto: true,
        photoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
      },
      {
        photoId: 0,
        isPhoto: false,
      },
    ],
    serviceDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
  },
]
