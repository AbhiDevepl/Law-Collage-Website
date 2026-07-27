require('dotenv').config();
const mongoose = require('mongoose');
const ImportantLink = require('../src/models/ImportantLink');

async function run() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);

  const links = await ImportantLink.find({});
  let fixed = 0;

  for (const link of links) {
    const trimmed = link.url.trim();
    let newUrl = trimmed;
    let newIsExternal = link.isExternal;

    if (!trimmed.startsWith('/') && !/^https?:\/\//i.test(trimmed)) {
      newUrl = `https://${trimmed}`;
      newIsExternal = true;
    } else if (/^https?:\/\//i.test(trimmed) && !link.isExternal) {
      newIsExternal = true;
    }

    if (newUrl !== link.url || newIsExternal !== link.isExternal) {
      link.url = newUrl;
      link.isExternal = newIsExternal;
      await link.save();
      fixed++;
      console.log(`Fixed: ${trimmed} -> ${newUrl} (isExternal: ${newIsExternal})`);
    }
  }

  console.log(`Done. Fixed ${fixed} of ${links.length} links.`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
