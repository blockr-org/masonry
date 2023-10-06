identifier <- \(n = 20L){
  c(letters, 1:10) |>
    sample(n) |>
    paste0(collapse = "") |>
    (\(.)paste0("_", .))()
}

process_deps <- function(...) {
  getFromNamespace("processDeps", "shiny")(...)
}
