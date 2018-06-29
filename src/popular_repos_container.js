import { connect } from 'react-redux';
import Popular from './popular_repos';
import { fetchRepos, fetchContributors } from './actions/repos_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    repos: state.entities.repos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRepos: () => dispatch(fetchRepos()),
    fetchContributors: (owner, name) => dispatch(fetchContributors(owner, name))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Popular));
