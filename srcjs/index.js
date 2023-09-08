import "shiny";
import { masonry } from "./masonry.js";
import { addItem, addRow } from "./shiny.js";
import { getConfig } from "./config.js";

jQuery.fn.extend({
  masonry: function (opts) {
    masonry(this, opts);
  },
});

Shiny.addCustomMessageHandler("masonry-init", (msg) => {
  $(`${msg.target}`).masonry();
});

Shiny.addCustomMessageHandler("masonry-add-row", addRow);
Shiny.addCustomMessageHandler("masonry-add-item", addItem);
Shiny.addCustomMessageHandler("masonry-get-config", getConfig);
