#' Add a row
#' 
#' Add a row to [masonryGrid()].
#' 
#' @param target `id` of target [masonryGrid()].
#' @param session A valid shiny session.
#' @param classes Additional classes to add to the row.
#' @param position Whether to add the new row at the `top`
#'  or the `bottom`.
#' @inheritParams masonryRow
#' 
#' @export
masonry_add_row <- function(
  target, 
  position = c("bottom", "top"), 
  classes = "",
  min_height = "5rem", 
  height = NULL,
  session = shiny::getDefaultReactiveDomain()
){
  if(missing(target))
    stop("Missing `target`")

  position <- match.arg(position)

  session$sendCustomMessage(
    "masonry-add-row",
    list(
      target = target,
      classes = classes,
      position = position,
      min_height = min_height,
      height = height
    )
  )
}

#' Add an item
#' 
#' Add an item to [masonryRow()].
#' 
#' @param target `id` of target [masonryGrid()].
#' @param row_index Index of row, an integer.
#' @param item htmltools `tags`, the content of the item.
#' @param session A valid shiny session.
#' @param classes Additional classes to add to the row.
#' @param position Whether to add the new row at the `start`
#'  or the `end`.
#' 
#' @export
masonry_add_item <- function(
  target, 
  row_index,
  item,
  position = c("start", "end"), 
  classes = "",
  session = shiny::getDefaultReactiveDomain()
){
  if(missing(target))
    stop("Missing `target`")

  if(missing(row_index))
    stop("Missing `row_index`")

  if(missing(item))
    stop("Missing `item`")

  position <- match.arg(position)

  session$sendCustomMessage(
    "masonry-add-item",
    list(
      target = target,
      classes = classes,
      position = position,
      row_index = row_index - 1L,
      item = as.character(item)
    )
  )
}

#' Remove a row
#' 
#' Remove a row from [masonryGrid()].
#' 
#' @param target `id` of target [masonryGrid()].
#' @param row_index Index of row, an integer.
#' @param session A valid shiny session.
#' 
#' @export
masonry_remove_row <- function(
  target, 
  row_index,
  session = shiny::getDefaultReactiveDomain()
){
  if(missing(target))
    stop("Missing `target`")

  if(missing(row_index))
    stop("Missing `row_index`")

  session$sendCustomMessage(
    "masonry-remove-row",
    list(
      target = target,
      row_index = row_index - 1L
    )
  )
}

#' Remove an item
#' 
#' Remove an item from [masonryRow()].
#' 
#' @param target `id` of target [masonryGrid()].
#' @param row_index Index of row, an integer.
#' @param item_index index of item to remove.
#' @param session A valid shiny session.
#' 
#' @export
masonry_remove_item <- function(
  target, 
  row_index,
  item_index,
  session = shiny::getDefaultReactiveDomain()
){
  if(missing(target))
    stop("Missing `target`")

  if(missing(row_index))
    stop("Missing `row_index`")

  if(missing(item_index))
    stop("Missing `item_index`")

  session$sendCustomMessage(
    "masonry-remove-item",
    list(
      target = target,
      row_index = row_index - 1L,
      item_index = item_index - 1L
    )
  )
}

#' Get config
#' 
#' Get config [masonryGrid()].
#' 
#' @param id `id` of target [masonryGrid()].
#' @param session A valid shiny session.
#' 
#' @export
masonry_get_config <- function(
  id,
  session = shiny::getDefaultReactiveDomain()
) {
  session$sendCustomMessage(
    "masonry-get-config",
    list(
      target = id
    )
  )
}

#' Restore config
#' 
#' Restore config [masonryGrid()].
#' 
#' @param id `id` of target [masonryGrid()].
#' @param config Config, as obtained via [masonry_get_config()].
#' @param session A valid shiny session.
#' 
#' @export
masonry_restore_config <- function(
  id,
  config,
  session = shiny::getDefaultReactiveDomain()
) {
  session$sendCustomMessage(
    "masonry-restore-config",
    list(
      target = id,
      config = config
    )
  )
}

#' Masonry Shiny
#' 
#' Render Masonry grid.
#' 
#' @inheritParams masonryGrid
#' @param expr Expression returning [masonryGrid()].
#' @param env Environment to evaluate the `expr`.
#' @param quoted Whether to quote the expression.
#' 
#' @export
masonryOutput <- function(id, styles = list(), classes = ""){
  if(missing(id))
    stop("missing id")

  options <- styles |>
    as.list() |>
    toJSON(auto_unbox = TRUE) |>
    as.character()

  div(
    id = id,
    class = sprintf("masonry-grid %s", classes),
    div(
      class = "masonry-grid-content",
      masonryDependencies()
    )
  )
}

#' @rdname masonryOutput
#' @export
renderMasonry <- function(expr, env = parent.frame(),
  quoted = FALSE) {
  # Convert the expression + environment into a function
  func <- shiny::exprToFunction(expr, env, quoted)

  function(){
    func()
  }
}

