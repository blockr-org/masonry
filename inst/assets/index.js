(()=>{"use strict";Shiny;const n=()=>"_"+Math.ceil(1e7*Math.random()),e={},t=n=>e[n.replace("#","")],i=(n,t)=>{const i=$(n).attr("id");t.group=i,((n,t)=>{e[`#${n}`]=t})(i,t),r(n,t),((n,e)=>{$(n).find(".masonry-item").on("mouseup",(n=>{$(n.target).trigger("resize")}))})(n),$(n).addClass("masoned"),d(n,t),m($(n).find(".masonry-grid-content"),t)},r=(n,e)=>{$(n).find(".masonry-row").each(((n,t)=>{a(t,e)}))},a=(e,t)=>{if(t.rows)for(const n in t.rows)$(e).css(n,t.rows[n]);$(e).attr("id")||$(e).attr("id",n()),c(e,t),o(e,t),d(e,t)},o=(n,e)=>{$(n).find(".masonry-item").each(((n,t)=>{s(t,e)}))},s=(e,t)=>{if(t.items)for(const n in t.items)$(e).css(n,t.items[n]);let i=$(e).data("masonry-width");if(i||(i=20),$(e).css("width",`${i}%`),$(e).attr("id"))return;const r=n();$(e).attr("id",r)},d=(n,e)=>{const t={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-item",onEnd:n=>{$(n.item).closest(".masonry-row").trigger("resize")}};e.group&&(t.group=e.group),new Sortable(n,t)},m=(n,e)=>{const t={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-row",onEnd:n=>{$(n.item).trigger("resize")}};new Sortable(n[0],t)},c=(n,e)=>{const t=[];if($(n).find(".masonry-item").each(((n,e)=>{t.push($(e).data("masonry-width")||.2)})),0==t.length)return;const i=t.reduce(((n,e)=>n+e));if(i<100){const e=100-i;$(n).find(".masonry-item").last().data("masonry-width",t[t.length-1]+e)}const r=i-100;$(n).find(".masonry-item").last().data("masonry-width",t[t.length-1]-r)},y=new window.Shiny.OutputBinding;$.extend(y,{find:function(n){return $(n).find(".masonry-grid-shiny")},renderValue:function(n,e){window.Shiny.renderContentAsync(n,e.content).then((()=>{$(n).masonry(e.options)}))}}),window.Shiny.outputBindings.register(y,"masonry.masonry");jQuery.fn.extend({masonry:function(n){((n,e)=>{Array.isArray(e)&&(e=null),((n,e)=>{$(n).hasClass("masonry-grid")?i(n[0],e):$(n).find(".masonry-grid").each(((n,t)=>{i(t,e)}))})(n,e=e||$(n).data("styles")||{})})(this,n)}}),Shiny.addCustomMessageHandler("masonry-add-row",(e=>{e.id=n();const i=`<div id="${e.id}" class='masonry-row d-flex ${e.classes}'></div>`,r=$(`${e.target}`).find(".masonry-grid-content");"bottom"==e.position&&r.append(i),"top"==e.position&&r.prepend(i),window.Shiny.renderDependenciesAsync(e.content.deps).then((()=>{window.Shiny.renderContentAsync($(`#${e.id}`),e.content.html).then((()=>{const n=t(e.target);$(`${e.target}`).masonry(n);const i=new CustomEvent("masonry:added-row",{detail:e.id});document.dispatchEvent(i)}))}))})),Shiny.addCustomMessageHandler("masonry-add-item",(e=>{e.id=n();const i=`<div id="${e.id}" class='masonry-item ${e.classes}'></div>`;let r;e.row_id||(r=$(`${e.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${e.row_index})`)),e.row_id&&(r=$(`${e.row_id}`)),"end"==e.position&&r.append(i),"start"==e.position&&r.prepend(i),window.Shiny.renderDependenciesAsync(e.item.deps).then((()=>{window.Shiny.renderContentAsync($(`#${e.id}`),e.item.html).then((()=>{const n=t(e.target);$(`${e.target}`).masonry(n);const i=new CustomEvent("masonry:added-item",{detail:e.id});document.dispatchEvent(i)}))}))})),Shiny.addCustomMessageHandler("masonry-remove-item",(n=>{n.item_id?$(`#${n.item_id}`).remove():$(`${n.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${n.row_index})`).find(`.masonry-item:eq(${n.item_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-remove-row",(n=>{$(`${n.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${n.row_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-get-config",(n=>{let e=[];$(`#${n.target}`).find(".masonry-row").each(((n,t)=>{let i=[];$(t).find(".masonry-item").each(((n,e)=>{let t=[];$(e).children().each(((n,e)=>{$(e).is(":visible")&&t.push(e)}));let r="";t.length>0&&(r=$(t[0]).attr("id"));let a={width:(o=e,$(o).width()),id:$(e).attr("id"),childId:r};var o;i.push(a)}));let r=i.map((n=>n.width)).reduce(((n,e)=>n+e));i=i.map((n=>(n.percentage=((n,e)=>Math.round(n/e*100))(n.width,r),n)));let a={id:$(t).attr("id"),items:i};e.push(a)}));let i={opts:t(`#${n.target}`),grid:e};window.Shiny.setInputValue(`${n.target}_config:force.raw`,i)})),Shiny.addCustomMessageHandler("masonry-restore-config",(n=>{(n=>{n.config.grid.map(((e,t)=>{$(`#${n.target}`).find(`.masonry-row:eq(${t})`).attr("id");const i=e.id;e.items.map(((e,t)=>{$(`#${n.target}`).find(`.masonry-item:eq(${t})`).attr("id");const r=e.id;$(`#${r}`).appendTo(`#${i}`)}))}))})(n),$(`#${n.target}`).find(".masonry-row").each(((e,t)=>{$(t).find(".masonry-item").each(((t,i)=>{$(i).css("width",`${n.config.grid[e].items[t].percentage}%`),$(i).trigger("resize")}))}))})),Shiny.addCustomMessageHandler("masonry-run",(n=>{$(n.target).masonry()}))})();