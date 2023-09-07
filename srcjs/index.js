import "shiny";
import { masonry } from "./masonry.js";

jQuery.fn.extend({
  masonry: function () {
    masonry(this, {});
  },
});

$(() => {
  $(document).masonry();
});

Shiny.addCustomMessageHandler("masonry-init", (msg) => {
  $(`#${msg.target}`).masonry();
});
