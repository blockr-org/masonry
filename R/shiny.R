#' Mason
#' 
#' Mason a rendered [masonryGrid()].
#' 
#' @param target `id` of target [masonryGrid()].
#' @param session A valid shiny session.
#' @param delay Delay in milliseconds.
#' @param send_on_change Whether to send config on change.
#' 
#' @export
mason <- function(
  target, 
  delay = 0L,
  session = shiny::getDefaultReactiveDomain()
){
  if(missing(target))
    stop("Missing `target`")

  session$sendCustomMessage(
    "masonry-run",
    list(
      delay = delay,
      target = target
    )
  )
}
#' Add a row
#' 
#' Add a row to [masonryGrid()].
#' 
#' @param target `id` of target [masonryGrid()].
#' @param session A valid shiny session.
#' @param classes Additional classes to add to the row.
#' @param position Whether to add the new row at the `top`
#'  or the `bottom`.
#' @param content Initial content of the row.
#' 
#' @export
masonry_add_row <- function(
  target, 
  content = "",
  position = c("bottom", "top"), 
  classes = "",
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
      content = process_deps(content, session)
    )
  )
}

#' Add an item
#' 
#' Add an item to [masonryRow()].
#' 
#' @param target `id` of target [masonryGrid()].
#' @param row_index,row_id Index of id of row.
#' @param item htmltools `tags`, the content of the item.
#' @param session A valid shiny session.
#' @param classes Additional classes to add to the row.
#' @param position Whether to add the new row at the `start`
#'  or the `end`.
#' 
#' @export
masonry_add_item <- function(
  target, 
  item,
  row_index = NULL,
  row_id = NULL,
  position = c("start", "end"), 
  classes = "",
  session = shiny::getDefaultReactiveDomain()
){
  if(missing(target))
    stop("Missing `target`")

  if(is.null(row_index) && is.null(row_id))
    stop("Missing `row_index`")

  if(missing(item))
    stop("Missing `item`")

  if(is.null(row_index))
    row_index <- 0

  position <- match.arg(position)

  session$sendCustomMessage(
    "masonry-add-item",
    list(
      target = target,
      classes = classes,
      position = position,
      row_index = row_index - 1L,
      row_id = row_id,
      item = process_deps(item, session)
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
#' @param item_id Item id to remove, `row_index` may be `NULL`
#'  if this is set.
#' 
#' @export
masonry_remove_item <- function(
  target, 
  row_index = NULL,
  item_index = NULL,
  item_id = NULL,
  session = shiny::getDefaultReactiveDomain()
){
  if(missing(target))
    stop("Missing `target`")

  if(missing(row_index))
    stop("Missing `row_index`")

  if(is.null(item_id) && is.null(item_index))
    stop("Must set `item_index` or `item_id`")

  if(!is.null(item_index) && is.null(row_index))
    stop("Must set `row_index` if `item_index` set")

  if(is.null(row_index))
    row_index <- 1L

  session$sendCustomMessage(
    "masonry-remove-item",
    list(
      target = target,
      row_index = row_index - 1L,
      item_index = item_index - 1L,
      item_id = item_id
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
#' @param id ID of masonryGrid.
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
    class = "masonry-grid-shiny",
    masonryDependencies()
  )
}

#' @rdname masonryOutput
#' @export
renderMasonry <- function(expr, styles = list(), env = parent.frame(), quoted = FALSE) {
  # Convert the expression + environment into a function
  func <- shiny::exprToFunction(expr, env, quoted)

  function(){
    content <- func() |> as.character()
    list(
      content = content,
      options = styles |> as.list()
    )
  }
}

