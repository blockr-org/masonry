import "shiny";
import { masonry } from "./masonry.js";
import { addItem, addRow, removeItem, removeRow } from "./shiny.js";
import { getConfig, restoreConfig } from "./config.js";

jQuery.fn.extend({
  masonry: function (opts) {
    masonry(this, opts);
  },
});

Shiny.addCustomMessageHandler("masonry-add-row", addRow);
Shiny.addCustomMessageHandler("masonry-add-item", addItem);
Shiny.addCustomMessageHandler("masonry-remove-item", removeItem);
Shiny.addCustomMessageHandler("masonry-remove-row", removeRow);
Shiny.addCustomMessageHandler("masonry-get-config", getConfig);
Shiny.addCustomMessageHandler("masonry-restore-config", restoreConfig);
Shiny.addCustomMessageHandler("masonry-run", (msg) => {
  $(msg.target).masonry();
});
