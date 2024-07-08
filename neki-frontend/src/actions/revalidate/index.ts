"use server";

import { revalidateTag } from "next/cache";

async function revalidateTagName(tagName: string) {
  revalidateTag(tagName);
}

export { revalidateTagName };
