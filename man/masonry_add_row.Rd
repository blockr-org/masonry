% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/shiny.R
\name{masonry_add_row}
\alias{masonry_add_row}
\title{Add a row}
\usage{
masonry_add_row(
  target,
  content = "",
  position = c("bottom", "top"),
  classes = "",
  session = shiny::getDefaultReactiveDomain()
)
}
\arguments{
\item{target}{\code{id} of target \code{\link[=masonryGrid]{masonryGrid()}}.}

\item{content}{Initial content of the row.}

\item{position}{Whether to add the new row at the \code{top}
or the \code{bottom}.}

\item{classes}{Additional classes to add to the row.}

\item{session}{A valid shiny session.}
}
\description{
Add a row to \code{\link[=masonryGrid]{masonryGrid()}}.
}
