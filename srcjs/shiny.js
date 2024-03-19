import { getGrid } from "./storage.js";
import { identifier } from "./id.js";
import { getConfig } from "./config.js";

export const addRow = (opts) => {
  if (!opts.id) opts.id = identifier();

  const row = `<div id="${opts.id}" class='masonry-row d-flex ${opts.classes}'></div>`;

  const $target = $(`${opts.target}`).find(".masonry-grid-content");

  if (opts.position == "bottom") {
    $target.append(row);
  }

  if (opts.position == "top") {
    $target.prepend(row);
  }

  window.Shiny.renderDependenciesAsync(opts.content.deps).then(() => {
    window.Shiny.renderContentAsync($(`#${opts.id}`), opts.content.html).then(
      () => {
        const gridOpts = getGrid(opts.target);
        $(`${opts.target}`).masonry(gridOpts);

        const event = new CustomEvent("masonry:added-row", {
          detail: opts.id,
        });
        document.dispatchEvent(event);
        getConfig({ target: opts.target.replace("#", "") });
        window.Shiny.setInputValue(
          `${opts.target.replace("#", "")}_added_row:force.raw`,
          opts,
        );
      },
    );
  });
};

export const addItem = (opts) => {
  setTimeout(() => {
    opts.id = identifier();
    const row = `<div id="${opts.id}" class='masonry-item ${opts.classes}'></div>`;

    let $target;
    if (!opts.row_id) {
      $target = $(`${opts.target}`)
        .find(".masonry-grid-content")
        .find(`.masonry-row:eq(${opts.row_index})`);
    }

    if (opts.row_id) {
      $target = $(`${opts.row_id}`);
    }

    if (opts.position == "end") {
      $target.append(row);
    }

    if (opts.position == "start") {
      $target.prepend(row);
    }

    window.Shiny.renderDependenciesAsync(opts.item.deps).then(() => {
      window.Shiny.renderContentAsync($(`#${opts.id}`), opts.item.html).then(
        () => {
          const gridOpts = getGrid(opts.target);
          $(`${opts.target}`).masonry(gridOpts);

          const event = new CustomEvent("masonry:added-item", {
            detail: opts.id,
          });
          document.dispatchEvent(event);
          getConfig({ target: opts.target.replace("#", "") });
          window.Shiny.setInputValue(
            `${opts.target.replace("#", "")}_added_item:force.raw`,
            opts,
          );
        },
      );
    });
  }, opts.delay || 0);
};

export const removeItem = (opts) => {
  if (opts.item_id) {
    $(`#${opts.item_id}`).remove();
    return;
  }

  const id = $(`${opts.target}`).closest(".masonry-grid").attr("id");

  $(`${opts.target}`)
    .find(".masonry-grid-content")
    .find(`.masonry-row:eq(${opts.row_index})`)
    .find(`.masonry-item:eq(${opts.item_index})`)
    .remove();

  getConfig({ target: id });
};

export const removeRow = (opts) => {
  const id = $(`${opts.target}`).closest(".masonry-grid").attr("id");

  $(`${opts.target}`)
    .find(".masonry-grid-content")
    .find(`.masonry-row:eq(${opts.row_index})`)
    .remove();

  getConfig({ target: id });
};

export const run = (opts) => {
  setTimeout(() => {
    $(`${opts.target}`).masonry();
  }, opts.delay);
};

const masonryBinding = new window.Shiny.OutputBinding();

$.extend(masonryBinding, {
  find: function (scope) {
    return $(scope).find(".masonry-grid-shiny");
  },
  renderValue: function (el, data) {
    window.Shiny.renderContentAsync(el, data.content).then(() => {
      $(el).masonry(data.options);
    });
  },
});

// register
window.Shiny.outputBindings.register(masonryBinding, "masonry.masonry");
