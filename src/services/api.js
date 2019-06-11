import Config from "../config";
import axios from 'axios'
import qs from 'qs'
let token = localStorage.getItem('access-token-tbd')


class ApiService {
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
  static profileData(token, userId) {

    return fetch(
      Config.Api_Address + "users/userdetails/" + userId + "?token=" + token,
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
          cardnumber: data.cardnumber,
          name: data.name,
          expiry: data.expiry
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
          "Authorization": 'Bearer sk_test_0kb7ef0szWdvnew2LN459SSn00nWhMx4LH'
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

  static add_order(guestid, businessid, data) {
    
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
         businessid
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
          endDate: data.endDate
        })
      }
    );
  }

}


export default ApiService;
