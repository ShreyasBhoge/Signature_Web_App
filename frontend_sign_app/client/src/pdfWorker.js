// client/src/pdfWorker.js

import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.min";

GlobalWorkerOptions.workerSrc = window.URL.createObjectURL(
  new Blob([pdfjsWorker.WorkerMessageHandler.toString()], {
    type: "application/javascript",
  })
);
