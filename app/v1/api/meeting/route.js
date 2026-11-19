import { getNextMeetup } from '../../../../lib/meetupdata';

export async function GET() {
  try {
    const results = await getNextMeetup();
    return Response.json({ meeting: results });
  } catch {
    return Response.json({ meeting: 'Error occured' }, { status: 500 });
  }
}