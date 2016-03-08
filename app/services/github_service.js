import async from 'async';
import GitHubApi  from 'github';
const github = new GitHubApi({
  version: '3.0.0',
});

function reposFromOrg (callback) {
  github.repos.getFromOrg({
    org: process.env.GITHUB_USER,
    type: 'all',
    per_page: 100
  }, callback);
}

function allOpenPullRequests (repos, callback) {
  var prs = []

  async.each(repos, (repo, cb) => {
    github.pullRequests.getAll({
      user: process.env.GITHUB_USER,
      repo: repo.name,
      state: 'open'
    }, (err, resultPrs) => {
      if (err) { return cb(err) }

      if (resultPrs.length) {
        async.each(resultPrs, (pr, iteratorCb) => {
          prs.push({
            repo: repo.name,
            title: pr.title,
            url: pr.html_url,
            user: pr.user.login
          });
        }, cb)
      }

      return cb()
    })
  }, (err) => {
    if (err) { return callback(err) }

    return callback(null, prs)
  })
}

export default class GithubService {
  static openPullRequests (callback) {
    github.authenticate({
      type: 'oauth',
      token: process.env.OAUTH_TOKEN
    });

    async.waterfall([
      reposFromOrg,
      allOpenPullRequests
    ], callback)
  }
}
