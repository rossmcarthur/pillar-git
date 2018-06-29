export const fetchByStars = () => {
  return fetch(`https://api.github.com/orgs/facebook/repos?per_page=10`, {
      headers: {
        Authorization: "f9e016816b5df83f23781fcf8bbdbc587c38c2ad"
      },
      method: 'GET',
  });
};

export const fetchContributors = (owner, name) => {
  return fetch(`https://api.github.com/repos/${owner}/${name}/contributors?per_page=1`, {
    headers: {
      Authorization: "f9e016816b5df83f23781fcf8bbdbc587c38c2ad"
    },
    method: "GET"
  });
};
