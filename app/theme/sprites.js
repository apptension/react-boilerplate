import { css } from 'styled-components';
import { media } from './media';

const spriteMap = {
  mobile: {
    manifest: require('../images/generated/mobile-sprite.json'),
    img: require('../images/generated/mobile-sprite.png'),
    retinaImg: require('../images/generated/mobile-sprite-2x.png'),
  },
  desktop: {
    manifest: require('../images/generated/desktop-sprite.json'),
    img: require('../images/generated/desktop-sprite.png'),
    retinaImg: require('../images/generated/desktop-sprite-2x.png'),
  },
};

const buildSprite = (name) => {
  if (!spriteMap[name]) {
    throw new Error(`Sprite ${name} is not configured!`);
  }

  const { manifest, img, retinaImg } = spriteMap[name];

  return (imageName) => {
    if (process.env.NODE_ENV === 'development') {
      if (!manifest[imageName]) {
        throw new Error(`No image named "${imageName}" available in "${name}" sprite!`);
      }
    }

    const data = manifest[imageName] || { normal: {}, retina: {} };

    const base = css`
      width: ${data.normal.width}px;
      height: ${data.normal.height}px;
    `;

    const regular = css`
      ${base};
      background-image: url(${img});
      background-position: -${data.normal.x}px -${data.normal.y}px;
    `;

    const retina = css`
      ${base};
      background-image: url(${retinaImg});
      background-position: -${data.retina.x / 2}px -${data.retina.y / 2}px;
      background-size: ${data.retina.total_width / 2}px ${data.retina.total_height / 2}px;
    `;

    return css`
      ${media[name]`${regular}`}
      ${media[`${name}Retina`]`${retina}`}
    `;
  };
};

export const mobile = buildSprite('mobile');
export const desktop = buildSprite('desktop');
