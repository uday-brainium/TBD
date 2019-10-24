import ApiService from './../../../services/api'


export const update_guest = (userid, type, paymentInfo)  => {
    let guestData = {
        userid: userid,
        member_type: type,
        payment_info: paymentInfo
      }
      ApiService.update_guest(guestData)
      .then(res => res.json())
      .then((response) => {
        localStorage.setItem('guest-userdata', JSON.stringify(response.response))
        console.log('response',response);
      })
}