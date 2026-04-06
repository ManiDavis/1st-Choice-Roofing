/**
 * Sanity Content Migration Script
 * Updates stale CMS data to match the new Massachusetts-wide branding.
 *
 * Run with:
 *   SANITY_WRITE_TOKEN=<your-editor-token> npx tsx scripts/migrate-sanity-content.ts
 *
 * Get a write token at: https://www.sanity.io/manage/project/1dnw2j6i → API → Tokens → Add API token (Editor role)
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '1dnw2j6i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function run() {
  console.log('Starting Sanity content migration…\n')

  // ── 1. Site Settings ────────────────────────────────────────────────────
  console.log('Updating Site Settings…')
  await client
    .patch('siteSettings')
    .set({
      phone: '508-250-0565',
      'address.street': 'Webster, MA',
      'address.display': 'Webster, MA',
      footerText: 'Licensed & Insured Roofing Contractor Serving All of Massachusetts. Based in Webster, MA.',
    })
    .commit()
  console.log('  ✓ Phone, address, footer text updated\n')

  // ── 2. Home Page ─────────────────────────────────────────────────────────
  console.log('Updating Home Page hero…')
  await client
    .patch('homePage')
    .set({
      'hero.headline': "Massachusetts's #1 Roofing Contractor",
      'hero.subheadline': 'Licensed & Insured • Free Estimates • Residential & Commercial • Serving All of Massachusetts',
      'areasSection.heading': 'Serving All of Massachusetts',
      'areasSection.subheading': 'From Cape Cod to the Berkshires — we go where the roof takes us.',
    })
    .commit()
  console.log('  ✓ Hero headline, subheadline, areas section updated\n')

  // ── 3. Service Pages — fix short descriptions that mention Webster/Worcester ─
  console.log('Updating Service Page descriptions…')
  const serviceUpdates: Record<string, string> = {
    'roof-repair': 'Fast, reliable roof repairs across Massachusetts. Same-day response available. We stop leaks and fix storm damage — residential and commercial.',
    'roof-replacement': 'Full roof replacements for homes and businesses across Massachusetts. Quality materials, professional installation, finished in a day.',
    'residential-roofing': 'Expert residential roofing for Massachusetts homeowners. Full installations, replacements, and repairs — quality you can count on.',
    'commercial-roofing': 'Commercial roofing solutions for businesses across Massachusetts. Minimal disruption, dedicated commercial crew, quality guaranteed.',
    'rubber-flat-roofing': 'Specialist rubber (EPDM) and flat roofing for residential and commercial properties across Massachusetts. Installations and repairs.',
    'emergency-roofing': 'Emergency roof repairs across Massachusetts — 24/7. We respond fast to stop leaks, storm damage, and structural issues.',
    'solar-roofing': "Interested in solar? We have a trusted referral partner. Call us and we'll connect you with the right team to get your solar project started.",
  }

  for (const [slug, newDescription] of Object.entries(serviceUpdates)) {
    const doc = await client.fetch(`*[_type == "servicePage" && slug.current == $slug][0]{_id}`, { slug })
    if (doc?._id) {
      await client.patch(doc._id).set({ shortDescription: newDescription }).commit()
      console.log(`  ✓ ${slug}`)
    } else {
      console.log(`  — ${slug} not found in Sanity (static fallback in use)`)
    }
  }
  console.log()

  // ── 4. Service Areas — delete town-level areas, replace with counties ────
  console.log('Replacing town-level service areas with Massachusetts counties…')

  // Delete existing town-level service areas
  const existingAreas = await client.fetch(`*[_type == "serviceArea"]{_id, name}`)
  for (const area of existingAreas) {
    await client.delete(area._id)
    console.log(`  ✗ Deleted: ${area.name}`)
  }

  // Create county-level service areas
  const counties = [
    { name: 'Worcester County', slug: 'worcester-county', order: 1 },
    { name: 'Middlesex County', slug: 'middlesex-county', order: 2 },
    { name: 'Norfolk County', slug: 'norfolk-county', order: 3 },
    { name: 'Suffolk County', slug: 'suffolk-county', order: 4 },
    { name: 'Essex County', slug: 'essex-county', order: 5 },
    { name: 'Plymouth County', slug: 'plymouth-county', order: 6 },
    { name: 'Bristol County', slug: 'bristol-county', order: 7 },
    { name: 'Hampden County', slug: 'hampden-county', order: 8 },
    { name: 'Hampshire County', slug: 'hampshire-county', order: 9 },
    { name: 'Franklin County', slug: 'franklin-county', order: 10 },
    { name: 'Berkshire County', slug: 'berkshire-county', order: 11 },
    { name: 'Barnstable County', slug: 'barnstable-county', order: 12 },
  ]

  for (const county of counties) {
    await client.create({
      _type: 'serviceArea',
      name: county.name,
      state: 'MA',
      slug: { _type: 'slug', current: county.slug },
      featured: true,
      order: county.order,
      heroDescription: `1st Choice Roofing serves all of ${county.name}, MA. Licensed & insured, free estimates, residential & commercial.`,
    })
    console.log(`  ✓ Created: ${county.name}`)
  }

  console.log('\nMigration complete!')
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
