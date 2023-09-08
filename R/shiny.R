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


