export const getConfig = (opts) => {
  let config = [];
  $(`#${opts.target}`).find(".masonry-row").each((i, row) => {
    let items = [];

    $(row).find(".masonry-item").each((i, item) => {
      let opt = {
        width: getDimensions(item),
      };

      items.push(opt);
    });

    let total = items.map((item) => item.width).reduce((c, p) => c + p);

    items = items.map((item) => {
      item.percentage = asPercentage(item.width, total);
      return item;
    });

    config.push(items);
  });

  Shiny.setInputValue(`${opts.target}_config:force.raw`, config);
};

const asPercentage = (x, total) => {
  return Math.round((x / total) * 100);
};

const getDimensions = (el) => {
  return $(el).width();
};
