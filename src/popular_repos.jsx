import React from 'react';


class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: 'stars',
      repos: this.props.repos,
      cont: null
    };
    this.handleStars = this.handleStars.bind(this);
    this.handleForks = this.handleForks.bind(this);
    this.handleContributors = this.handleContributors.bind(this);
  }

  componentDidMount() {
    this.props.fetchRepos().then(res => {
      const repos = res.repos.sort((a, b) => {
        const starsA = a.stargazers_count;
        const starsB = b.stargazers_count;
        return starsB - starsA;
      });
        this.setState({ repos });
      });
  }

  handleStars(e) {
    this.setState({ sorted: e.target.value });
    let repos = this.state.repos;
    repos = repos.sort((a, b) => {
      const starsA = a.stargazers_count;
      const starsB = b.stargazers_count;
      return starsB - starsA;
    });
    this.setState({ repos });
  }

  handleForks(e) {
    this.setState({ sorted: e.target.value });
    let repos = this.state.repos;
    repos = repos.sort((a, b) => {
      const forksA = a.forks_count;
      const forksB = b.forks_count;
      return forksB - forksA;
    });
    this.setState({ repos });
  }

  handleContributors(e) {
    this.setState({ sorted: e.target.value });
    let repos = this.state.repos;
    this.props.fetchContributors(repos[0].owner.login, repos[0].name)

  }


  renderRepos() {
    if (Object.values(this.state.repos).length > 0) {
      return this.state.repos.map( (repo, i) => {
        return <li key={i}>{repo.name}</li>;
      });
    } else {
      return null;
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
          <ul>
            {this.renderRepos()}
          </ul>
      </div>
    );
  }

}

export default Popular;
