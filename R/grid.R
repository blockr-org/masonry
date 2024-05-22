#' Row
#' 
#' Masonry row
#' 
#' @param id ID of grid.
#' @param ... Any number of [masonryRow()].
#' @param styles [list()] of options for `items` and `rows`, 
#'  e.g.: `list(items = list(margin = ".5rem"))`.
#' @param classes Any additional classes.
#' @param send_on_change Whether to send config on change.
#' 
#' @importFrom htmltools div tags HTML
#' @importFrom jsonlite toJSON
#' 
#' @export
masonryGrid <- \( # nolint
  ..., 
  styles = list(row = list("min-height" = "5rem")), 
  classes = "", 
  id = NULL,
  send_on_change = TRUE
){
  options <- styles |>
    as.list() |>
    jsonlite::toJSON(auto_unbox = TRUE) |>
    as.character()

  div(
    id = id,
    `data-styles` = options,
    `data-send` = tolower(send_on_change),
    class = sprintf("masonry-grid %s", classes),
    div(
      class = "masonry-grid-content",
      ...
    ),
    masonryDependencies()
  )
}

#' Row
#' 
#' Masonry row
#' 
#' @param ... Any number of [masonryItem()].
#' @param classes Any additional classes.
#' 
#' @export
masonryRow <- \( # nolint
  ..., 
  classes = ""
){
  div(
    class = sprintf("masonry-row position-relative d-flex flex-row %s", classes) |> trimws(),
    ...
  )
}

#' Item
#' 
#' Masonry item
#' 
#' @param ... Content of the item.
#' @param width Initial width, a percentage (`numeric`, e.g.: `.5`).
#' @param classes Any additional classes.
#' 
#' @export
masonryItem <- \( # nolint
  ..., 
  width = .2, 
  classes = ""
){
  if(!is.null(width) && width < 1)
    width <- round(width * 100L)

  div(
    class = sprintf("masonry-item %s", classes) |> trimws(),
    `data-masonry-width` = width,
    ...
  )
}
