import http from "../http-common";

class ModuleDataService {
  getAll() {
    return http.get("/api/modules");
  }

  create(data) {
    return http.post("/api/modules", data);
  }

  get(id) {
    return http.get(`/api/modules/${id}`);
  }

  update(id, data) {
    return http.put(`/api/modules/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/modules/${id}`);
  }
}

export default new ModuleDataService();