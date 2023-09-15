import { getGrid } from "./storage.js";

export const addRow = (opts) => {
  let row = `<div 
    class='masonry-row d-flex ${opts.classes}'
    data-masonry-minheight = ${opts.min_height}
    data-masonry-height = ${opts.height}
    ></div>`;

  let $target = $(`${opts.target}`).find(".masonry-grid-content");

  if (opts.position == "bottom") {
    $target.append(row);
  }

  if (opts.position == "top") {
    $target.prepend(row);
  }

  const gridOpts = getGrid(opts.target);
  $(`${opts.target}`).masonry(gridOpts);
};

export const addItem = (opts) => {
  let row = `<div class='masonry-item ${opts.classes}'>${opts.item}</div>`;

  let $target = $(`${opts.target}`)
    .find(".masonry-grid-content")
    .find(`.masonry-row:eq(${opts.row_index})`);

  if (opts.position == "end") {
    $target.append(row);
  }

  if (opts.position == "start") {
    $target.prepend(row);
  }

  let gridOpts = getGrid(opts.target);
  $(`${opts.target}`).masonry(gridOpts);
};

export const removeItem = (opts) => {
  $(`${opts.target}`)
    .find(".masonry-grid-content")
    .find(`.masonry-row:eq(${opts.row_index})`)
    .find(`.masonry-item:eq(${opts.item_index})`)
    .remove();
};

export const removeRow = (opts) => {
  $(`${opts.target}`)
    .find(".masonry-grid-content")
    .find(`.masonry-row:eq(${opts.row_index})`)
    .remove();
};
