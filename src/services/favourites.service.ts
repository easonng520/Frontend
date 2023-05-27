import axios from 'axios';
const API_URL = 'https://b.easonng520.repl.co/api';
class FavouritesService {
  update(id, data) {
        return axios.put(API_URL + `/favourites/${id}`, data);
  }
}
export default new FavouritesService();