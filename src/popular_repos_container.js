import { connect } from 'react-redux';
import Popular from './popular_repos';
import { fetchRepos, fetchContributors, fetchInternalContributors } from './actions/repos_actions';

const mapStateToProps = state => {
  return {
    repos: state.entities.repos,
    contributors: state.entities.contributors,
    users: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRepos: () => dispatch(fetchRepos()),
    fetchContributors: (owner, name) => dispatch(fetchContributors(owner, name)),
    fetchInternalContributors: (owner,name) => dispatch(fetchInternalContributors(owner, name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
