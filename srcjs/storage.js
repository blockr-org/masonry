const grids = {};

export const setGrid = (id, opts) => {
  grids[`#${id}`] = opts;
};

export const getGrid = (id) => {
  return grids[id];
};
