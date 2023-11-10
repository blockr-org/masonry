handlerRaw <- function(data, ...) {
  return(data)
}

.onLoad <- function(...) {
  shiny::registerInputHandler("force.raw", handlerRaw, force = TRUE)
}
