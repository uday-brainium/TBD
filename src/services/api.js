import Config from "../config";
import axios from 'axios'

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

  static fetchmenuData(user_id) {
    console.log(Config.Api_Address);
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
  }

  static additem(option, itemtitle, itemdescription, itemcost, user_id) {
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
        user_id: user_id
      })
    });
  }


  static fetchmenuitemData(user_id, page) {
    console.log(Config.Api_Address);
    return fetch(
      //Config.Api_Address + "users/getitemAllMenu/" + user_id + "/?page=" + page + "&limit=5",
      Config.Api_Address + "users/getitemAllMenu/" + user_id,
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




  static deletemenuitemData(id) {
    return fetch(
      Config.Api_Address + "users/itemdelete/" + id,
      {
        // mode: 'no-cors',
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: id
        })
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
  static editbusinessprofile(token, body) {
    return fetch(Config.Api_Address + "users/editbusinessprofile/?token=" + token, {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
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

  static getBusinessProfbyUrl(userid, token) {
    return fetch(
      Config.Api_Address + "users/userdetails/"+userid+"?token="+token,
      {
        // mode: 'no-cors',
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'token' : token
        },
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

  static get_sub_user(userid) {
    return fetch(
      Config.Api_Address + 'users/get_sub_users',
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



}


export default ApiService;
