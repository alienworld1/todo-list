(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var o=n.getElementsByTagName("script");if(o.length)for(var c=o.length-1;c>-1&&!e;)e=o[c--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();const e=class{constructor(t){this.name=t,this.todo_container={}}addTodo(t,e){this.todo_container[t]=e}removeTodo(t){delete this.todo_container[t]}};class n{static checkIfProjectArrayExists(){return!!localStorage.getItem("projectArray")}static set projectArray(t){localStorage.setItem("projectArray",JSON.stringify(t))}static get projectArray(){return JSON.parse(localStorage.getItem("projectArray")).map((t=>{for(const e in t.todo_container){const n=t.todo_container[e].dueDate;t.todo_container[e].dueDate=new Date(n)}return function(t){const n=new e(t.name);return n.todo_container=t.todo_container,n}(t)}))}}let o,c=[],i=0;class d{static initialize(){if(n.checkIfProjectArrayExists()){const t=n.projectArray;c=t,d.activeProject=0}else d.addNewProject("Default Project"),d.activeProject=0}static addNewProject(t){const n=new e(t);c.push(n)}static get projectList(){return c}static set activeProject(t){o=c[t],i=t}static get activeProject(){return o}static get activeIndex(){return i}static removeProject(t){c.splice(t,1)}}const a=t.p+"fb6752737cb03caf9b66.svg",r=function(t,e,n,o){return n instanceof Date||(n=new Date(n)),{title:t,description:e,dueDate:n,priority:o}};function s(t){return t.toISOString().slice(0,10)}const l=document.querySelector("body");function u(t,e){const n=document.createElement("div");n.classList.add("todo-card"),n.id=e;const o=t.todo_container[e],c=document.createElement("div");var i;c.classList.add("accent"),c.classList.add(o.priority),c.textContent=(i=o.priority).charAt(0).toUpperCase()+i.slice(1);const a=document.createElement("h3");a.textContent=o.title;const r=document.createElement("p");r.classList.add("description"),r.textContent=o.description;const u=document.createElement("div");u.classList.add("description"),u.textContent=`Due on ${o.dueDate.toDateString()}`;const p=document.createElement("section");p.classList.add("button-container");const m=document.createElement("button");m.classList.add("create-button"),m.classList.add("red-background"),m.textContent="Delete",m.addEventListener("click",(t=>{const e=t.currentTarget.parentNode.parentNode.id;d.activeProject.removeTodo(e),y.update()}));const h=document.createElement("button");return h.classList.add("create-button"),h.textContent="Edit",h.addEventListener("click",(t=>{!function(t){const e=d.activeProject.todo_container[t.id],n=v(!0,t.id);n.querySelector(".create-button").textContent="Edit Todo",l.appendChild(n),n.showModal(),document.getElementById("title").value=e.title,document.getElementById("description").value=e.description,document.getElementById("due-date").value=s(e.dueDate),document.getElementById(e.priority).checked=!0}(t.currentTarget.parentNode.parentNode)})),p.appendChild(h),p.appendChild(m),n.appendChild(c),n.appendChild(a),n.appendChild(r),n.appendChild(u),n.appendChild(p),n}function p(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function m(t,e){const n=document.createElement("section"),o=document.createElement("label");o.setAttribute("for",e.id),o.textContent=t;const c=document.createElement("input");return c.type=e.type??"text",c.id=e.id,c.name=e.name??e.id,e.value&&(c.value=e.value),n.appendChild(o),n.appendChild(c),{section:n,input:c}}function h(t){const e=+t.currentTarget.id;d.activeProject=e,g()}function C(){const t=document.createElement("div");t.classList.add("sidebar");const e=function(t,e){const n=document.createElement("div");n.classList.add("logo");const o=function(t,e,n){const o=new Image;return o.src=t,o.width=32,o.height=32,o}(e),c=document.createElement("span");return c.textContent=t,n.appendChild(o),n.appendChild(c),n}("To-do List",a);t.appendChild(e);const o=document.createElement("button");o.textContent="New Project",o.classList.add("create-button"),o.addEventListener("click",(()=>{const t=function(){const t=document.createElement("dialog");t.classList.add("form-dialog");const e=m("Name of the New Project:",{id:"new-project-name"}),o=document.createElement("button");return o.textContent="Create New Project",o.classList.add("create-button"),o.addEventListener("click",(o=>{var c;o.preventDefault(),e.input.value?(c=e.input.value,d.addNewProject(c),y.updateSidebar(d.projectList),n.projectArray=d.projectList,t.close()):t.close()})),t.appendChild(e.section),t.appendChild(o),t.addEventListener("close",(()=>{l.removeChild(t)})),t}();l.appendChild(t),t.showModal()})),t.appendChild(o);const c=document.createElement("ul");return c.classList.add("project-list"),t.appendChild(c),t}function v(t=!1,e=null){const n=document.createElement("dialog");n.classList.add("form-dialog");const o=document.createElement("form"),c=m("Title: ",{id:"title"}),i=document.createElement("section");i.classList.add("block");const d=document.createElement("label");d.setAttribute("for","description"),d.textContent="Description:";const a=document.createElement("textarea");a.rows=5,a.cols=55,a.name="description",a.id="description",i.appendChild(d),i.appendChild(a);const r=m("Due Date:",{id:"due-date",type:"date"});r.input.value=s(new Date);const u=document.createElement("button");return u.textContent="Enter Todo",u.classList.add("create-button"),u.classList.add("todo-button"),o.appendChild(c.section),o.appendChild(i),o.appendChild(r.section),o.appendChild(function(){const t=document.createElement("section");t.classList.add("block");const e=document.createElement("p");e.textContent="Priority:",t.appendChild(e);const n=document.createElement("div");n.classList.add("priority-section");const o=m("High",{id:"high",type:"radio",value:"high",name:"priority"}),c=m("Medium",{id:"medium",type:"radio",value:"medium",name:"priority"}),i=m("Low",{id:"low",type:"radio",value:"low",name:"priority"});return i.input.checked=!0,n.appendChild(o.section),n.appendChild(c.section),n.appendChild(i.section),t.appendChild(n),t}()),u.addEventListener("click",(c=>{c.preventDefault();const i=new FormData(o);E(i.get("title"),i.get("description"),i.get("due-date"),i.get("priority"),t,e),y.update(),n.close()})),o.appendChild(u),n.appendChild(o),n.addEventListener("close",(()=>{l.removeChild(n)})),n}function f(t){return d.activeProject.todo_container.hasOwnProperty(t)}function E(t,e,n,o,c=!1,i=null){if(!(t&&e&&n))return void dialog.close();let a;const s=r(t,e,new Date(n),o);c?(i!==t?(a=f(t)?t+"1":t,d.activeProject.removeTodo(i)):a=t,d.activeProject.todo_container[a]=s):(a=f(t)?t+"1":t,d.activeProject.addTodo(a,s))}function b(){const t=v();l.appendChild(t),t.showModal()}function g(){document.querySelector(".project-header").textContent=d.activeProject.name,y.update()}function L(){const t=document.querySelector("#todo-container");t.firstChild?t.classList.remove("center-text"):(t.textContent="This project is empty at the moment.",t.classList.add("center-text"))}function j(){const t=document.createElement("main");return t.appendChild(function(){const t=document.createElement("header"),e=function(){const t=document.createElement("h1");return t.classList.add("project-header"),t}();t.classList.add("translucent-box"),t.classList.add("center-in-main");const n=document.createElement("button");n.classList.add("create-button"),n.classList.add("red-background"),n.textContent="Delete Project",n.addEventListener("click",(()=>{d.removeProject(d.activeIndex),y.updateSidebar(d.projectList),d.activeProject=0,g()}));const o=document.createElement("button");o.classList.add("create-button"),o.textContent="Add a new entry",o.addEventListener("click",b);const c=document.createElement("ul");return c.appendChild(n),c.appendChild(o),t.appendChild(e),t.appendChild(c),t}()),t.appendChild(function(){const t=document.createElement("div");return t.id="todo-container",t.classList.add("translucent-box"),t.classList.add("center-in-main"),t}()),t}class y{constructor(){}static get sidebar(){return document.querySelector(".sidebar")}static updateSidebar(t){const e=y.sidebar.querySelector("ul");p(e);let n=0;t.forEach((t=>{const o=document.createElement("li");o.textContent=t.name,o.id=n,n++,o.addEventListener("click",h),e.appendChild(o)}))}static initialize(){l.appendChild(C()),l.appendChild(j()),L(),g()}static update(){!function(t){const e=document.querySelector("#todo-container");p(e);for(const n in t.todo_container){const o=u(t,n);e.appendChild(o)}L()}(d.activeProject);const t=document.querySelector("header button.red-background");0===d.activeIndex?t.disabled=!0:t.disabled=!1,n.projectArray=d.projectList}}d.initialize(),y.initialize(),y.updateSidebar(d.projectList),y.update()})();
//# sourceMappingURL=main.js.map