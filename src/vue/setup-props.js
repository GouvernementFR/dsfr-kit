

export const setupProps = (props, Model, reactive, computed) => {
  props = reactive(props);
  return{
    props: computed(() => new Model(props).props),
  };
};
