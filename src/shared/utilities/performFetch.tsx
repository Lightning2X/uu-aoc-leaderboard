import { API_URL } from "shared/constants";
import { APIResponse } from "./apiResult.types";

export async function extractData<DataType>(
  response: Response
): Promise<DataType> {
  return (await response.json()) as unknown as DataType;
}

export async function performAPIFetch<DataType>(path: string) {
  var promise = performFetch(API_URL + path, "GET");
  return promise
    .then(async (x) => {
      return {
        success: true,
        result: await extractData<DataType>(x),
      } as APIResponse<DataType>;
    })
    .catch(async (x) => {
      return { success: false, result: null } as APIResponse<DataType>;
    });
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
