import "shiny";
import { masonry } from "./masonry.js";
import { addItem, addRow, removeItem, removeRow, run } from "./shiny.js";
import { getConfigShiny, restoreConfig } from "./config.js";

jQuery.fn.extend({
  masonry: function (opts) {
    masonry(this, opts);
  },
});

window.Shiny.addCustomMessageHandler("masonry-add-row", addRow);
window.Shiny.addCustomMessageHandler("masonry-add-item", addItem);
window.Shiny.addCustomMessageHandler("masonry-remove-item", removeItem);
window.Shiny.addCustomMessageHandler("masonry-remove-row", removeRow);
window.Shiny.addCustomMessageHandler("masonry-get-config", getConfigShiny);
window.Shiny.addCustomMessageHandler("masonry-restore-config", restoreConfig);
window.Shiny.addCustomMessageHandler("masonry-run", run);
