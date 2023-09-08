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
      class = "card-body bg-white text-dark",
      ...
    )
  )
}

ui <- fluidPage(
  theme = bslib::bs_theme(version = 5L),
  div(
    class = "row",
    div(
      class = "col-md-6",
      h1("Masonry"),
      p("You can resize and rearrange the cards below")
    ),
    div(
      class = "col-md-3",
      actionButton("addRow", "Add a row"),
      selectInput("position", "Position", choices = c("bottom", "top"))
    ),
    div(
      class = "col-md-3",
      actionButton("addItem", "Add an item"),
      numericInput("rowIndex", "Row index", value = 1L, min = 1, max = 4L)
    )
  ),
  masonryGrid(
    id = "myGrid",
    masonryRow(
      classes = "bg-info",
      masonryItem(card(h1("Plot"), plotOutput("base", width = "100%"))),
      masonryItem(card(h2("Another card")))
    ),
    masonryRow(
      classes = "bg-warning",
      masonryItem(card(h1("A card"))),
      masonryItem(card(h2("Paragraph"), div(p("A paragraph here."))))
    ),
    options = list(margin = ".5rem")
  )
)

server <- \(input, output, session) {
  output$base <- renderPlot(plot(runif(10))) 

  observeEvent(input$addRow, {
    masonry_add_row("#myGrid", classes = "bg-dark", position = input$position)
  })

  observeEvent(input$addItem, {
    masonry_add_item("#myGrid", input$rowIndex, item = card(h4("new item", input$addItem)))
  })
}

shinyApp(ui, server, options = list(port = 3000L))

```

