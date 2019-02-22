import reportError from 'report-error';
import { ifElse, isNil, always, when, is, complement, equals, pipe } from 'ramda';
import { List } from 'immutable';


export const renderWhen = (pred, fn) => ifElse(pred, fn, always(null));

export const renderWhenNotNil = (fn) => renderWhen(complement(isNil), fn);

export const renderWhenTrue = (fn) => renderWhen(equals(true), fn);

export const renderWhenTrueOtherwise = (fn, otherwise) => ifElse(equals(true), fn, otherwise);

export const getFormFieldHelperText = (intl, messages, { error, invalid, touched }) => {
  if (invalid && touched) {
    try {
      return intl.formatMessage(messages[pipe(
        when(
          is(List),
          (errors) => errors.first()
        ),
        when(
          is(Array),
          ([firstError]) => firstError
        ),
      )(error)]);
    } catch (e) {
      reportError(e);
    }
  }
  return '';
};
