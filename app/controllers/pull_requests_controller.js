const GitHubApi = require('github');
const github = new GitHubApi({
  version: '3.0.0',
});

export default class PullRequestsController {
  static index(req, res) {
    github.user.getFollowingFromUser({
        user: "lucasrenan"
    }, function(err, dataResult) {
        return res.json(dataResult);
    });
  }
}
