import { getGrid } from "./storage.js";

export const getConfig = (opts) => {
  let rows = [];
  $(`#${opts.target}`).find(".masonry-row").each((i, row) => {
    let items = [];

    $(row).find(".masonry-item").each((i, item) => {
      let opt = {
        width: getDimensions(item),
        id: $(item).attr("id"),
      };

      items.push(opt);
    });

    let total = items.map((item) => item.width).reduce((c, p) => c + p);

    items = items.map((item) => {
      item.percentage = asPercentage(item.width, total);
      return item;
    });

    rows.push(items);
  });

  let config = {
    opts: getGrid(`#${opts.target}`),
    dimensions: rows,
  };

  Shiny.setInputValue(`${opts.target}_config:force.raw`, config);
};

const asPercentage = (x, total) => {
  return Math.round((x / total) * 100);
};

const getDimensions = (el) => {
  return $(el).width();
};

export const restoreConfig = (opts) => {
  $(`#${opts.target}`).find(".masonry-row").each((ri, row) => {
    $(row).find(".masonry-item").each((ii, item) => {
      $(item).css("width", `${opts.config.dimensions[ri][ii].percentage}%`);
      $(item).trigger("resize");
    });
  });
};
