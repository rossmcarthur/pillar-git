import { connect } from 'react-redux';
import Popular from './popular_repos';
import { fetchRepos, fetchContributors } from './actions/repos_actions';

const mapStateToProps = state => {
  return {
    repos: state.entities.repos,
    contributors: state.entities.contributors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRepos: () => dispatch(fetchRepos()),
    fetchContributors: (owner, name) => dispatch(fetchContributors(owner, name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
