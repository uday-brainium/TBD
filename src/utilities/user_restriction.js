import {Base_url, live_url} from './config'
let host = window.location.hostname
let base_url

if(host == "localhost") {
  base_url = 'http://localhost:3000'
} else {
  base_url = live_url
}
export const checkPermission = (props, page) => {
    console.log("page", page);
    console.log("props", props);
    
    let restrictManagerPages = [
        '/list_sub_users',
        '/add-business-profile',
        '/editprofile',
    ]
    let restrictAssociatePages = [
        '/list_sub_users',
        '/add-business-profile',
        '/editprofile',
        '/events',
        '/edit_event'
    ]

    let privilege = localStorage.getItem('subuser-access')
    if(privilege == 'manager'){
      let isRestrict = restrictManagerPages.includes(page)
      if(isRestrict){
        window.location = `${base_url}/permission_denied`;
      }
    } else if(privilege == 'associate') {
      let isRestrict = restrictAssociatePages.includes(page)
  
      if(isRestrict){
        window.location = `${base_url}/permission_denied`;
      }
      console.log(isRestrict);
    } else {
      console.log(page);
    }
  
}