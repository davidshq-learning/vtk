function createProxyDefinition(
    classFactory,
    ui = [],
    links = [],
    definitionOptions = {},
    props = {},
 ) {
    return {
        class: classFactory,
        options: { links, ui, ...definitionOptions },
        props,
    };
 }

function activateOnCreate(def) {
    def.options.activateOnCreate = true;
    return def;
}