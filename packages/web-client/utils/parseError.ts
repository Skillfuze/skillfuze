export function parseError(error: any): any {
  if (typeof error.message === 'string') {
    return { general: error.message };
  }

  const parsedErrors = {};
  error.message?.forEach(msg => {
    const [err] = Object.values(msg.constraints);
    parsedErrors[msg.property] = err;
  });

  return parsedErrors;
}
