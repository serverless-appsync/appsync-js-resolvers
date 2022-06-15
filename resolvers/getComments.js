import { util } from '@aws-appsync/utils';

export function request(ctx) {
  return {
    operation: 'Query',
    index: 'post',
    limit: ctx.args.limit !== undefined ? ctx.args.limit : 10,
    scanIndexForward: false,
    query: {
      expression: '#postId = :postId',
      expressionNames: {
        '#postId': 'postId',
      },
      expressionValues: {
        ':postId': util.dynamodb.toDynamoDB(ctx.source.id),
      },
    },
  };
}

export function response(ctx) {
  return ctx.result.items;
}
