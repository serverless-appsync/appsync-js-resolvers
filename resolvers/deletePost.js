import { util } from '@aws-appsync/utils';

export function request(ctx) {
  return {
    operation: 'DeleteItem',
    key: {
      id: util.dynamodb.toDynamoDB(ctx.args.id),
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error('InternalError');
  } else if (!ctx.result) {
    util.error('NotFoundError');
  } else {
    ctx.stash.event = {
      DetailType: 'postDeleted',
      Detail: JSON.stringify(ctx.result),
    };
    return true;
  }
}
