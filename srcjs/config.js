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

  console.log(config);
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

  $(`#${opts.target}`).find(".masonry-row").each((ri, row) => {
    let cRowId = $(row).attr("id");
    let oRowId = opts.config.grid[ri].id;

    // row ids match
    if (cRowId == oRowId) {
      $(row).find(".masonry-item").each((ii, item) => {
        let cItemId = $(item).attr("id");

        if ((ii + 1) > opts.config.grid[ri].items.length) {
          return;
        }

        let oItemId = opts.config.grid[ri].items[ii].id;

        // items id do not match
        if (cItemId != oItemId) {
          $(`#${oItemId}`).prependTo(row);
        }

        // items id do match
        // nothing to do
      });

      return;
    }

    // row ids do not match
    // still check if ids need reorder
    $(row).find(".masonry-item").each((ii, item) => {
      let cItemId = $(item).attr("id");
      let oItemId = opts.config.grid[ri].items[ii].id;

      if (ii > (opts.config.grid[ri].items.length - 1)) {
        return;
      }

      // items id do not match
      if (cItemId != oItemId) {
        $(`#${oItemId}`).prependTo(row);
      }

      // items id do match
      // nothing to do
    });
  });
};
