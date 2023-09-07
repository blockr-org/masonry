#' Row
#' 
#' Masonry row
#' 
#' @param ... Up to 12 [mItem()].
#' 
#' @export
masonry <- \(...){
  div(
    class = "masonry-main",
    masonryDependencies(),
    ...
  )
}

#' Row
#' 
#' Masonry row
#' 
#' @param ... Up to 12 [mItem()].
#' 
#' @export
masonryRow <- \(...){
  div(
    class = "masonry-row",
    ...
  )
}

#' Item
#' 
#' Masonry item
#' 
#' @param ... Content of the item.
#' 
#' @export
masonryItem <- \(..., width = NULL){
  div(
    class = "masonry-item",
    `data-masonry-width` = width,
    ...
  )
}
