import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const script = await fs.readFile(path.join(process.cwd(), 'public/resume/launch.sh'), 'utf-8');
    return new Response(script, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch {
    return new Response('Resume script not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
