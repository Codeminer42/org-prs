import { expect } from '../test_helper';
import mockery from 'mockery';
import sinon from 'sinon';

describe('GithubService', function() {
  describe('openPullRequests', function() {
    let service;

    let client = {
      repos: {
        getFromOrg(args, callback) {
          callback(null, [{name: 'repo-name'}]);
        }
      },
      pullRequests: {
        getAll(args, callback) {
          callback(null, [{
            title: 'PR 1',
            html_url: 'https://github.com/Codeminer42/org-prs/pull/23',
            user: { login: 'lucasrenan' }
          }]);
        }
      },
      authenticate() {}
    };

    before(function() {
      mockery.enable({ warnOnUnregistered: false });
      mockery.registerMock('github', () => client);
 
      service = require('../../app/services/github_service').default;
    });

    it('authenticates', function() {
      let stub = sinon.stub(client, 'authenticate');
      service.openPullRequests();
      expect(stub.called).to.be.true;
    });

    it('checks all repos', function(done) {
      let spy = sinon.spy(client.repos, 'getFromOrg');

      service.openPullRequests(function(err, prs) {
        expect(spy.called).to.be.true;

        let argsFirstCall = spy.args[0][0];
        expect(argsFirstCall.type).to.eql('all');

        done();
      });
    });

    it('checks open PRs', function(done) {
      let spy = sinon.spy(client.pullRequests, 'getAll');

      service.openPullRequests(function(err, prs) {
        expect(spy.called).to.be.true;

        let argsFirstCall = spy.args[0][0];
        expect(argsFirstCall.state).to.eql('open');

        done();
      });
    });

    it('formats PR', function(done) {
      service.openPullRequests(function(err, prs) {
        expect(prs).to.eql([{
          repo: 'repo-name',
          title: 'PR 1',
          url: 'https://github.com/Codeminer42/org-prs/pull/23',
          user: 'lucasrenan'
        }]);

        done();
      });
    });
  });
});
