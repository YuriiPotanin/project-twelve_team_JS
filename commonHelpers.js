var S=(t,o,e)=>{if(!o.has(t))throw TypeError("Cannot "+e)};var i=(t,o,e)=>(S(t,o,"read from private field"),e?e.call(t):o.get(t)),c=(t,o,e)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,e)};import"./assets/scroll-up-adaa23b2.js";import{a as d,N as w,n as _}from"./assets/vendor-83fc1255.js";var r,m,b,k;class u{constructor(){c(this,r,"https://books-backend.p.goit.global/books");c(this,m,"/top-books");c(this,b,"/category-list");c(this,k,"/category?category=")}async getBooks(){return(await d.get(`${i(this,r)}${i(this,m)}`)).data}async getAllCategories(){return(await d.get(`${i(this,r)}${i(this,b)}`)).data}async getBookById(o){return(await d.get(`${i(this,r)}/${o}`)).data}async getBooksFromCategory(o){return(await d.get(`${i(this,r)}${i(this,k)}${o}`)).data}}r=new WeakMap,m=new WeakMap,b=new WeakMap,k=new WeakMap;const f=document.querySelector(".loader-backdrop");function y(){f==null||f.classList.toggle("is-hidden")}const x=document.querySelector(".book-block-list");function B(t){return`<li class="book-card" id="${t._id}">
    <div class="book-card-box">
    <img class="book-card-img" src="${t.book_image}" alt="Book cover ${t.title}" loading="lazy" />
    </div>
    <h3 class="book-card-title">${t.title}</h3>
    <p class="book-card-text">${t.author}</p>
    </li>`}function T(t){const o=[];for(let e=0;e<t.length;e+=1){const s=t[e].books.map((n,l)=>{if(l<5)return B(n)}).join(""),a=`<h2 class="best-category-title">${t[e].list_name}</h2>
    <ul class="best-category-list">${s}</ul>
    <div class="see-more-btn-box">
    <button class="see-more-btn" name="${t[e].list_name}" type="button">See more</button></div>`;o.push(a)}x.innerHTML=o.join("")}const q=new u;async function E(){y();try{const t=await q.getBooks();t.length===0&&w.Notify.warning("Sorry, there are no bestsellers books yet"),T(t)}catch{w.Notify.failure("Something went wrong!")}finally{y()}}E();const L=(t,o)=>{const e=document.createElement("li");e.classList.add("categories-item");const s=`categoryRadio${o+1}`,a=document.createElement("input");a.setAttribute("type","radio"),a.setAttribute("name","category"),a.setAttribute("id",s),a.classList.add("categories-button");const n=document.createElement("label");return n.textContent=t.list_name,n.setAttribute("for",s),n.classList.add("categories-label"),e.appendChild(a),e.appendChild(n),e};async function v(){const t=await new u().getAllCategories();t.sort((e,s)=>e.list_name.localeCompare(s.list_name));const o=document.querySelector(".categories-list");t.forEach((e,s)=>{const a=L(e,s);o.appendChild(a)});try{const e=await new u().getAllCategories();e.sort((a,n)=>a.list_name.localeCompare(n.list_name));const s=document.querySelector(".categories-list");e.forEach((a,n)=>{const l=L(a,n);s.appendChild(l)})}catch{_.Notify.failure("Something went wrong!")}}v();const I=new u,g=document.querySelector(".book-block-list"),C=document.querySelector(".book-block-title"),h=document.querySelector(".categories-list");g==null||g.addEventListener("click",N);function N(t){t.preventDefault(),window.innerWidth>=1440?window.scrollTo(window.innerHeight,0):window.innerWidth>=768&&window.innerWidth<1440?window.scrollTo(window.innerHeight,500):window.scrollTo(window.innerHeight,820),document.querySelectorAll("label").forEach(e=>{e.textContent===t.target.name?e.classList.add("active"):e.classList.remove("active")}),t.target.nodeName==="BUTTON"&&(C.style.display="none",A(t.target.name))}h==null||h.addEventListener("click",O);function O(t){t.preventDefault(),document.querySelectorAll("label").forEach(s=>{s===t.target&&s.classList.add("active"),s.classList.remove("active")});const e=t.target;e.nodeName==="LABEL"&&e.textContent!=="All Categories"?(e.classList.add("active"),C.style.display="none",A(e.textContent)):e.textContent==="All Categories"&&(C.style.display="block",e.classList.add("active"),E())}async function A(t){try{y();const o=await I.getBooksFromCategory(t);R(o,t)}catch{w.Notify.failure("Sorry, no books in this category")}finally{y()}}function R(t,o){const e=t.map(p=>B(p)).join(""),s=o.split(" ");let a=s.length-1,n=s[a];const $=`<h2 class="book-block-title">${s.splice(0,a).join(" ")}&nbsp;<span class="book-block-title-accent">${n}</span>
    </h2>
    <ul class="category-books-wrapper">${e}</ul>`;g.innerHTML=$,document.querySelectorAll(".book-card").forEach(p=>p.style.display="block")}
//# sourceMappingURL=commonHelpers.js.map
