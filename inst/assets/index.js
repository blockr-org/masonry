(()=>{"use strict";Shiny;const t=()=>"_"+Math.ceil(1e7*Math.random()),e={},n=t=>e[t],i=(t,n)=>{const i=$(t).attr("id");n.group=i,((t,n)=>{e[`#${t}`]=n})(i,n),a(t,n),((t,e)=>{$(t).find(".masonry-item").on("mouseup",(t=>{$(t.target).trigger("resize")}))})(t),$(t).addClass("masoned"),d(t,n),m($(t).find(".masonry-grid-content"),n)},a=(t,e)=>{$(t).find(".masonry-row").each(((t,n)=>{r(n,e)}))},r=(e,n)=>{const i=$(e).data("masonry-minheight");$(e).css("min-height",i);const a=$(e).data("masonry-height");a&&$(e).css("height",a),$(e).attr("id")||$(e).attr("id",t()),g(e,n),s(e,n),d(e,n)},s=(t,e)=>{$(t).find(".masonry-item").each(((t,n)=>{o(n,e)}))},o=(e,n)=>{if(n.items)for(const t in n.items)$(e).css(t,n.items[t]);let i=$(e).data("masonry-width");if(i||(i=20),$(e).css("width",`${i}%`),$(e).attr("id"))return;let a=t();$(e).attr("id",a)},d=(t,e)=>{let n={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,onEnd:t=>{$(t.item).closest(".masonry-row").trigger("resize")}};e.group&&(n.group=e.group),new Sortable(t,n)},m=(t,e)=>{let n={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,onEnd:t=>{$(t.item).trigger("resize")}};new Sortable(t[0],n)},g=(t,e)=>{let n=[];if($(t).find(".masonry-item").each(((t,e)=>{n.push($(e).data("masonry-width")||.2)})),0==n.length)return;let i=n.reduce(((t,e)=>t+e));if(i<100){let e=100-i;$(t).find(".masonry-item").last().data("masonry-width",n[n.length-1]+e)}let a=i-100;$(t).find(".masonry-item").last().data("masonry-width",n[n.length-1]-a)};jQuery.fn.extend({masonry:function(t){((t,e)=>{((t,e)=>{$(t).hasClass("masonry-grid")?i(t[0],e):$(t).find(".masonry-grid").each(((t,n)=>{i(n,e)}))})(this,e=e||{})})(0,t)}}),Shiny.addCustomMessageHandler("masonry-add-row",(t=>{let e=`<div \n    class='masonry-row d-flex ${t.classes}'\n    data-masonry-minheight = ${t.min_height}\n    data-masonry-height = ${t.height}\n    ></div>`,i=$(`${t.target}`).find(".masonry-grid-content");"bottom"==t.position&&i.append(e),"top"==t.position&&i.prepend(e);const a=n(t.target);$(`${t.target}`).masonry(a)})),Shiny.addCustomMessageHandler("masonry-add-item",(t=>{let e=`<div class='masonry-item ${t.classes}'>${t.item}</div>`,i=$(`${t.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${t.row_index})`);"end"==t.position&&i.append(e),"start"==t.position&&i.prepend(e);let a=n(t.target);$(`${t.target}`).masonry(a)})),Shiny.addCustomMessageHandler("masonry-remove-item",(t=>{$(`${t.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${t.row_index})`).find(`.masonry-item:eq(${t.item_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-remove-row",(t=>{$(`${t.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${t.row_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-get-config",(t=>{let e=[];$(`#${t.target}`).find(".masonry-row").each(((t,n)=>{let i=[];$(n).find(".masonry-item").each(((t,e)=>{let n={width:(a=e,$(a).width()),id:$(e).attr("id")};var a;i.push(n)}));let a=i.map((t=>t.width)).reduce(((t,e)=>t+e));i=i.map((t=>(t.percentage=((t,e)=>Math.round(t/e*100))(t.width,a),t)));let r={id:$(n).attr("id"),items:i};e.push(r)}));let i={opts:n(`#${t.target}`),grid:e};console.log(i),Shiny.setInputValue(`${t.target}_config:force.raw`,i)})),Shiny.addCustomMessageHandler("masonry-restore-config",(t=>{(t=>{$(`#${t.target}`).find(".masonry-row").each(((e,n)=>{$(n).attr("id")!=t.config.grid[e].id?$(n).find(".masonry-item").each(((i,a)=>{let r=$(a).attr("id"),s=t.config.grid[e].items[i].id;i>t.config.grid[e].items.length-1||r!=s&&$(`#${s}`).prependTo(n)})):$(n).find(".masonry-item").each(((i,a)=>{let r=$(a).attr("id");if(i+1>t.config.grid[e].items.length)return;let s=t.config.grid[e].items[i].id;r!=s&&$(`#${s}`).prependTo(n)}))}))})(t),$(`#${t.target}`).find(".masonry-row").each(((e,n)=>{$(n).find(".masonry-item").each(((n,i)=>{$(i).css("width",`${t.config.grid[e].items[n].percentage}%`),$(i).trigger("resize")}))}))}))})();