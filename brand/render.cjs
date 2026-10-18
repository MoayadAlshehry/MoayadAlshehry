// Re-export the editable SVG masters. Install Segoe UI locally for matching text metrics.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { Resvg } = require('@resvg/resvg-js');
const root = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
fs.mkdirSync(path.join(root, 'exports'), {recursive: true});
manifest.assets = fs.readdirSync(path.join(root, 'sources')).filter(file => file.endsWith('.svg')).sort().map(file => {
  const name = path.basename(file, '.svg');
  const source = fs.readFileSync(path.join(root, 'sources', file), 'utf8');
  const png = new Resvg(source, {font: {loadSystemFonts: true, defaultFontFamily: 'Segoe UI'}}).render().asPng();
  fs.writeFileSync(path.join(root, 'exports', name + '.png'), png);
  return {name, width: png.readUInt32BE(16), height: png.readUInt32BE(20), sha256: crypto.createHash('sha256').update(png).digest('hex')};
});
fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
fs.copyFileSync(path.join(root, 'exports', 'professional-banner.png'), path.join(root, '..', 'assets', 'professional-banner.png'));
console.log(`Rendered ${manifest.assets.length} presentation assets.`);
