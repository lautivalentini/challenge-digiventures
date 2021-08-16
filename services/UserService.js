class UserService {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    const configuration = new this.model(data);
    return configuration.save()
  }

  signIn(username) {
    const user = this.model.findOne({ username });
    return user
  }
}

module.exports = UserService;