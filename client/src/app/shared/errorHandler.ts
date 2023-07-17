export function handleError(error: any) {
  if (error.includes('ValidationError')) {
    return error.split(': ')[2];
  } else if (error.includes('Cast')) {
    return error.split('CastError: ')[1];
  } else {
    return error;
  }
}
