/**
 * One-time script to update siteSettings in Sanity with the new contact details.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<your-write-token> node scripts/update-sanity-settings.mjs
 *
 * Get a write token from:
 *   https://www.sanity.io/manage → project 1dnw2j6i → API → Tokens → Add API token (Editor or higher)
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '1dnw2j6i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const SETTINGS_ID = '81ac3be0-9539-4b99-80b3-7f7d93a6a970'

async function run() {
  console.log('Updating siteSettings…')

  await client
    .patch(SETTINGS_ID)
    .set({
      phone: '508-250-6565',
      email: 'support@1stchoice-roofing.com',
      reviewCount: 14,
      reviewRating: 5.0,
      'address.street': 'Based in Webster, Massachusetts',
      'address.city': 'Webster',
      'address.state': 'MA',
      'address.zip': '01570',
      'address.country': 'US',
    })
    .commit()

  console.log('✅ siteSettings updated.')
}

run().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
