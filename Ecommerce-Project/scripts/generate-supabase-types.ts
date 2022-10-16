import { writeFile } from 'fs/promises';
const openapiTS = require('openapi-typescript').default;
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

(async () => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('⚠️ Missing environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return;
  }

  const supabaseApiUrl = `${supabaseUrl}/rest/v1/?apikey=${supabaseServiceRoleKey}`;
  try {
    const output = await openapiTS(supabaseApiUrl);
    await writeFile('./types/supabase.ts', output);
    console.error('✅ Types were generated and written to types/supabase.ts');
  } catch (e) {
    console.error('⚠️ Could not load type from url ' + supabaseApiUrl, e);
  }
})();
