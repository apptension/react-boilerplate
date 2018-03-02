import { ifElse, isNil, always, complement, equals } from 'ramda';

export const renderWhen = (pred, fn) => ifElse(pred, fn, always(null));

export const renderWhenNotNil = (fn) => renderWhen(complement(isNil), fn);

export const renderWhenTrue = (fn) => renderWhen(equals(true), fn);

export const renderWhenTrueOtherwise = (fn, otherwise) => ifElse(equals(true), fn, otherwise);
