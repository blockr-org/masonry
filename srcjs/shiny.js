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
        if (opts.event_id) window.Shiny.setInputValue(opts.event_id, opts);
      },
    );
  });
};

export const addItem = (opts) => {
  let id = opts.id;
  if (id === undefined || id === null || id === "") id = identifier();

  const item = `<div id="${id}" class='masonry-item ${opts.classes}'></div>`;

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
    $target.append(item);
  }

  if (opts.position == "start") {
    $target.prepend(item);
  }

  window.Shiny.renderDependenciesAsync(opts.item.deps)
    .then(() => {
      window.Shiny.renderContentAsync($(`#${id}`), opts.item.html)
        .then(() => {
          if (opts.mason) {
            const gridOpts = getGrid(opts.target);
            $(`${opts.target}`).masonry(gridOpts);
          }

          const event = new CustomEvent("masonry:added-item", {
            detail: id,
          });
          document.dispatchEvent(event);
          getConfig({ target: opts.target.replace("#", "") });
          if (opts.event_id) window.Shiny.setInputValue(opts.event_id, opts);
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
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
