export const performFetch = (
  url: string,
  method: string,
  body: string,
  headers: HeadersInit
) =>
  fetch(url, {
    method,
    headers: headers || {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
