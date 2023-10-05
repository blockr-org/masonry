(()=>{"use strict";Shiny;const t=()=>"_"+Math.ceil(1e7*Math.random()),e={},n=t=>e[t],a=(t,n)=>{const a=$(t).attr("id");n.group=a,((t,n)=>{e[`#${t}`]=n})(a,n),r(t,n),((t,e)=>{$(t).find(".masonry-item").on("mouseup",(t=>{$(t.target).trigger("resize")}))})(t),$(t).addClass("masoned"),d(t,n),m($(t).find(".masonry-grid-content"),n)},r=(t,e)=>{$(t).find(".masonry-row").each(((t,n)=>{i(n,e)}))},i=(e,n)=>{const a=$(e).data("masonry-minheight");$(e).css("min-height",a);const r=$(e).data("masonry-height");r&&$(e).css("height",r),$(e).attr("id")||$(e).attr("id",t()),g(e,n),s(e,n),d(e,n)},s=(t,e)=>{$(t).find(".masonry-item").each(((t,n)=>{o(n,e)}))},o=(e,n)=>{if(n.items)for(const t in n.items)$(e).css(t,n.items[t]);let a=$(e).data("masonry-width");if(a||(a=20),$(e).css("width",`${a}%`),$(e).attr("id"))return;let r=t();$(e).attr("id",r)},d=(t,e)=>{let n={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-item",onEnd:t=>{$(t.item).closest(".masonry-row").trigger("resize")}};e.group&&(n.group=e.group),new Sortable(t,n)},m=(t,e)=>{let n={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-row",onEnd:t=>{$(t.item).trigger("resize")}};new Sortable(t[0],n)},g=(t,e)=>{let n=[];if($(t).find(".masonry-item").each(((t,e)=>{n.push($(e).data("masonry-width")||.2)})),0==n.length)return;let a=n.reduce(((t,e)=>t+e));if(a<100){let e=100-a;$(t).find(".masonry-item").last().data("masonry-width",n[n.length-1]+e)}let r=a-100;$(t).find(".masonry-item").last().data("masonry-width",n[n.length-1]-r)};var y=new Shiny.OutputBinding;$.extend(y,{find:function(t){return $(t).find(".masonry-grid")},renderValue:function(t,e){Shiny.renderContentAsync(t,e.content).then((()=>{$(t).masonry(e.options)}))}}),Shiny.outputBindings.register(y,"masonry.masonry");jQuery.fn.extend({masonry:function(t){((t,e)=>{((t,e)=>{$(t).hasClass("masonry-grid")?a(t[0],e):$(t).find(".masonry-grid").each(((t,n)=>{a(n,e)}))})(this,e=e||{})})(0,t)}}),Shiny.addCustomMessageHandler("masonry-add-row",(t=>{let e=`<div \n    class='masonry-row d-flex ${t.classes}'\n    data-masonry-minheight = ${t.min_height}\n    data-masonry-height = ${t.height}\n    ></div>`,a=$(`${t.target}`).find(".masonry-grid-content");"bottom"==t.position&&a.append(e),"top"==t.position&&a.prepend(e);const r=n(t.target);$(`${t.target}`).masonry(r)})),Shiny.addCustomMessageHandler("masonry-add-item",(t=>{let e=`<div class='masonry-item ${t.classes}'>${t.item}</div>`,a=$(`${t.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${t.row_index})`);"end"==t.position&&a.append(e),"start"==t.position&&a.prepend(e);let r=n(t.target);$(`${t.target}`).masonry(r)})),Shiny.addCustomMessageHandler("masonry-remove-item",(t=>{$(`${t.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${t.row_index})`).find(`.masonry-item:eq(${t.item_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-remove-row",(t=>{$(`${t.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${t.row_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-get-config",(t=>{let e=[];$(`#${t.target}`).find(".masonry-row").each(((t,n)=>{let a=[];$(n).find(".masonry-item").each(((t,e)=>{let n={width:(r=e,$(r).width()),id:$(e).attr("id")};var r;a.push(n)}));let r=a.map((t=>t.width)).reduce(((t,e)=>t+e));a=a.map((t=>(t.percentage=((t,e)=>Math.round(t/e*100))(t.width,r),t)));let i={id:$(n).attr("id"),items:a};e.push(i)}));let a={opts:n(`#${t.target}`),grid:e};Shiny.setInputValue(`${t.target}_config:force.raw`,a)})),Shiny.addCustomMessageHandler("masonry-restore-config",(t=>{(t=>{t.config.grid.map(((e,n)=>{$(`#${t.target}`).find(`.masonry-row:eq(${n})`).attr("id");const a=e.id;e.items.map(((e,n)=>{$(`#${t.target}`).find(`.masonry-item:eq(${n})`).attr("id");const r=e.id;$(`#${r}`).appendTo(`#${a}`)}))}))})(t),$(`#${t.target}`).find(".masonry-row").each(((e,n)=>{$(n).find(".masonry-item").each(((n,a)=>{$(a).css("width",`${t.config.grid[e].items[n].percentage}%`),$(a).trigger("resize")}))}))}))})();