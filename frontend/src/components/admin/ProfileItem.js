import { deleteProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileItem = ({ profile: { user: { _id, name }, _id: profileId, company, website }, deleteProfile }) => (
  <tr>
    <td>{name}</td>
    <td className="hide-sm">{company}</td>
    <td className="hide-sm">{website}</td>
    <td>
      <button className="btn btn-danger" onClick={() => deleteProfile(profileId)}>Delete</button>
    </td>
    <td>
      <Link to={`/profile/user/${_id}`} className='btn btn-primary'>
        View
      </Link>
    </td>
  </tr>
);

const mapDispatchToProps = dispatch => ({
  deleteProfile: id => dispatch(deleteProfile(id))
});

export default connect(null, mapDispatchToProps)(ProfileItem);
