"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { SendReviewRequestAction } from "./src/sanity/actions/SendReviewRequestAction";
import { dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "jlang-development",
  title: "JLang Development Content",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (previous, context) =>
      context.schemaType === "reviewRequest" ? [...previous, SendReviewRequestAction] : previous,
  },
});
