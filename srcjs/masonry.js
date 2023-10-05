import { identifier } from "./id.js";
import { setGrid } from "./storage.js";

export const masonry = (el, opts) => {
  opts = opts || {};
  masonMains(el, opts);
};

const listen = (el, opts) => {
  $(el).find(".masonry-item").on("mouseup", (event) => {
    $(event.target).trigger("resize");
  });
};

const masonMains = (el, opts) => {
  if ($(el).hasClass("masonry-grid")) {
    masonMain(el[0], opts);
    return;
  }

  $(el).find(".masonry-grid").each((i, m) => {
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
};

const masonRows = (el, opts) => {
  $(el).find(".masonry-row").each((i, row) => {
    masonRow(row, opts);
  });
};

const masonRow = (el, opts) => {
  const mh = $(el).data("masonry-minheight");
  $(el).css("min-height", mh);

  const h = $(el).data("masonry-height");
  if (h) {
    $(el).css("height", h);
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
  $(el).find(".masonry-item").each((i, item) => {
    masonItem(item, opts);
  });
};

const masonItem = (el, opts) => {
  if (opts.items) {
    for (const key in opts.items) {
      $(el).css(key, opts.items[key]);
    }
  }

  let w = $(el).data("masonry-width");
  if (!w) w = 20;
  $(el).css("width", `${w}%`);

  if ($(el).attr("id")) {
    return;
  }

  let id = identifier(20);
  $(el).attr("id", id);
};

const sortableItems = (el, opts) => {
  let sortOpts = {
    multiDrag: false,
    fallbackTolerance: 2,
    animation: 150,
    swap: false,
    draggable: ".masonry-item",
    onEnd: (event) => {
      $(event.item).closest(".masonry-row").trigger("resize");
    },
  };

  if (opts.group) {
    sortOpts.group = opts.group;
  }

  new Sortable(el, sortOpts);
};

const sortableRows = (el, opts) => {
  let sortOpts = {
    multiDrag: false,
    fallbackTolerance: 2,
    animation: 150,
    swap: false,
    draggable: ".masonry-row",
    onEnd: (event) => {
      $(event.item).trigger("resize");
    },
  };

  new Sortable(el[0], sortOpts);
};

const normalise = (el, opts) => {
  let widths = [];
  $(el).find(".masonry-item").each((i, item) => {
    widths.push($(item).data("masonry-width") || .2);
  });

  if (widths.length == 0) {
    return;
  }

  let total = widths.reduce((c, p) => c + p);

  if (total < 100) {
    let missing = 100 - total;
    $(el).find(".masonry-item").last().data(
      "masonry-width",
      widths[widths.length - 1] + missing,
    );
  }

  let excess = total - 100;
  $(el).find(".masonry-item").last().data(
    "masonry-width",
    widths[widths.length - 1] - excess,
  );
};
