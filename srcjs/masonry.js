export const masonry = (el, opts) => {
  masonMains(el, opts);
};

const masonMains = (el, opts) => {
  $(el).find(".masonry-main").each((i, m) => {
    masonMain(m, opts);
  });
};

const masonMain = (el, opts) => {
  masonRows(el, opts);
  sortable(el, opts);
};

const masonRows = (el, opts) => {
  $(el).find(".masonry-row").each((i, row) => {
    masonRow(row, opts);
  });
};

const masonRow = (el, opts) => {
  $(el).addClass("row");
  masonItems(el, opts);
  sortable(el, opts);
};

const masonItems = (el, opts) => {
  $(el).find(".masonry-item").each((i, item) => {
    masonItem(item, opts);
  });
};

const masonItem = (el, opts) => {
  let w = $(el).data("masonry-width");

  if (!w) {
    w = 1;
  }

  $(el).addClass(`col-md-${w}`);
};

const sortable = (el, opts) => {
  new Sortable(el, {
    multiDrag: true,
    selectedClass: "masonry-selected",
    fallbackTolerance: 2,
    animation: 150,
    swap: true,
  });
};
