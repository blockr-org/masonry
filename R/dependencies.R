#' Dependencies
#' 
#' Masonry dependencies.
#' 
#' @importFrom htmltools htmlDependency
#' 
#' @export
masonryDependencies <- function() { # nolint
  list(
    htmlwidgets::getDependency("sortable"),
    htmlDependency(
      name = "masonry",
      version = utils::packageVersion("masonry"),
      src = "assets",
      script = "index.js",
      stylesheet = "style.css",
      package = "masonry"
    )
  )
}
