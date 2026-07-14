"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, SINGLETON_TYPES } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { SendReviewRequestAction } from "./src/sanity/actions/SendReviewRequestAction";
import { dataset, projectId } from "./src/sanity/env";

const singletons: readonly string[] = SINGLETON_TYPES;

export default defineConfig({
  name: "jlang-development",
  title: "JLang Development Content",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons are reached through the structure above, so keep them out of the "create new" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (previous, context) => {
      if (singletons.includes(context.schemaType)) {
        return previous.filter(({ action }) => action !== "duplicate" && action !== "delete" && action !== "unpublish");
      }
      return context.schemaType === "reviewRequest" ? [...previous, SendReviewRequestAction] : previous;
    },
  },
});
