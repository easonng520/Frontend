import http from "../http-common";

class CatDataService {
  getAll() {
    return http.get("/cats");
  }

  get(id) {
    return http.get(`/cats/${id}`);
  }

  create(data) {
    return http.post("/cats", data);
  }

  update(id, data) {
    return http.put(`/cats/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cats/${id}`);
  }

  deleteAll() {
    return http.delete(`/cats`);
  }

  findByName(name) {
    return http.get(`/cats?name=${name}`);
  }
}

export default new CatDataService();