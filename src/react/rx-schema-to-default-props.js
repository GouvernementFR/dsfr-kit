export const rxSchemaToDefaultProps = (schema) => {
  const defaultProps = {};
  Object.entries(schema.properties).forEach(([key, fragment]) => {
    if (fragment.default !== undefined) {
      defaultProps[key] = fragment.default;
    }
  });
  return defaultProps;
}
