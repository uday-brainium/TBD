import Config from "../config";
import axios from 'axios'
import moment from 'moment'
import qs from 'qs'
import SimpleCrypto from "simple-crypto-js";

var _secretKey = "doublesat_encryption_1231231239980";
var simpleCrypto = new SimpleCrypto(_secretKey);

let token = localStorage.getItem('access-token-tbd')
let secret_key = localStorage.getItem('stripe_secret_key')

let str = `Bearer ${secret_key}`
str = str.replace(/"/g,"");

const Authorization = str //`Bearer ${secret_key}`

console.log("SECRET_KEY", Authorization);

class ApiService {

  constructor() {
    console.log("consTRUCTOR");
    
  }


  static apiurl = "https://jsonplaceholder.typicode.com/";
  // static apilink = "http://162.243.110.92:6085/"

 static test() {
    console.log(Config.Api_Address);
  } 

  static getUsers(token) {
    return fetch(this.apiurl + "users", {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
  }

  // register
  static registration(userData) {
    return fetch(Config.Api_Address + "users/createuser", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
  }

  static chechEmailExist(email) {
    return fetch(Config.Api_Address + "users/check_email", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email})
    });
  }

  // login
  static login(email, password) {
    return fetch(Config.Api_Address + "users/login", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    });
  }

  // forget password
  static forgetPassword(email) {
    return fetch(Config.Api_Address + "users/forgetpassword", {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    });
  }

  // logout
  static logout(token) {
    return fetch(Config.Api_Address + "users/logout/?token=" + token, {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify({'email': email})
    });
  }

  // profile data
  static profileData(token1, userId) {

    return fetch(
      Config.Api_Address + "users/userdetails/"+userId+"?token="+token,
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }
    );
  }

  // update profile
  static updateProfile(token, body) {
    return fetch(Config.Api_Address + "users/edituser/?token=" + token, {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }

  // update picture
  static updateProfilePicture(token, userid, body) {
    return fetch(
      Config.Api_Address + "users/uploadimage/?token=" + token + "&type=user&id=" + userid,
      {
        method: "POST",
        /*headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)*/
        body: body
      }
    );
  }

  // change password
  static changePassword(token, body) {
    return fetch(Config.Api_Address + "users/changepassword/?token=" + token, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }

  // get profile details
  static getProfileDetails() {
    /*return fetch(Config.Api_Address+'users/changepassword/?token='+token,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })*/
  }

  // add business profile
  /*static addBusinessProfile(){
        return fetch(Config.Api_Address+'users/changepassword/?token='+token,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }*/

  static addmenu(menutitle, menudescription, user_id) {
    return fetch(Config.Api_Address + "users/create_menu", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        menutitle: menutitle,
        menudescription: menudescription,
        user_id: user_id
      })
    });
  }

  // Menu data
  /*static menuData(user_id) {
    console.log(user_id);
    return fetch(
      Config.Api_Address + "users/getAllMenu/" + user_id,
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  }*/

  /* static getUsers(token) {
     return fetch(this.apiurl + "users", {
       // mode: 'no-cors',
       method: "GET",
       headers: {
         Accept: "application/json"
       }
     });
   }*/

  static fetchmenuData(user_id, offset, limit, searchkey) {
    console.log(Config.Api_Address);
    return fetch(
      Config.Api_Address + "users/getAllMenu/",
      {
        // mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid: user_id,
          offset,
          limit,
          searchkey
        })
      }
    );
  }

  static getItems(menuid, offset, limit, searchkey, vegOnly, glutenFree) {
    console.log(Config.Api_Address);
    return fetch(
      Config.Api_Address + "users/get_items_by_id/",
      {
        // mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          menuid: menuid,
          offset,
          limit,
          searchkey,
          vegOnly,
          glutenFree  
        })
      }
    );
  }

  static toggleEnableItem(itemid, toggle) {
    
    return fetch(Config.Api_Address + "food/toggle_enable_item", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': token
      },
      body: JSON.stringify({itemid, toggle})
    });
  }


  static additem(option, itemtitle, itemdescription, itemcost, user_id, veg, glutenFree, ingredients) {
    return fetch(Config.Api_Address + "users/create_menuitem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        menuitem: option,
        itemtitle: itemtitle,
        itemdescription: itemdescription,
        itemcost: itemcost,
        is_veg: veg,
        glutenfree: glutenFree,
        user_id: user_id,
        ingredients: ingredients
      })
    });
  }


  static fetchmenuitemData(user_id, veg, glutenFree) {
    
    return fetch(
      //Config.Api_Address + "users/getitemAllMenu/" + user_id + "/?page=" + page + "&limit=5",
      Config.Api_Address + "users/getitemAllMenu/" + user_id+'?is_veg='+veg+'&gluten_free='+glutenFree+'',
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  }


  static fetchmenuitemDataforPagination(user_id, page) {
    console.log(Config.Api_Address);
    return fetch(
      Config.Api_Address + "users/getitemAllMenu/" + user_id + "/?page=" + page + "&limit=5",
      //Config.Api_Address + "users/getitemAllMenu/" + user_id,
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  }




  static deleteMenu(id) {
    let token = localStorage.getItem('access-token-tbd')
    return fetch(
      Config.Api_Address + "food/menudelete/" + id,
      {
        // mode: 'no-cors',
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
          _id: id
        })
      }
    );
  }

  static deleteItem(id) {
    let token = localStorage.getItem('access-token-tbd')
    return fetch(
      Config.Api_Address + "food/itemdelete/" + id,
      {
        // mode: 'no-cors',
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
          _id: id
        })
      }
    );
  }

  static updateItem(data) {
    let token = localStorage.getItem('access-token-tbd')
    return fetch(
      Config.Api_Address + "food/itemedit",
      {
        // mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(data)
      }
    );
  }
  static update_delivery_option(data) {
    let token = localStorage.getItem('access-token-tbd')
    return fetch(
      Config.Api_Address + "users/food_delivery",
      {
        // mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(data)
      }
    );
  }



  static getItembyID(id) {
    return fetch(
      Config.Api_Address + "users/menuitem_details/" + id,
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  }

  static getMenuDetailsID(menuid) {
    //console.log("from API page", menuid);
    return fetch(
      Config.Api_Address + "users/menu_details/" + menuid,
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  }


  // update Item
  static updatemenuitem(id, body) {
    return fetch(Config.Api_Address + "users/updatemenuitem/" + id, {
      // mode: 'no-cors',
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }

  // update Menu
  static updatemenubyID(id, body) {
    console.log(body);
    return fetch(Config.Api_Address + "users/updatemenu/" + id, {
      // mode: 'no-cors',
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }


  static searchmenu(menuid, itemtitle, user_id) {

    //Config.Api_Address +"users/uploadimage/?token=" +token +"&type=user&id=" +userid,
    //return fetch(Config.Api_Address + "users/getitemAllMenu/" + user_id, {
    return fetch(Config.Api_Address + "users/getitemAllMenu/" + user_id + "/?item=" + itemtitle + "&menu=" + menuid, {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }/*,
      body: JSON.stringify({
        menuitem: menuid,
        itemtitle: itemtitle,
        user_id: user_id
      })*/
    });
  }


  // update profile
  static editbusinessprofile(token, userid, data) {
    return fetch(Config.Api_Address + "users/editbusinessprofile/?token=" + token, {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'userid': userid, data})
    });
  }



  // static getBusinessProfbyUrl(url) {
  //   console.log("from API page", url);
  //   return fetch(
  //     Config.Api_Address + "business-profile/" + url,
  //     {
  //       // mode: 'no-cors',
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   );
  // }

  static getBusinessProfbyUrl(extension) {
    return fetch(
      Config.Api_Address + "users/fetch_store/",
      {
        // mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          extension
        })
      }
    );
  }

  static get_countries_list() {
    return fetch(
      Config.Api_Address + 'users/get_country_list',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }

  static get_states_by_country(countryid) {
    return fetch(
      Config.Api_Address + 'users/get_state_list',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: countryid
        })
      }
    );
  }

  static get_cities_by_state(stateid) {
    return fetch(
      Config.Api_Address + 'users/get_city_list',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stateid
        })
      }
    );
  }

  static create_sub_user(userdata) {
    return fetch(
      Config.Api_Address + 'users/create_sub_user',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata)
      }
    );
  }

  static get_sub_user(userid, offset) {
    return fetch(
      Config.Api_Address + 'users/get_sub_users',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userid, offset})
      }
    );
  }

  static filter_sub_user(filter) {
    return fetch(
      Config.Api_Address + 'users/filter_sub_user',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter)
      }
    );
  }

  static delete_sub_user(userid) {
    return fetch(
      Config.Api_Address + 'users/delete_sub_user',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userid})
      }
    );
  }

  static edit_sub_user(userdata) {
    return fetch(
      Config.Api_Address + 'users/edit_sub_user',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata)
      }
    );
  }

  static add_new_event(eventdata) {
    console.log("API_data", eventdata);
    
    return fetch(
      Config.Api_Address + 'events/create_new_event',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventdata)
      }
    );
  }


  static get_all_events(data) {
    return fetch(
      Config.Api_Address + 'events/get_all_events',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );
  }

  static delete_event(eventid) {
    return fetch(
      Config.Api_Address + 'events/delete_event',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({eventid})
      }
    );
  }

  static edit_event(eventData) {
    if(eventData.eventbanner.length < 500) {
      delete eventData.eventbanner
    }
    return fetch(
      Config.Api_Address + 'events/edit_event',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData)
      }
    );
  }

  static edit_offer(token, userid, data) {
    return fetch(
      Config.Api_Address + 'users/edit_offer?token='+token+' ',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userid, data})
      }
    );
  }

  static editLoyality(loyalityData, token) {
    return fetch(
      Config.Api_Address + 'users/edit_loyality?token='+token+'',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loyalityData)
      }
    );
  }

  static saveBirthdayPromo(data, token) {
    return fetch(
      Config.Api_Address + 'users/birthday_promo?token='+token+'',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );
  }
  


  static getUserdetails(userid, token) {
    return fetch(
      Config.Api_Address + 'users/userdetails/'+userid+'?token='+token+'',
      {
        //mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }

  static getEventList(businessid, token) {
    return fetch(
      Config.Api_Address + 'events/get_all_events/',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessid,
          limit: 0,
          searchkey: ''
        })
      }
    );
  }

  static checkUrl(url) {
    return fetch(
      Config.Api_Address + 'users/check_url',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         url
        })
      }
    );
  }

  static registerGuesUser(userdata) {
    return fetch(
      Config.Api_Address + 'guests/register',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userdata
        })
      }
    );
  }
  
  static update_guest(data) {
    return fetch(
      Config.Api_Address + 'guests/update_guest',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          userid: data.userid,
          member_type: data.member_type,
          payment_info: data.payment_info,
        })
      }
    );
  }

  static saveCard(data) {
    return fetch(
      Config.Api_Address + 'guests/add_card',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          userid: data.userid,
          cardnumber: simpleCrypto.encrypt(data.cardnumber),
          name: data.name,
          cvv: simpleCrypto.encrypt(data.cvv),
          month: data.month,
          year: data.year
        })
      }
    );
  }

  static edit_guest_image(data) {
    return fetch(
      Config.Api_Address + 'guests/edit_guest_image',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          userid: data.userid,
          image: data.image
        })
      }
    );
  }

  static deleteCard(data) {
    return fetch(
      Config.Api_Address + 'guests/delete_card',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          userid: data.userid,
          card: data.cardnumber,
        })
      }
    );
  }



  static edit_guest_one(data) {
    return fetch(
      Config.Api_Address + 'guests/edit_guest',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    );
  }

  static chargeStripe(data) {
    return fetch(
      `https://api.stripe.com/v1/charges`,
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": Authorization
        },
        body: qs.stringify({
          currency: data.currency,
          amount: data.amount,
          source: data.source,
        })
      }
    );
  }

  static guest_login(data) {
    return fetch(
      Config.Api_Address + 'guests/login',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    );
  }

  static add_order(guestid, deliveryaddress, promodiscount, businessid, data, payment) {
    console.log("PAYMENT OBJ", payment);
    
    return fetch(
      Config.Api_Address + 'guests/add_orders',
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         cart: data,
         guestid,
         businessid,
         deliveryaddress,
         promodiscount,
         payment
        })
      }
    );
  }

  static saveReservation(userid, data) {
    return fetch(
      Config.Api_Address + 'users/add_seats',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': token
        },
        body: JSON.stringify({
          userid,
          totalseats: data.tables,
          preferred: data.preferred,
          indoorseats: data.indoortables,
          outdoorseats: data.outdoortables
        })
      }
    );
  }

  static addReservationCount(userid, count) {
    return fetch(
      Config.Api_Address + 'users/add_seats',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': token
        },
        body: JSON.stringify({
          userid,
          bookedseats: count
        })
      }
    );
  }

  static saveNewReservation(data) {
    return fetch(
      Config.Api_Address+'guests/new_reservation',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );
  }

  static getReservations(data) {
    return fetch(
      Config.Api_Address+'guests/get_reservations',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );
  }

  static getBookingDetails(id) {
    return fetch(
      Config.Api_Address+'users/get_tables',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': token
        },
        body: JSON.stringify({
          resturentId: id
        })
      }
    );
  }

  static getBookingDetails(id) {
    return fetch(
      Config.Api_Address+'users/get_tables',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': token
        },
        body: JSON.stringify({
          resturentId: id
        })
      }
    );
  }

  static getUserReservation(userid, stage) {
    return fetch(
      Config.Api_Address+'guests/reservations_by_userid',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': token
        },
        body: JSON.stringify({userid, stage})
      }
    );
  }

  static get_guest(resturentId) {
    return fetch(
      Config.Api_Address+'guests/get_guest_list',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({resturentId})
      }
    );
  }

  static updateStage(data) {
    return fetch(
      Config.Api_Address+'guests/update_stage',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          rid: data.rid,
          stage: data.stage,
          startTime: data.startTime,
          endTime: data.endTime
        })
      }
    );
  }

  static deleteReservation(rid) {
    return fetch(
      Config.Api_Address+'guests/delete_reservation',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          rid,
        })
      }
    );
  }

  static getWaitTime(rid) {
    return fetch(
      Config.Api_Address+'guests/get_wait_time',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          rid,
        })
      }
    );
  }

  static fetchOrdersByGuest(guestid) {
    return fetch(
      Config.Api_Address+'guests/fetch_orders',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          guestid
        })
      }
    );
  }

  static ordersByResturent(data) {
    return fetch(
      Config.Api_Address+'users/fetch_orders_by_resturent',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          businessid: data.userId,
          status: data.status,
          startDate: data.startDate,
          endDate: data.endDate,
          limit: data.limit,
          skip: data.skip
        })
      }
    );
  }

  static updateOrderStatus(data) {
    return fetch(
      Config.Api_Address+'users/change_order_stage',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-access-token": localStorage.getItem('access-token-tbd'),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
            orderId: data.orderid,
            status: data.status,
        })
      }
    );
  }

  static addNewAddress(data) {
    return fetch(
      Config.Api_Address+'guests/add_address',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-access-token": token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
           guestid: data.guestid,
           address: data.address,
           zipcode: data.zipcode,
           state: data.state,
           city: data.city,
           country: data.country
        })
      }
    );
  }

  static add_promo_code(data) {
    return fetch(
      Config.Api_Address+'users/add_promo',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-access-token": token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
           businessid: data.businessid,
           promocode: data.promocode,
           discountvalue: data.discountvalue,
           discounttype: data.discounttype,
           details: data.details,
           expirydate: data.expirydate
        })
      }
    );
  }

  static get_promocodes(businessid) {
    return fetch(
      Config.Api_Address+'users/get_promos',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-access-token": token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
           businessid
        })
      }
    );
  }

  static birthday_promo_fetch(businessid){
    return fetch(
      Config.Api_Address+'users/birthday_promotion',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
           businessid
        })
      }
    )
  }

  static delete_promo(promoid){
    return fetch(
      Config.Api_Address+'users/delete_promo',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
           promoid
        })
      }
    )
  }
  static add_social_post(data){
    return fetch(
      Config.Api_Address+'social/add_post',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    )
  }

  static fetch_social_posts(data){
    return fetch(
      Config.Api_Address+'social/fetch_posts',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessid: data.businessid,
          skip: data.skip,
          limit: data.limit
        })
      }
    )
  }

  static  delete_social_post(postid) {
    return fetch(
      Config.Api_Address+'social/delete_post',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({postid})
      }
    )
  }

  static  react_on_post(postid, guestid, react) {
    return fetch(
      Config.Api_Address+'social/post_react',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid, guestid, react
        })
      }
    )
  }

  static  add_comment(data) {
    return fetch(
      Config.Api_Address+'social/add_comment',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid : data.postid,
          guestid : data.guestid,
          comment: data.comment,
          guestname: data.guestname,
          datetime: data.datetime
        })
      }
    )
  }

  static  delete_comment(data) {
    return fetch(
      Config.Api_Address+'social/delete_comment',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid : data.postid,
          guestid : data.guestid,
          commentid: data.commentid
        })
      }
    )
  }

  static  post_reward(data) {
    return fetch(
      Config.Api_Address+'social/add_social_reward',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestid : data.guestid,
          datetime: data.datetime
        })
      }
    )
  }

  static  refund_amount(amount, chargId) {
    return fetch(
      'https://api.stripe.com/v1/refunds',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": 'Bearer sk_test_0kb7ef0szWdvnew2LN459SSn00nWhMx4LH'
        },
        body: qs.stringify({
          charge : chargId,
          amount,
          reason: 'requested_by_customer',
        })
      }
    )
  }

  static  book_event(data) {
    return fetch(
      Config.Api_Address+'events/book_event_ticket',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          eventid : data.eventid,
          userid: data.userid,
          username: data.username,
          paid: data.paid,
          bookedon: new Date()
        })
      }
    )
  }

  static  get_sales_per_hour(date, businessId) {
    return fetch(
      Config.Api_Address+'reports/sales_per_hour',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          date: moment(date).format('YYYY-MM-DD'), 
          businessId
        })
      }
    ).then(res => res.json())
  }

  static  reservations_per_hour(date, businessId) {
    return fetch(
      Config.Api_Address+'reports/reservations_per_hour',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          date: moment(date).format('YYYY-MM-DD'),
          businessId: businessId
        })
      }
    ).then(res => res.json())
  }

  static  sales_per_item(date, businessId) {
    return fetch(
      Config.Api_Address+'reports/sales_per_item',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          date: moment(date).format('YYYY-MM-DD'), 
          businessId
        })
      }
    ).then(res => res.json())
  }

  static  social_post_per_hour(date, businessId) {
    return fetch(
      Config.Api_Address+'reports/social_post_per_hour',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          date: moment(date).format('YYYY-MM-DD'),
          businessId
        })
      }
    ).then(res => res.json())
  }

  static  monthly_reports(year, businessId) {
    return fetch(
      Config.Api_Address+'reports/sales_reservation_social_per_year',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          year,
          businessId
        })
      }
    ).then(res => res.json())
  }

  static revenue_reports(year, businessId) {
    return fetch(
      Config.Api_Address+'reports/revenue_per_year',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          year,
          businessId
        })
      }
    ).then(res => res.json())
  }

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //
  //  SUPER ADMIN PART
  //
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


  static sa_login(data) {
    return fetch(
      Config.Api_Address+'super-admin/login',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static edit_header(data) {
    return fetch(
      Config.Api_Address+'super-admin/set-home-header',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }
  static fetch_header() { 
    return fetch(
      Config.Api_Address+'super-admin/get-home-header',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static fetch_testimonial() {
    return fetch(
      Config.Api_Address+'super-admin/get-testimonial',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static add_testimonial(data) {
    return fetch(
      Config.Api_Address+'super-admin/set-testimonial',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static delete_testimonial(id) {
    return fetch(
      Config.Api_Address+'super-admin/delete-testimonial',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({id})
      }
    ).then(res => res.json())
  }

  static fetch_aboutUs() {
    return fetch(
      Config.Api_Address+'super-admin/get-about',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static update_aboutUs(data) {
    return fetch(
      Config.Api_Address+'super-admin/set-about',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static landing_card_update(data) {
    return fetch(
      Config.Api_Address+'super-admin/set-middle-section',
      {
        method: "POST",
        headers: {

        },
        body: data
      }
    ).then(res => res.json())
  }

  static landing_card_fetch() {
    return fetch(
      Config.Api_Address+'super-admin/get-middle-section',
      {
        method: "POST",
        headers: {
       
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        
      }
    ).then(res => res.json())
  }

  static send_contact_email(data) {
    return fetch(
      Config.Api_Address+'super-admin/send-email',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static set_user_active(userId) {
    return fetch(
      Config.Api_Address+'users/set_user_active',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({userId})
      }
    ).then(res => res.json())
  }

  static set_guest_user_active(userId) {
    return fetch(
      Config.Api_Address+'users/set_guest_user_active',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({userId})
      }
    ).then(res => res.json())
  }

  static set_user_deactive(userId) {
    return fetch(
      Config.Api_Address+'users/set_user_deactive',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({userId})
      }
    ).then(res => res.json())
  }

  static get_online_business() {
    return fetch(
      Config.Api_Address+'super-admin/get-active-users',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static get_online_guests() {
    return fetch(
      Config.Api_Address+'super-admin/get-active-guest-users',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static businessRevenue(data) {
    return fetch(
      Config.Api_Address+'reports/business_revenue',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static businessList() {
    return fetch(
      Config.Api_Address+'reports/business_list',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify()
      }
    ).then(res => res.json())
  }

  static businessLoyality(data) {
    return fetch(
      Config.Api_Address+'reports/loyalty_cards',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static filteredBusinessList(data) {
    return fetch(
      Config.Api_Address+'reports/business_filter',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static fetch_contact_messages(data) {
    return fetch(
      Config.Api_Address+'super-admin/list-contact',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static inactivity_reports() {
    return fetch(
      Config.Api_Address+'reports/inactivity_report',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static block_unblock_business(businessId) {
    return fetch(
      Config.Api_Address+'super-admin/block-unblock-user',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }, 
        body: qs.stringify({userId: businessId})
      }
    ).then(res => res.json())
  }

  static add_key(key, secret) {
    return fetch(
      Config.Api_Address+'super-admin/add_api_key',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }, 
        body: qs.stringify({key, secret})
      }
    ).then(res => res.json())
  }

  static get_keys() {
    return fetch(
      Config.Api_Address+'super-admin/get_key_list',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static remove_key(keyId) {
    return fetch(
      Config.Api_Address+'super-admin/delete_api_key',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({id: keyId})
      }
    ).then(res => res.json())
  }

  static active_key(key, secret) {
    return fetch(
      Config.Api_Address+'super-admin/activate_api_key',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({key, secret})
      }
    ).then(res => res.json())
  }
  
  static food_fee(amount, type) {
    return fetch(
      Config.Api_Address+'super-admin/add_food_selling_charge',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({amount, type})
      }
    ).then(res => res.json())
  }

  static ticket_fee(amount, type) {
    return fetch(
      Config.Api_Address+'super-admin/add_ticket_selling_charge',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({amount, type})
      }
    ).then(res => res.json())
  }

  static loyality_fee(amount, type) {
    return fetch(
      Config.Api_Address+'super-admin/add_loyality_card_charge',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({amount, type})
      }
    ).then(res => res.json())
  }

  static reservation_fee(amount, type) {
    return fetch(
      Config.Api_Address+'super-admin/add_reservation_charge',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({amount, type})
      }
    ).then(res => res.json())
  }

  static superadmin_login_edit(data) {
    return fetch(
      Config.Api_Address+'super-admin/change_login',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }


  static reservation_up_fee(amount, type) {
    return fetch(
      Config.Api_Address+'super-admin/add_reservation_up_charge',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({amount, type})
      }
    ).then(res => res.json())
  }

  static fetch_privacy() {
    return fetch(
      Config.Api_Address+'super-admin/get_privacy_policy',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ).then(res => res.json())
  }

  static save_privacy(privacy, terms) {
    return fetch(
      Config.Api_Address+'super-admin/set_privacy_policy',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({privacy, terms})
      }
    ).then(res => res.json())
  }

  static save_apikey(userId, apikey) {
    return fetch(
      Config.Api_Address+'users/add_payment_key',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          'x-access-token': token
        },
        body: qs.stringify({userId, apikey})
      }
    ).then(res => res.json())
  }

  static create_connect(data) {
    return fetch(
      'https://api.stripe.com/v1/accounts',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": Authorization
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static add_stripe_account(userid, account) {
    return fetch(
      Config.Api_Address+'users/add_stripe_connect',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          'x-access-token': token
        },
        body: qs.stringify({userid, account})
      }
    ).then(res => res.json())
  }

  static generate_stripe_link(id) {
    return fetch(
      `https://api.stripe.com/v1/account_links`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": Authorization
        },
        body: qs.stringify({
          account: id,
          type: 'custom_account_update',
          failure_url: 'https://doublesat.com',
          success_url: 'https://doublesat.com'
        })
      }
    ).then(res => res.json())
  }

  static transfer_money_to_business(toBusiness, amount, details) {
    return fetch(
      `https://api.stripe.com/v1/transfers`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": Authorization
        },
        body: qs.stringify({
          currency: 'USD',
          destination: toBusiness,
          amount: amount,
          description: details
        })
      }
    ).then(res => res.json())
  }

  static fetch_fees() {
    return fetch(
      Config.Api_Address+'super-admin/get-fees',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          'x-access-token': token
        }
      }
    ).then(res => res.json())
  }

  static delete_business(id) {
    return fetch(
      Config.Api_Address+`users/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          // 'x-access-token': token
        }
      }
    ).then(res => res.json())
  }

  static business_count(id) {
    return fetch(
      Config.Api_Address+`users/total_user_registered`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          // 'x-access-token': token
        }, 
        body: qs.stringify({businessid: id})
      }
    ).then(res => res.json())
  }

  static orders_count(id) {
    return fetch(
      Config.Api_Address+`users/total_orders_placed`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          // 'x-access-token': token
        }, 
        body: qs.stringify({businessid: id})
      }
    ).then(res => res.json())
  }

  static events_count(id) {
    return fetch(
      Config.Api_Address+`users/total_event_booked`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          // 'x-access-token': token
        }, 
        body: qs.stringify({businessid: id})
      }
    ).then(res => res.json())
  }

  static loyality_sold(id) {
    return fetch(
      Config.Api_Address+`users/total_loyality_card`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          // 'x-access-token': token
        }, 
        body: qs.stringify({businessid: id})
      }
    ).then(res => res.json())
  }

  static update_connect(id, data) {
    console.log("AUTHORIZATION", Authorization);
    
    return fetch(
      `https://api.stripe.com/v1/accounts/${id}/external_accounts`,
      { 
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": Authorization
        },
        body: qs.stringify(data)
      }
    ).then(res => res.json())
  }

  static fetch_connect(id) {
    return fetch(
      `https://api.stripe.com/v1/accounts/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": Authorization
        }
      }
    ).then(res => res.json())
  }

    static forgot_password_guest(email) {
    return fetch(
      Config.Api_Address+`guests/forgot_password_guest`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          // 'x-access-token': token
        }, 
        body: qs.stringify({email})
      }
    ).then(res => res.json())
  }

  static create_token(data) {
    return fetch( 
      `https://api.stripe.com/v1/tokens`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": Authorization
        },
        body: qs.stringify({card: data})
      }
    ).then(res => res.json())
  }

  static reset_sa_password(email) {
    return fetch(
      Config.Api_Address+'super-admin/reset_superadmin_password',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({email})
      }
    ).then(res => res.json())
  }

  static get_new_business() {
    return fetch(
      Config.Api_Address+'reports/new_business',
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify()
      }
    ).then(res => res.json())
  }

}

export default ApiService;
