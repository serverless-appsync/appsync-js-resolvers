import { util } from '@aws-appsync/utils';

export function request(ctx) {
  return {
    operation: 'Query',
    index: 'author',
    limit: ctx.args.limit !== undefined ? ctx.args.limit : 10,
    scanIndexForward: false,
    query: {
      expression: '#authorName = :authorName',
      expressionNames: {
        '#authorName': 'authorName',
      },
      expressionValues: {
        ':authorName': util.dynamodb.toDynamoDB(ctx.prev.result.author),
      },
    },
  };
}

export function response(ctx) {
  return ctx.result;
}
