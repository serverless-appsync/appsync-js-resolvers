import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const {
    args: { id },
  } = ctx;
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({ id }),
  };
}

export function response(ctx) {
  return ctx.result;
}
