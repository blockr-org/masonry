<!-- badges: start -->
<!-- badges: end -->

# masonry

Resizeable, draggable grid for shiny.

## Installation

You can install the development version of masonry from [GitHub](https://github.com/) with:

``` r
# install.packages("remotes")
remotes::install_github("devOpifex/masonry")
```

## Example

``` r
library(shiny)
library(masonry)

card <- \(...){
  div(
    class = "card",
    div(
      class = "card-body",
      ...
    )
  )
}

ui <- fluidPage(
  theme = bslib::bs_theme(version = 5L),
  masonry(
    masonryRow(
      classes = "bg-info",
      masonryItem(card(h1("hello"), plotOutput("base", width = "100%"))),
      masonryItem(card(h2("world")))
    ),
    masonryRow(
      classes = "bg-warning",
      masonryItem(card(h1("here"))),
      masonryItem(card(h2("there"), p("A paragraph")))
    ),
    options = list(margin = ".5rem", normalise = TRUE)
  ),
)

server <- \(input, output, session) {
  output$base <- renderPlot(plot(runif(10))) 
}

shinyApp(ui, server, options = list(port = 3000L))
```

