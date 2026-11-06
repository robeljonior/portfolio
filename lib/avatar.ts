import fs from "node:fs";
import path from "node:path";

/** Drop a square photo at public/avatar.(jpg|jpeg|png|webp) and it replaces the "RM" monogram. */
export function findAvatar() {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const file = `avatar.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`;
  }
  return null;
}
