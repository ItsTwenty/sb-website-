const photo=n=>`photos/photo-${String(n).padStart(2,'0')}.jpg`;
const price=p=>p.price===null?'Prix à confirmer':new Intl.NumberFormat('fr-MA',{style:'currency',currency:shop.currency,maximumFractionDigits:0}).format(p.price);
const number=()=>shop.whatsapp.replace(/\D/g,'');
const hasWhatsApp=()=>/^[1-9]\d{7,14}$/.test(number());
const grid=document.getElementById('products');
products.forEach((p,index)=>{
 const card=document.createElement('article');card.className='card';
 card.innerHTML=`<button class="image-button" aria-label="Voir ${p.name}, ${p.color}, référence ${p.id}"><img src="${photo(p.photos[0])}" alt="${p.name} — ${p.color}" loading="${index<4?'eager':'lazy'}" width="600" height="800">${p.photos.length>1?`<span class="view-label">${p.photos.length} vues</span>`:''}</button><div class="card-meta"><h3>${p.name}</h3><span class="ref">${p.id}</span></div><p class="color">${p.color}</p><div class="card-bottom"><span class="price">${price(p)}</span><button class="details">Voir le sac</button></div>`;
 card.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>showProduct(p)));grid.append(card);
});
const dialog=document.getElementById('detail');
function showProduct(p){
 document.getElementById('detail-title').textContent=p.name;document.getElementById('detail-ref').textContent=p.id;document.getElementById('detail-color').textContent=p.color;document.getElementById('detail-price').textContent=price(p);
 const image=document.getElementById('detail-image');image.src=photo(p.photos[0]);image.alt=`${p.name} — ${p.color}`;
 const thumbs=document.getElementById('thumbs');thumbs.replaceChildren();
 if(p.photos.length>1)p.photos.forEach((n,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`Vue ${i+1}`);b.setAttribute('aria-pressed',String(i===0));b.innerHTML=`<img src="${photo(n)}" alt="">`;b.onclick=()=>{image.src=photo(n);thumbs.querySelectorAll('button').forEach(t=>t.setAttribute('aria-pressed',String(t===b)))};thumbs.append(b)});
 const action=document.getElementById('order-action');action.replaceChildren();
 const add=document.createElement('button');add.className='order-button';add.textContent='Ajouter au panier';add.onclick=()=>{addToCart(p);dialog.close();basket.showModal()};action.append(add);document.getElementById('detail-status').textContent='Retrouvez vos sacs dans le panier pour commander sur WhatsApp.';
 dialog.showModal();
}
dialog.querySelector('.close').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.getElementById('order-status').textContent=hasWhatsApp()?'Choisissez un sac pour ouvrir votre message WhatsApp.':'Les commandes WhatsApp seront ouvertes prochainement.';
