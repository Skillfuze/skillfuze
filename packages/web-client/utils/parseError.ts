export function parseError(error: any): any {
  const parsedErrors = {};
  error.message.forEach(msg => {
    const [err] = Object.values(msg.constraints);
    parsedErrors[msg.property] = err;
  });

  return parsedErrors;
}
