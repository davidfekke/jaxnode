import nextmeeting from '../data/nextmeeting.json';

/*
 * Returns the next meetup from the cached local data file.
 */
export async function getNextMeetup() {
  return nextmeeting[0];
}