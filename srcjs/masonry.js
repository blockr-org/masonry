import { asPercentage, getConfig, getDimensions } from "./config.js";
import { identifier } from "./id.js";
import { setGrid } from "./storage.js";

export const masonry = (el, opts) => {
  if (Array.isArray(opts)) {
    opts = null;
  }

  opts = opts || $(el).data("styles") || {};

  masonMains(el, opts);
};

const listen = (el, _opts) => {
  $(el)
    .find(".masonry-item")
    .on("mouseup", (event) => {
      $(event.target).trigger("resize");
    });
};

const masonMains = (el, opts) => {
  if ($(el).hasClass("masonry-grid")) {
    masonMain(el[0], opts);
    return;
  }

  $(el)
    .find(".masonry-grid")
    .each((_i, m) => {
      masonMain(m, opts);
    });
};

const masonMain = (el, opts) => {
  const id = $(el).attr("id");
  opts.group = id;
  setGrid(id, opts);

  masonRows(el, opts);
  listen(el, opts);
  $(el).addClass("masoned");

  // sortable between rows
  sortableItems(el, opts);
  sortableRows($(el).find(".masonry-grid-content"), opts);

  if ($(el).data("send")) {
    $(el).off("change resize");
    $(el).on("change resize", () => {
      getConfig({ target: id });
    });
  }
};

const masonRows = (el, opts) => {
  $(el)
    .find(".masonry-row")
    .each((_i, row) => {
      masonRow(row, opts);
    });
};

const masonRow = (el, opts) => {
  if (opts.rows) {
    for (const key in opts.rows) {
      $(el).css(key, opts.rows[key]);
    }
  }

  if (!$(el).attr("id")) {
    $(el).attr("id", identifier(20));
  }

  normalise(el, opts);
  masonItems(el, opts);

  // sortable within rows
  sortableItems(el, opts);
};

const masonItems = (el, opts) => {
  $(el)
    .find(".masonry-item")
    .each((_i, item) => {
      masonItem(item, opts);
    });
  enforceFullWidth(el);
};

const masonItem = (el, opts) => {
  if (opts.items) {
    for (const key in opts.items) {
      $(el).css(key, opts.items[key]);
    }
  }

  const id = identifier(20);
  $(el).attr("id", id);
};

const enforceFullWidth = (el) => {
  let widths = [];
  $(el)
    .find(".masonry-item")
    .each((_i, el) => widths.push(getDimensions(el)));

  const total = widths.reduce((c, p) => c + p, 0);

  $(el)
    .find(".masonry-item")
    .each((_i, el) => {
      $(el).css("width", asPercentage(getDimensions(el), total) + "%");
      $(el).trigger("resize");
    });
};

const sortableItems = (el, opts) => {
  const sortOpts = {
    multiDrag: false,
    fallbackTolerance: 2,
    animation: 150,
    swap: false,
    draggable: ".masonry-item",
    onEnd: (event) => {
      $(event.item).closest(".masonry-row").trigger("resize");
      const id = $(event.item).closest(".masonry-grid").attr("id");
      getConfig({ target: id });
    },
  };

  if (opts.group) {
    sortOpts.group = opts.group;
  }

  new window.Sortable(el, sortOpts);
};

const sortableRows = (el, _opts) => {
  const sortOpts = {
    multiDrag: false,
    fallbackTolerance: 2,
    animation: 150,
    swap: false,
    draggable: ".masonry-row",
    onEnd: (event) => {
      $(event.item).trigger("resize");
      const id = $(event.item).closest(".masonry-grid").attr("id");
      getConfig({ target: id });
    },
  };

  new window.Sortable(el[0], sortOpts);
};

const normalise = (el, _opts) => {
  const widths = [];
  $(el)
    .find(".masonry-item")
    .each((_i, item) => {
      widths.push($(item).data("masonry-width") || 0.2);
    });

  if (widths.length == 0) {
    return;
  }

  const total = widths.reduce((c, p) => c + p, 0);

  if (total < 100) {
    const missing = 100 - total;
    $(el)
      .find(".masonry-item")
      .last()
      .data("masonry-width", widths[widths.length - 1] + missing);
  }

  const excess = total - 100;
  $(el)
    .find(".masonry-item")
    .last()
    .data("masonry-width", widths[widths.length - 1] - excess);
};
