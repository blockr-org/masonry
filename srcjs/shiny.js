import { getGrid } from "./storage.js";
import { identifier } from "./id.js";

export const addRow = (opts) => {
  opts.id = identifier();

  let row =
    `<div id="${opts.id}" class='masonry-row d-flex ${opts.classes}'></div>`;

  let $target = $(`${opts.target}`).find(".masonry-grid-content");

  if (opts.position == "bottom") {
    $target.append(row);
  }

  if (opts.position == "top") {
    $target.prepend(row);
  }

  Shiny.renderContentAsync($(`#${opts.id}`), opts.content)
    .then(() => {
      const gridOpts = getGrid(opts.target);
      $(`${opts.target}`).masonry(gridOpts);

      const event = new CustomEvent("masonry:added-row", { detail: opts.id });
      document.dispatchEvent(event);
    });
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

var masonryBinding = new Shiny.OutputBinding();

$.extend(masonryBinding, {
  find: function (scope) {
    return $(scope).find(".masonry-grid-shiny");
  },
  renderValue: function (el, data) {
    Shiny.renderContentAsync(el, data.content)
      .then(() => {
        $(el).masonry(data.options);
      });
  },
});

// register
Shiny.outputBindings.register(masonryBinding, "masonry.masonry");
