export const schemaToArgs = (schema) => {
  const args = {};
  Object.entries(schema.properties).forEach(([key, fragment]) => {

    if (fragment.default !== undefined) {
      args[key] = fragment.default;
    }
  });
  return args;
}
