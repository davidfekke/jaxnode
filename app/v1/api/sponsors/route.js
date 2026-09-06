import { getSponsors } from '../../../../lib/sponsordata';

export async function GET() {
  return Response.json(getSponsors());
}