import {MdMap} from 'react-icons/md'

export default {
  title: 'Countries',
  name: 'countries',
  icon: MdMap,
  type: 'document',
  fields: [
    {
      title: 'Country Name',
      name: 'countryName',
      type: 'string'
    },
    {
      title: 'Location',
      name: 'location',
      type: 'geopoint'
    },
    {
      title: 'Arrival Date',
      name: 'arrivalDate',
      type: 'date'
    },
    {
      title: 'Departure Date',
      name: 'departureDate',
      type: 'date'
    },
    {
      title: 'Times visited',
      name: 'timesVisited',
      type: 'number'
    },
    {
      title: 'Current Location?',
      name: 'currentLocation',
      type: 'boolean'
    }
  ]
}
