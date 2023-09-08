import "shiny";
import { masonry } from "./masonry.js";
import { addRow } from "./shiny.js";

jQuery.fn.extend({
  masonry: function (opts) {
    masonry(this, opts);
  },
});

Shiny.addCustomMessageHandler("masonry-init", (msg) => {
  $(`${msg.target}`).masonry();
});

Shiny.addCustomMessageHandler("masonry-add-row", addRow);
