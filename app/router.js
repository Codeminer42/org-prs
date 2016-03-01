import PullRequestsController from './controllers/pull_requests_controller'

export default class Router {
  static init(app) {
    app.use('/', PullRequestsController.index)
  }
}
