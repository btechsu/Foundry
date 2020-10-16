import { connect } from 'react-redux';

const IsInClub = (clubID) => {
  return 'Hello';
};

export default connect(({ firebase: { profile } }) => ({ profile }))(IsInClub);
