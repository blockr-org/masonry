#' Row
#' 
#' Masonry row
#' 
#' @param ... Any number of [masonryRow()].
#' @param options [list()] of options.
#' @param id CSS ID of masonry element.
#' 
#' @importFrom htmltools div tags HTML
#' @importFrom jsonlite toJSON
#' 
#' @export
masonry <- \(..., options = list(), id = NULL){
  script <- options |>
    as.list() |>
    toJSON(auto_unbox = TRUE) |>
    as.character()

  div(
    class = "masonry-main",
    div(
      class = "masonry-main-content",
      masonryDependencies(),
      ...
    ),
    tags$script(
      type = "application/json",
      HTML(script)
    )
  )
}

#' Row
#' 
#' Masonry row
#' 
#' @param ... Any number of [masonryItem()].
#' @param min_height Minimum height of row, a valid CSS value.
#'  This is used because if not set the row goes to 0 height if empty
#'  and users can then no longer drag [masonryItem()] to it.
#' 
#' @export
masonryRow <- \(..., min_height = "5rem"){
  div(
    class = "masonry-row d-flex",
    `masonry-minheight` = min_height,
    ...
  )
}

#' Item
#' 
#' Masonry item
#' 
#' @param ... Content of the item.
#' @param width Width, a percentage (`numeric`, e.g.: `.5`).
#' 
#' @export
masonryItem <- \(..., width = NULL){
  if(!is.null(width) && width < 1)
    width <- round(width * 100L)

  div(
    class = "masonry-item",
    `data-masonry-width` = width,
    ...
  )
}
