import * as fetchAPI from '../api/repo_util';
import parse from 'parse-link-header';

export const RECEIVE_ALL_REPOS = 'RECEIVE_ALL_REPOS';
export const RECEIVE_ALL_CONTRIBUTORS = 'RECEIVE_ALL_CONTRIBUTORS';
export const RECEIVE_INTERNAL_CONTRIBUTIONS = 'RECEIVE_INTERNAL_CONTRIBUTIONS';

export const receiveAllRepos = repos => {
  return {
    type: RECEIVE_ALL_REPOS,
    repos
  };
};

export const receiveAllContributors = contributors => {
  return {
    type: RECEIVE_ALL_CONTRIBUTORS,
    contributors
  };
};

export const receiveInternalContributions = contributors => {
  return {
    type: RECEIVE_INTERNAL_CONTRIBUTIONS,
    contributors
  };
};

export const fetchRepos = () => dispatch => {
  return fetchAPI.fetchByStars().then(response => {
    return response.json();}).then(repos => {
      return dispatch(receiveAllRepos(repos));
    });
};

export const fetchContributors = (owner, name) => dispatch => {
  return fetchAPI.fetchContributors(owner,name).then(response => {
    const count = parse(response.headers.get("Link")).last.page;
    const url = response.url.slice(38);
    const rest = url.indexOf("/");
    const repo = url.slice(0, rest);
    return {count, repo} ;}).then(contributors => {
    return dispatch(receiveAllContributors(contributors));
  });
};

export const fetchInternalContributors = (owner, name) => dispatch => {
  return fetchAPI.fetchAllContributors(owner,name).then(response => {
    return response.json().then(contributors => {
        return dispatch(receiveInternalContributions(contributors));
      });
    });
  };
