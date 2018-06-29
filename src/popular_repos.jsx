import React from 'react';

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: 'stars',
      users: 'internal',
      repos: this.props.repos,
      contributors: this.props.contributors,
    };
    this.handleStars = this.handleStars.bind(this);
    this.handleForks = this.handleForks.bind(this);
    this.handleContributors = this.handleContributors.bind(this);
    this.handleInternalContributors = this.handleInternalContributors.bind(this);
  }

  componentDidMount() {
    this.props.fetchRepos().then(res => {
    const repos = res.repos.sort((a, b) => {
      const starsA = a.stargazers_count;
      const starsB = b.stargazers_count;
      return starsB - starsA;
    });
      this.setState({ repos, reposPage: this.state.reposPage + 1 });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.contributors !== prevProps.contributors) {
      const cont = this.props.contributors;
      const sorted = Object.keys(cont).sort((a, b) => cont[b] - cont[a]);
      this.setState({ contributors: sorted });
    }
  }

  handleStars(e) {
    this.setState({ sorted: e.target.value });
    let repos = this.state.repos;
    repos = repos.sort((a, b) => {
      let starsA = a.stargazers_count;
      let starsB = b.stargazers_count;
      return starsB - starsA;
    });
    this.setState({ repos });
  }

  handleForks(e) {
    this.setState({ sorted: e.target.value });
    let repos = this.state.repos;
    repos = repos.sort((a, b) => {
      let forksA = a.forks_count;
      let forksB = b.forks_count;
      return forksB - forksA;
    });
    this.setState({ repos });
  }

  handleContributors(e) {
    this.setState({ sorted: e.target.value });
    let repos = this.state.repos;
    repos.forEach(repo => {
      this.props.fetchContributors(repo.owner.login, repo.name);
    });
  }

  handleInternalContributors(e) {
    this.setState({ users: e.target.value });
    let repos = this.state.repos;
    repos.forEach(repo => {
      this.props.fetchInternalContributors(repo.owner.login, repo.name);
    });
    let users = {};
    for (let user in this.state.contributors) {
      if (users[user] === undefined) {
        users[user] = this.state.contributors[user];
      } else {
        users[user] += this.state.contributors[user];
      }
    }
    this.setState({ users });
  }

  renderRepos() {
    if (Object.values(this.state.repos).length > 0 && this.state.sorted === 'stars') {
      return this.state.repos.map( (repo, i) => {
        return <li key={i}>Repo: &nbsp;{repo.name}</li>;
      });
    } else if (Object.values(this.state.repos).length > 0 && this.state.sorted === 'forks') {
      return this.state.repos.map( (repo, i) => {
        return <li key={i}>Repo: &nbsp;{repo.name}</li>;
      });
    }else if (Object.values(this.state.contributors).length > 0 && this.state.sorted === 'contributors'){
      return this.state.contributors.map( (cont, i) => {
        return <li key={i}>{cont}</li>;
      });
    }
  }

  render() {
    return (
      <div>
        <fieldset>
          <legend>Sort repos by:</legend>
          <div>
            <input onClick={this.handleStars} type="radio" name="sort" value="stars" defaultChecked />
            <label>Stars</label>
          </div>
          <div>
            <input onClick={this.handleForks} type="radio" name="sort" value="forks"/>
            <label>Forks</label>
          </div>
          <div>
            <input onClick={this.handleContributors} type="radio" name="sort" value="contributors"/>
            <label>Contributors</label>
            </div>
        </fieldset>
          <ul className="sort-by-repos">
            <label className='repo-sort-label'>Sorted repos by stars/forks/contributors:</label>
            {this.renderRepos()}
          </ul>
          <fieldset>
            <legend>Sort contributors by:</legend>
            <div>
              <input onClick={this.handleInternalContributors} type="radio" name="contributors" value="users" defaultChecked />
              <label>Internal</label>
            </div>
            <div>
              <input type="radio" name="contributors" value="users"/>
              <label>External</label>
            </div>
          </fieldset>
          <ul>
            <label>Sorted internal/external contributors:</label>
          </ul>
      </div>
    );
  }

}

export default Popular;
