import GithubService from '../services/github_service';

export default class PullRequestsController {
  static index(req, res) {
    GithubService.openPullRequests((err, prs) => {
      if (err) { return res.json(err) }

      return res.json(prs)
    });
  }
}
