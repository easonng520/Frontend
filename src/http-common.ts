import axios from "axios";
export default axios.create({
//  baseURL: "http://localhost:8080/api",
baseURL: "https://backend.easonng520.repl.co/api",
 //baseURL: "https://uploaddb.easonng520.repl.co",
  //baseURL: "https://b.easonng520.repl.co/api",
  headers: {
    "Content-type": "application/json"
  }
});