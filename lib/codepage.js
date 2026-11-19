import { getGithubRepos } from './githubdata';

export async function getCodePage(pageNum) {
  const resp = await getGithubRepos();
  const sortedRepos = resp.repos.sort(nameCompare);
  const pageCount = Math.ceil(sortedRepos.length / 10);
  const inRange = pageNum <= pageCount - 1;
  const repos = sortedRepos.slice(pageNum * 10, pageNum * 10 + 10);
  return { repos, currPage: pageNum, pageCount, inRange };
}

export function nameCompare(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}