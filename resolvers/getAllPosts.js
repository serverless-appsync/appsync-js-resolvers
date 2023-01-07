import { util } from '@aws-appsync/utils';

export function request(ctx) {
  return {
    operation: 'Scan',
    limit: ctx.args.limit !== undefined ? ctx.args.limit : 10,
  };
}

export function response(ctx) {
  return ctx.result;
}
