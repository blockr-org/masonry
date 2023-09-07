import { identifier } from "./id.js";

export const masonry = (el, opts) => {
  masonMains(el, opts);
};

const listen = (el, opts) => {
  $(el).find(".masonry-item").on("mousedown", (event) => {
    console.log(event);
    $(event.target).trigger("resize");
  });
};

const masonMains = (el, opts) => {
  $(el).find(".masonry-main").each((i, m) => {
    masonMain(m, opts);
  });
};

const masonMain = (el, opts) => {
  if (!opts || Object.keys(opts).length === 0) {
    opts = JSON.parse($(el).find("script").text());
  }

  if (!opts.group) {
    opts.group = identifier(20);
  }

  masonRows(el, opts);
  sortable(el, opts);
  listen(el, opts);
};

const masonRows = (el, opts) => {
  $(el).find(".masonry-row").each((i, row) => {
    masonRow(row, opts);
  });
};

const masonRow = (el, opts) => {
  let h = $(el).data("masonry-minheight");
  $(el).attr("id", opts.group);
  $(el).css("height", h);
  normalise(el, opts);
  masonItems(el, opts);
  sortable(el, opts);
};

const masonItems = (el, opts) => {
  $(el).find(".masonry-item").each((i, item) => {
    masonItem(item, opts);
  });
};

const masonItem = (el, opts) => {
  if (opts.padding) {
    $(el).css("padding", opts.padding);
  }

  if (opts.margin) {
    $(el).css("margin", opts.margin);
  }

  let w = $(el).data("masonry-width");
  $(el).css("width", `${w}%`);

  let id = identifier(20);
  $(el).attr("id", id);
};

const sortable = (el, opts) => {
  let sortOpts = {
    multiDrag: false,
    selectedClass: "masonry-selected",
    fallbackTolerance: 2,
    animation: 150,
    swap: false,
  };

  if (opts.group) {
    sortOpts.group = opts.group;
  }

  new Sortable(el, sortOpts);
};

const normalise = (el, opts) => {
  let widths = [];
  $(el).find(".masonry-item").each((i, item) => {
    widths.push($(item).data("masonry-width"));
  });

  let total = widths.reduce((c, p) => c + p);

  if (total < 100) {
    let missing = 100 - total;
    $(el).find(".masonry-item").last().data(
      "masonry-width",
      widths[widths.length - 1] + missing,
    );
  }
};
