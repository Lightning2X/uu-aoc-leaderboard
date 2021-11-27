import { API_URL } from "shared/constants";

export async function extractData<DataType>(
  response: Promise<Response>
): Promise<DataType> {
  return (await (await response).json()) as unknown as DataType;
}

export async function performAPIFetch<DataType>(path: string) {
  return extractData<DataType>(performFetch(API_URL + path, "GET"));
}

export const performFetch = (
  url: string,
  method: string,
  body?: string,
  headers?: HeadersInit
) =>
  fetch(url, {
    method,
    headers: headers || {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
