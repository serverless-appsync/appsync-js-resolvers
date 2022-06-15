import { util } from '@aws-appsync/utils';

export function request(ctx) {
  if (!ctx.stash.event) {
    util.error('InternalError');
  }

  return {
    method: 'POST',
    resourcePath: '/',
    params: {
      headers: {
        'content-type': 'application/x-amz-json-1.1',
        'x-amz-target': 'AWSEvents.PutEvents',
      },
      body: {
        Entries: [
          {
            EventBusName: 'blog-event-bus',
            Source: 'blog-appsync-api',
            ...ctx.stash.event,
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  if (ctx.result.statusCode != 200) {
    util.error('Failed calling eventBride SDK', 'Error');
  }
  const result = JSON.parse(ctx.result.body);
  if (result.Entries.length !== 1) {
    util.error('Failed delivering the message', 'Error');
  } else {
    return ctx.prev.result;
  }
}
