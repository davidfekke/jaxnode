import cache from 'memory-cache';

const CACHE_KEY = 'githubrepos';
const CACHE_TTL = 3600000;

/*
 * Fetch all public repos for the JaxNode organization from the GitHub API,
 * paginating through every page. Results are cached in memory for an hour.
 */
export async function getGithubRepos() {
  const cached = cache.get(CACHE_KEY);
  if (cached) {
    return { repos: cached };
  }

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'JaxNode'
  };

  const orgResp = await fetch('https://api.github.com/orgs/jaxnode-ug', { headers });
  if (!orgResp.ok) {
    throw new Error(`GitHub org request failed: ${orgResp.status}`);
  }
  const orgData = await orgResp.json();

  const repoCounter = Math.ceil(orgData.public_repos / 30);
  let repos = [];
  for (let i = 1; i <= repoCounter; i++) {
    const url = i === 1
      ? 'https://api.github.com/orgs/jaxnode-ug/repos'
      : `https://api.github.com/orgs/jaxnode-ug/repos?page=${i}`;
    const repoResponse = await fetch(url, { headers });
    if (!repoResponse.ok) {
      throw new Error(`GitHub repos request failed: ${repoResponse.status}`);
    }
    const data = await repoResponse.json();
    repos = i === 1 ? data : [...repos, ...data];
  }

  cache.put(CACHE_KEY, repos, CACHE_TTL);
  return { repos };
}