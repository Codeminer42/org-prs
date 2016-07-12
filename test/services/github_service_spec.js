import { expect } from '../test_helper';
import nock from 'nock';
import GithubService from '../../app/services/github_service';

require('dotenv').load();

describe('GithubService', function() {
  describe('openPullRequests', function() {
    let prs = [{
      title: "PR 1",
      html_url: "https://github.com/Codeminer42/org-prs/pull/23",
      user: { login: "lucasrenan" }
    }];

    before(function() {
      nock('https://api.github.com:443', {"encodedQueryParams":true})
        .get('/orgs/' + process.env.GITHUB_USER + '/repos')
        .query({"type":"all","per_page":"100","access_token": process.env.OAUTH_TOKEN})
        .reply(200, [{"id":4252046,"name":"org-prs"}]);

      nock('https://api.github.com:443', {"encodedQueryParams":true})
        .get('/repos/' + process.env.GITHUB_USER + '/org-prs/pulls')
        .query({"state": "open", "access_token": process.env.OAUTH_TOKEN})
        .reply(200, prs);
    });

    it('returns all open requests', function(done) {
      GithubService.openPullRequests(function(err, prs) {
        expect(nock.isDone()).to.be.true;
        expect(prs).to.eql(prs);
        done();
      });
    });
  });
});
