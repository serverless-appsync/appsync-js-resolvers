export function request(ctx) {
  return {
    author: ctx.source.name,
  };
}

export function response(ctx) {
  return ctx.prev.result.items;
}
