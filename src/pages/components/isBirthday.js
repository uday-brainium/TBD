
import moment from 'moment'
import ApiService from '../../services/api';


export const isBirthday = () => {
  const user = JSON.parse(localStorage.getItem('guest-userdata'))
  const bday = moment(user.dob).format('MM-DD')
  const today = moment().format('MM-DD')
  const after7day = moment().add(7, 'days').format('MM-DD')

  
//|| (bday > today && bday < days7)
  if(bday == today || (bday > today && bday < after7day) ) {
    return true
  } else {
    return false
  }
}
