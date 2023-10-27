(()=>{"use strict";Shiny;const n=()=>"_"+Math.ceil(1e7*Math.random()),e={},t=n=>e[n.replace("#","")],r=(n,t)=>{const r=$(n).attr("id");t.group=r,((n,t)=>{e[`#${n}`]=t})(r,t),i(n,t),((n,e)=>{$(n).find(".masonry-item").on("mouseup",(n=>{$(n.target).trigger("resize")}))})(n),$(n).addClass("masoned"),d(n,t),m($(n).find(".masonry-grid-content"),t)},i=(n,e)=>{$(n).find(".masonry-row").each(((n,t)=>{a(t,e)}))},a=(e,t)=>{if(t.rows)for(const n in t.rows)$(e).css(n,t.rows[n]);$(e).attr("id")||$(e).attr("id",n()),c(e,t),s(e,t),d(e,t)},s=(n,e)=>{$(n).find(".masonry-item").each(((n,t)=>{o(t,e)}))},o=(e,t)=>{if(t.items)for(const n in t.items)$(e).css(n,t.items[n]);let r=$(e).data("masonry-width");if(r||(r=20),$(e).css("width",`${r}%`),$(e).attr("id"))return;const i=n();$(e).attr("id",i)},d=(n,e)=>{const t={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-item",onEnd:n=>{$(n.item).closest(".masonry-row").trigger("resize")}};e.group&&(t.group=e.group),new Sortable(n,t)},m=(n,e)=>{const t={multiDrag:!1,fallbackTolerance:2,animation:150,swap:!1,draggable:".masonry-row",onEnd:n=>{$(n.item).trigger("resize")}};new Sortable(n[0],t)},c=(n,e)=>{const t=[];if($(n).find(".masonry-item").each(((n,e)=>{t.push($(e).data("masonry-width")||.2)})),0==t.length)return;const r=t.reduce(((n,e)=>n+e));if(r<100){const e=100-r;$(n).find(".masonry-item").last().data("masonry-width",t[t.length-1]+e)}const i=r-100;$(n).find(".masonry-item").last().data("masonry-width",t[t.length-1]-i)},y=new Shiny.OutputBinding;$.extend(y,{find:function(n){return $(n).find(".masonry-grid-shiny")},renderValue:function(n,e){Shiny.renderContentAsync(n,e.content).then((()=>{$(n).masonry(e.options)}))}}),Shiny.outputBindings.register(y,"masonry.masonry");jQuery.fn.extend({masonry:function(n){((n,e)=>{Array.isArray(e)&&(e=null),((n,e)=>{$(n).hasClass("masonry-grid")?r(n[0],e):$(n).find(".masonry-grid").each(((n,t)=>{r(t,e)}))})(n,e=e||$(n).data("styles")||{})})(this,n)}}),Shiny.addCustomMessageHandler("masonry-add-row",(e=>{e.id=n();const r=`<div id="${e.id}" class='masonry-row d-flex ${e.classes}'></div>`,i=$(`${e.target}`).find(".masonry-grid-content");"bottom"==e.position&&i.append(r),"top"==e.position&&i.prepend(r),Shiny.renderDependenciesAsync(e.content.deps).then((()=>{Shiny.renderContentAsync($(`#${e.id}`),e.content.html).then((()=>{const n=t(e.target);$(`${e.target}`).masonry(n);const r=new CustomEvent("masonry:added-row",{detail:e.id});document.dispatchEvent(r)}))}))})),Shiny.addCustomMessageHandler("masonry-add-item",(e=>{e.id=n();const r=`<div id="${e.id}" class='masonry-item ${e.classes}'></div>`;let i;e.row_id||(i=$(`${e.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${e.row_index})`)),e.row_id&&(i=$(`${e.row_id}`)),"end"==e.position&&i.append(r),"start"==e.position&&i.prepend(r),Shiny.renderDependenciesAsync(e.item.deps).then((()=>{Shiny.renderContentAsync($(`#${e.id}`),e.item.html).then((()=>{const n=t(e.target);$(`${e.target}`).masonry(n);const r=new CustomEvent("masonry:added-item",{detail:e.id});document.dispatchEvent(r)}))}))})),Shiny.addCustomMessageHandler("masonry-remove-item",(n=>{n.item_id?$(`#${n.item_id}`).remove():$(`${n.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${n.row_index})`).find(`.masonry-item:eq(${n.item_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-remove-row",(n=>{$(`${n.target}`).find(".masonry-grid-content").find(`.masonry-row:eq(${n.row_index})`).remove()})),Shiny.addCustomMessageHandler("masonry-get-config",(n=>{let e=[];$(`#${n.target}`).find(".masonry-row").each(((n,t)=>{let r=[];$(t).find(".masonry-item").each(((n,e)=>{let t={width:(i=e,$(i).width()),id:$(e).attr("id")};var i;r.push(t)}));let i=r.map((n=>n.width)).reduce(((n,e)=>n+e));r=r.map((n=>(n.percentage=((n,e)=>Math.round(n/e*100))(n.width,i),n)));let a={id:$(t).attr("id"),items:r};e.push(a)}));let r={opts:t(`#${n.target}`),grid:e};Shiny.setInputValue(`${n.target}_config:force.raw`,r)})),Shiny.addCustomMessageHandler("masonry-restore-config",(n=>{(n=>{n.config.grid.map(((e,t)=>{$(`#${n.target}`).find(`.masonry-row:eq(${t})`).attr("id");const r=e.id;e.items.map(((e,t)=>{$(`#${n.target}`).find(`.masonry-item:eq(${t})`).attr("id");const i=e.id;$(`#${i}`).appendTo(`#${r}`)}))}))})(n),$(`#${n.target}`).find(".masonry-row").each(((e,t)=>{$(t).find(".masonry-item").each(((t,r)=>{$(r).css("width",`${n.config.grid[e].items[t].percentage}%`),$(r).trigger("resize")}))}))})),Shiny.addCustomMessageHandler("masonry-run",(n=>{$(n.target).masonry()}))})();