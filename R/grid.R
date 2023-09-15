#' Row
#' 
#' Masonry row
#' 
#' @param ... Any number of [masonryRow()].
#' @param styles [list()] of options for `items` and `rows`, 
#'  e.g.: `list(items = list(margin = ".5rem"))`.
#' @param id CSS ID of masonry element.
#' @param classes Any additional classes.
#' 
#' @importFrom htmltools div tags HTML
#' @importFrom jsonlite toJSON
#' 
#' @export
masonryGrid <- \(..., styles = list(), id = NULL, classes = ""){
  if(is.null(id))
    id <- identifier()

  options <- styles |>
    as.list() |>
    toJSON(auto_unbox = TRUE) |>
    as.character()

  script <- sprintf("$('#%s').masonry(%s);", id, options)

  div(
    id = id,
    class = sprintf("masonry-grid %s", classes),
    div(
      class = "masonry-grid-content",
      masonryDependencies(),
      ...
    ),
    tags$script(HTML(script))
  )
}

#' Row
#' 
#' Masonry row
#' 
#' @param ... Any number of [masonryItem()].
#' @param height Height, fixed height of the row.
#' @param min_height Minimum height of row, a valid CSS value.
#'  This is used because if not set the row goes to 0 height if empty
#'  and users can then no longer drag [masonryItem()] to it.
#' @param classes Any additional classes.
#' 
#' @export
masonryRow <- \(..., min_height = "5rem", height = NULL, classes = ""){
  div(
    class = sprintf("masonry-row d-flex %s", classes),
    `data-masonry-minheight` = min_height,
    `data-masonry-height` = height,
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
masonryItem <- \(..., width = .2, classes = ""){
  if(!is.null(width) && width < 1)
    width <- round(width * 100L)

  div(
    class = sprintf("masonry-item flex-grow-1 %s", classes),
    `data-masonry-width` = width,
    ...
  )
}
