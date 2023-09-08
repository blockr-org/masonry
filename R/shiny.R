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


