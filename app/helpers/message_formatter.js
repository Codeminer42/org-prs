import async from 'async';

export default function formatMessage (prs) {
  let formattedAttachments = []

  async.each(prs, (pr, iterator) => {
    formattedAttachments.push({
      author_name: pr.user,
      title: pr.title,
      text: `${pr.repo} - ${pr.url}`,
      color: 'warn'
    });
  });

  return { attachments: formattedAttachments };
}
