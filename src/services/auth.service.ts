import axios from "axios";
const API_URL = "https://backend.easonng520.repl.co/api/auth/";
class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string, centre: string, favourites: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      centre,
      favourites
    });
  }


  
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
