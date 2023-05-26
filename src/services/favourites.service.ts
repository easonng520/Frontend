import http from "../http-common";
class FavouritesService {
    update(id, data) {
    return http.put(`/favourites/${id}`, data);
  }
}
export default new FavouritesService();