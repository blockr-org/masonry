(()=>{"use strict";Shiny;const n={},e=e=>n[e.replace("#","")],t=n=>{let t=[];$(`#${n.target}`).find(".masonry-row").each(((n,e)=>{let a=[];$(e).find(".masonry-item").each(((n,e)=>{let t=[];$(e).children().each(((n,e)=>{$(e).is(":visible")&&t.push(e)}));let i="";t.length>0&&(i=$(t[0]).attr("id"));let o={width:r(e),id:$(e).attr("id"),childId:i};a.push(o)}));let o=a.map((n=>n.width)).reduce(((n,e)=>n+e));a=a.map((n=>(n.percentage=i(n.width,o),n)));let s={id:$(e).attr("id"),items:a};t.push(s)}));let a={opts:e(`#${n.target}`),grid:t};window.Shiny.setInputValue(`${n.target}_config:force.raw`,a)},i=(n,e)=>Math.round(n/e*100),r=n=>$(n).width(),a=()=>"_"+Math.ceil(1e7*Math.random()),o=(e,i)=>{const r=$(e).attr("id");i.group=r,((e,t)=>{n[e]=t})(r,i),s(e,i),((n,e)=>{$(n).find(".masonry-item").on("mouseup",(n=>{$(n.target).trigger("resize")}))})(e),$(e).addClass("masoned"),y(e,i),g($(e).find(".masonry-grid-content"),i),$(e).data("send")&&($(e).off("change resize"),$(e).on("change resize",(()=>{t({target:`${r}`})})))},s=(n,e)=>{$(n).find(".masonry-row").each(((n,t)=>{d(t,e)}))},d=(n,e)=>{if(e.rows)for(const t in e.rows)$(n).css(t,e.rows[t]);$(n).attr("id")||$(n).attr("id",a()),h(n,e),m(n,e),y(n,e)},m=(n,e)=>{$(n).find(".masonry-item").each(((n,t)=>{c(t,e)}))},c=(n,e)=>{if(e.items)for(const t in e.items)$(n).css(t,e.items[t]);let t=$(n).data("masonry-width");if(t||(t=20),$(n).css("width",`${t}%`),$(n).attr("id"))return;const i=a();$(n).attr("id",i)},y=(n,e)=>{const t={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-item",onEnd:n=>{$(n.item).closest(".masonry-row").trigger("resize")}};e.group&&(t.group=e.group),new Sortable(n,t)},g=(n,e)=>{const t={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-row",onEnd:n=>{$(n.item).trigger("resize")}};new Sortable(n[0],t)},h=(n,e)=>{const t=[];if($(n).find(".masonry-item").each(((n,e)=>{t.push($(e).data("masonry-width")||.2)})),0==t.length)return;const i=t.reduce(((n,e)=>n+e));if(i<100){const e=100-i;$(n).find(".masonry-item").last().data("masonry-width",t[t.length-1]+e)}const r=i-100;$(n).find(".masonry-item").last().data("masonry-width",t[t.length-1]-r)},l=new window.Shiny.OutputBinding;$.extend(l,{find:function(n){return $(n).find(".masonry-grid-shiny")},renderValue:function(n,e){window.Shiny.renderContentAsync(n,e.content).then((()=>{$(n).masonry(e.options)}))}}),window.Shiny.outputBindings.register(l,"masonry.masonry"),jQuery.fn.extend({masonry:function(n){((n,e)=>{Array.isArray(e)&&(e=null),((n,e)=>{$(n).hasClass("masonry-grid")?o(n[0],e):$(n).find(".masonry-grid").each(((n,t)=>{o(t,e)}))})(n,e=e||$(n).data("styles")||{})})(this,n)}}),Shiny.addCustomMessageHandler("masonry-add-row",(n=>{n.id=a();const t=`<div id="${n.id}" class='masonry-row d-flex ${n.classes}'></div>`,i=$(`${n.target}`).find(".masonry-grid-content");"bottom"==n.position&&i.append(t),"top"==n.position&&i.prepend(t),window.Shiny.renderDependenciesAsync(n.content.deps).then((()=>{window.Shiny.renderContentAsync($(`#${n.id}`),n.content.html).then((()=>{const t=e(n.target);$(`${n.target}`).masonry(t);const i=new CustomEvent("masonry:added-row",{detail:n.id});document.dispatchEvent(i)}))}))})),Shiny.addCustomMessageHandler("masonry-add-item",(n=>{n.id=a();const t=`<div id="${n.id}" class='masonry-item ${n.classes}'></div>`;let i;n.row_id||(i=$(`${n.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${n.row_index})`)),n.row_id&&(i=$(`${n.row_id}`)),"end"==n.position&&i.append(t),"start"==n.position&&i.prepend(t),window.Shiny.renderDependenciesAsync(n.item.deps).then((()=>{window.Shiny.renderContentAsync($(`#${n.id}`),n.item.html).then((()=>{const t=e(n.target);$(`${n.target}`).masonry(t);const i=new CustomEvent("masonry:added-item",{detail:n.id});document.dispatchEvent(i)}))}))})),Shiny.addCustomMessageHandler("masonry-remove-item",(n=>{n.item_id?$(`#${n.item_id}`).remove():$(`${n.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${n.row_index})`).find(`.masonry-item:eq(${n.item_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-remove-row",(n=>{$(`${n.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${n.row_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-get-config",t),Shiny.addCustomMessageHandler("masonry-restore-config",(n=>{(n=>{n.config.grid.map(((e,t)=>{$(`#${n.target}`).find(`.masonry-row:eq(${t})`).attr("id");const i=e.id;e.items.map(((e,t)=>{$(`#${n.target}`).find(`.masonry-item:eq(${t})`).attr("id");const r=e.id;$(`#${r}`).appendTo(`#${i}`)}))}))})(n),$(`#${n.target}`).find(".masonry-row").each(((e,t)=>{$(t).find(".masonry-item").each(((t,i)=>{$(i).css("width",`${n.config.grid[e].items[t].percentage}%`),$(i).trigger("resize")}))}))})),Shiny.addCustomMessageHandler("masonry-run",(n=>{setTimeout((()=>{$(`${n.target}`).masonry()}),n.delay)}))})();