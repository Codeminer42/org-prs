import { expect } from '../test_helper';
import formatMessage from '../../app/helpers/message_formatter';

describe('Message Formater', function() {
  let prs = [
    {
      user: 'Codeminer42',
      title: 'Open PR #1',
      repo: 'Codeminer42/org-prs',
      url: 'https://github.com/Codeminer42/org-prs'
    },
    {
      user: 'Codeminer42',
      title: 'Open PR #2',
      repo: 'Codeminer42/org-prs',
      url: 'https://github.com/Codeminer42/org-prs'
    }
  ];

  before(function () {
    this.subject = formatMessage(prs);
  });

  it('is a function', function () {
    expect(formatMessage).to.be.a('function');
  });

  it('returns an object', function () {
    expect(this.subject).to.be.an('object');
  });

  it('has response type and attachments as keys', function () {
    expect(this.subject).to.have.all.keys(['response_type', 'attachments']);
  });

  it('is an in channel message', function () {
    expect(this.subject.response_type).to.equal('in_channel');
  });

  it ('returns attachments', function () {
    expect(this.subject.attachments).to.have.lengthOf(2);
  });

  it ('attachments are properly formatted', function () {
    let pr = prs[0];
    let expectedAttachment = {
      author_name: pr.user,
      title: pr.title,
      text: `${pr.repo} - ${pr.url}`,
      color: 'warn'
    }

    expect(this.subject.attachments[0]).to.eql(expectedAttachment);
  });
});
