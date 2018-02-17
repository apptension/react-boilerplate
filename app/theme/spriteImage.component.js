import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mobile, desktop } from './sprites';

const mobileSprite = (props) => {
  const name = props.mobile || props.name;
  if (name) {
    return mobile(name);
  }

  return null;
};

const desktopSprite = (props) => {
  const name = props.desktop || props.name;
  if (name) {
    return desktop(name);
  }

  return null;
};

const SpriteImage = styled.i`
  display: block;
  ${mobileSprite}
  ${desktopSprite}
`;

SpriteImage.propTypes = {
  desktop: PropTypes.string,
  mobile: PropTypes.string,
  name: PropTypes.string,
};

export default SpriteImage;
