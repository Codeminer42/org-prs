import { middleware as cacheFor } from 'apicache';
import PullRequestsController from './controllers/pull_requests_controller';

export default class Router {
  static init(app) {
    app.use('/', cacheFor('30 minutes'), PullRequestsController.index);
  }
}
