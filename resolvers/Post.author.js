export function request(ctx) {
  return {
    name: ctx.source.authorName,
  };
}

export function response(ctx) {
  return ctx.result;
}
