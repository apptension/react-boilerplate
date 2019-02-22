export const intlMock = () => ({
  formatMessage: ({ id, defaultMessage, values = {} }) => `${id} / ${defaultMessage} / ${JSON.stringify(values)}`,
});
