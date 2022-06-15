import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { id, ...post } = ctx.args.post;
  const item = {
    ...post,
    updatedAt: util.time.nowISO8601(),
  };

  const updateExpression = [];
  const expressionNames = {};
  const expressionValues = {};

  for (const [key, value] of Object.entries(item)) {
    updateExpression.push(`#${key} = :${key}`);
    expressionNames[`#${key}`] = key;
    expressionValues[`:${key}`] = util.dynamodb.toDynamoDB(value);
  }

  return {
    operation: 'UpdateItem',
    key: {
      id: util.dynamodb.toDynamoDB(id),
    },
    update: {
      expression: `set ${updateExpression.join(', ')}`,
      expressionNames,
      expressionValues,
    },
    condition: {
      expression: 'attribute_exists(#id)',
      expressionNames: {
        '#id': 'id',
      },
    },
  };
}

export function response(ctx) {
  ctx.stash.event = {
    DetailType: 'postUpdated',
    Detail: JSON.stringify(ctx.result),
  };
  return ctx.result;
}
