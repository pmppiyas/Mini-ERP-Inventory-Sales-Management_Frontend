export const error_message = (err: any) => {
  const errorMessage =
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof (err as any).data?.message === 'string'
      ? (err as any).data.message
      : err instanceof Error
        ? err.message
        : 'An unexpected error occurred';

  return errorMessage;
};
