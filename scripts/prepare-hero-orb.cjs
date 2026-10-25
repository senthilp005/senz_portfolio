const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const encoded = [
  fs.readFileSync(path.join(root, "assets", "hero-orb.b64"), "utf8").trim(),
  fs.readFileSync(path.join(root, "assets", "hero-orb.b64.part2"), "utf8").trim()
].join("");

if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded) || encoded.length % 4 !== 0) {
  throw new Error("The Contact orb artwork has invalid base64 data.");
}
const image = Buffer.from(encoded, "base64");
if (image.toString("ascii", 0, 4) !== "RIFF" || image.toString("ascii", 8, 12) !== "WEBP") {
  throw new Error("The Contact orb artwork did not decode into a WebP image.");
}
fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public", "hero-orb.webp"), image);
console.log(`[hero-orb] Prepared full VFX artwork (${image.length.toLocaleString()} bytes).`);
