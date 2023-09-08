handlerRaw <- function(data, ...) {
  return(data)
}

.onAttach <- function(...) {
  shiny::registerInputHandler("force.raw", handlerRaw, force = TRUE)
}
