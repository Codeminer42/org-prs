import { expect } from '../test_helper';
import mockery from 'mockery';

describe('PullRequestsController', function() {
  describe('index', function() {
    let controller;
    let githubMock = {};

    before(function() {
      mockery.enable({ warnOnUnregistered: false });
      mockery.registerMock('../services/github_service', githubMock);
      mockery.registerMock('../helpers/message_formatter', (prs) => prs);

      controller = require('../../app/controllers/pull_requests_controller').default;
    });

    it('shows open pull requests', function() {
      githubMock.openPullRequests = (cb) => {
        cb(undefined, "open-pull-requests");
      };

      controller.index({}, {
        json(response) {
          expect(response).to.eql("open-pull-requests");
        }
      });
    });

    it('shows error message', function() {
      githubMock.openPullRequests = (cb) => {
        cb("error");
      };

      controller.index({}, {
        json(prs) {
          expect(prs).to.eql("error");
        }
      });
    });
  });
});
