export const openModal = (name, props) => {
  return {
    type: 'SHOW_MODAL',
    modalType: name,
    modalProps: props || {},
  };
};

export const closeModal = () => ({
  type: 'HIDE_MODAL',
});
