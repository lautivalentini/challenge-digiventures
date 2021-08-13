class UserService {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    const configuration = new this.model(data);
    return configuration.save()
  }
}

module.exports = UserService;