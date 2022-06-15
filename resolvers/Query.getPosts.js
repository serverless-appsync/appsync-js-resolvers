export function request(ctx) {
  return {
    author: ctx.args.author,
  };
}

export function response(ctx) {
  return ctx.prev.result;
}
