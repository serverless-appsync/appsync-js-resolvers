export function request(ctx) {
  return {
    name: ctx.args.name,
  };
}

export function response(ctx) {
  return ctx.result;
}
