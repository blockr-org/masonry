import { getGrid, setGrid } from "./storage.js";

export const getConfigShiny = (opts) => {
  setTimeout(() => {
    getConfig(opts);
  }, opts.delay || 0);
};

export const getConfig = (opts) => {
  let rows = [];
  $(`#${opts.target}`)
    .find(".masonry-row")
    .each((_i, row) => {
      let items = [];

      $(row)
        .find(".masonry-item")
        .each((i, item) => {
          let first = [];

          $(item)
            .children()
            .each((_i, el) => {
              first.push(el);
            });

          let childId = "";
          if (first.length > 0) childId = $(first[0]).attr("id");

          let opt = {
            width: getDimensions(item),
            id: $(item).attr("id"),
            childId: childId,
          };

          items.push(opt);
        });

      let total = items.map((item) => item.width).reduce((c, p) => c + p, 0);

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

  window.Shiny.setInputValue(`${opts.target}_config:force.raw`, config);
};

const asPercentage = (x, total) => {
  return Math.round((x / total) * 100);
};

const getDimensions = (el) => {
  let perc = $(el).css("width").replace("%", "");

  if (perc) return parseInt(perc);

  return $(el).width() || 0;
};

export const restoreConfig = (opts) => {
  setTimeout(() => {
    setGrid(opts.target, opts.config?.opts);
    rearrangeGrid(opts);

    // resize widths
    $(`#${opts.target}`)
      .find(".masonry-row")
      .each((ri, row) => {
        $(row)
          .find(".masonry-item")
          .each((ii, item) => {
            $(item).css(
              "width",
              `${opts.config.grid[ri].items[ii].percentage}%`,
            );
            $(item).trigger("resize");
          });
      });

    getGrid(`#${opts.target}`);
  }, opts.delay || 0);
};

const rearrangeGrid = (opts) => {
  opts.config.grid.map((row, rowIndex) => {
    $(`#${opts.target}`).find(`.masonry-row:eq(${rowIndex})`).attr("id");
    const toRowId = row.id;

    row.items.map((item, itemIndex) => {
      $(`#${opts.target}`).find(`.masonry-item:eq(${itemIndex})`).attr("id");
      const toItemId = item.id;

      $(`#${toItemId}`).appendTo(`#${toRowId}`);
    });
  });
};
