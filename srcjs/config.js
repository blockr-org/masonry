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

    let r = {
      id: $(row).attr("id"),
      items: items,
    };

    rows.push(r);
  });

  let config = {
    opts: getGrid(`#${opts.target}`),
    grid: rows,
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
  rearrangeGrid(opts);

  // resize widths
  $(`#${opts.target}`).find(".masonry-row").each((ri, row) => {
    $(row).find(".masonry-item").each((ii, item) => {
      $(item).css("width", `${opts.config.grid[ri].items[ii].percentage}%`);
      $(item).trigger("resize");
    });
  });
};

const rearrangeGrid = (opts) => {
  let items = [];

  opts.config.grid.map((row, rowIndex) => {
    const existingRowId = $(`#${opts.target}`).find(
      `.masonry-row:eq(${rowIndex})`,
    ).attr("id");
    const toRowId = row.id;

    row.items.map((item, itemIndex) => {
      const existingItemId = $(`#${opts.target}`).find(
        `.masonry-item:eq(${itemIndex})`,
      ).attr("id");
      const toItemId = item.id;

      $(`#${toItemId}`).appendTo(`#${toRowId}`);
    });
  });
};
