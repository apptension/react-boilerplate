import { css } from 'styled-components';
import { media, highDPI } from './media';

import mobileSpriteImg from '../images/generated/mobile-sprite.png';
import mobileSpriteRetinaImg from '../images/generated/mobile-sprite-2x.png';
import mobileSpriteManifest from '../images/generated/mobile-sprite.json';

import desktopSpriteImg from '../images/generated/desktop-sprite.png';
import desktopSpriteRetinaImg from '../images/generated/desktop-sprite-2x.png';
import desktopSpriteManifest from '../images/generated/desktop-sprite.json';

const buildSprite = (manifest, spriteImg, spriteRetinaImg) => (imageName) => {
  if (process.env.NODE_ENV === 'development') {
    if (!manifest[imageName]) {
      throw new Error(`No image named "${imageName}" available in sprite!`);
    }
  }

  const data = manifest[imageName] || { normal: {}, retina: {} };

  return css`
    background-image: url(${spriteImg});
    background-position: -${data.normal.x}px -${data.normal.y}px;
    width: ${data.normal.width}px;
    height: ${data.normal.height}px;
    ${highDPI`
      background-image: url(${spriteRetinaImg});
      background-position: -${data.retina.x / 2}px -${data.retina.y / 2}px;
      background-size: ${data.retina.total_width / 2}px ${data.retina.total_height / 2}px;
    `}
  `;
};

const mobileSprite = buildSprite(mobileSpriteManifest, mobileSpriteImg, mobileSpriteRetinaImg);
const desktopSprite = buildSprite(desktopSpriteManifest, desktopSpriteImg, desktopSpriteRetinaImg);

export const mobile = mobileSprite;

export const desktop = (name) => media.desktop`
  ${desktopSprite(name)}
`;
