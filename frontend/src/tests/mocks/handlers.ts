import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/categories", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "ABC",
      },
      {
        id: 2,
        name: "XYZ",
      },
    ]);
  }),
];
