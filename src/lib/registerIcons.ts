// Side-effect module: registers the bundled icons with @iconify/react's store
// at import time. Once registered, <Icon icon="prefix:name" /> renders inline
// (including during SSR) with no network request to the Iconify API. Any icon
// not present in the bundle falls back to @iconify/react's default runtime
// fetch, so nothing breaks if an icon was missed.
import { addIcon } from "@iconify/react";
import { generatedIcons } from "./generatedIcons";

for (const [name, data] of Object.entries(generatedIcons)) {
  addIcon(name, data);
}
