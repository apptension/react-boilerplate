import React, { PropTypes } from 'react';


const Maintainer = ({ data }) => (
  <li className="maintainer">
    {data.get('firstName')} {data.get('lastName')} &lt;{data.get('email')}&gt;
  </li>
);

Maintainer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Maintainer;
