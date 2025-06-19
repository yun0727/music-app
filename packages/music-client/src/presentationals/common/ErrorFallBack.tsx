interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallBack({ error, resetErrorBoundary }: Props) {
  return (
    <div>
      <h1>
        {isApiError(error)
          ? error.response.errors[0].message
          : "something is wrong"}
      </h1>
      <button onClick={() => resetErrorBoundary}>Try again</button>
    </div>
  );
}

function isApiError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is { response: { errors: { message: string }[] } } {
  return error.response?.errors?.length > 0;
}
