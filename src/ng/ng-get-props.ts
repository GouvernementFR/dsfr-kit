export const ngGetProps = (component: any, Model: any) => {
    const inputs:any = {};
    Object.keys(Model.schema.props).forEach(key => inputs[key] = component[key]);
    const model = new Model( inputs, Model.Context.ANGULAR);
    return model.props;
}
