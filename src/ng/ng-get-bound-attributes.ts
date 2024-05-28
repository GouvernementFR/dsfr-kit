import lookup from './attributes-lookup';

export const ngGetBoundAttributes = (schema: any, element: string | undefined) => {
    const attributes: string[] = element ? schema?.[element]?.attributes : schema.element?.attributes;
    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) return '';
    let boundAttributes:string = '';
    for (const attribute of attributes) {
        const bound:string = lookup[attribute] || `attr.${attribute}`;
        boundAttributes += ` [${bound}]="props.attributes['${attribute}']"`;
    }
    return boundAttributes;
}
