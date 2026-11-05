import { getGithubRepos } from '../../../../lib/githubdata';

export async function GET() {
  try {
    const results = await getGithubRepos();
    return Response.json(results.repos);
  } catch {
    return Response.json(
      {
        message: 'problem with request',
        error: {
          status: '500',
          stack: 'problem with request'
        }
      },
      { status: 500 }
    );
  }
}