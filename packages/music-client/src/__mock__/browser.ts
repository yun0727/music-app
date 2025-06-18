import { handlers } from "@/__mock__/handlers";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...handlers);
