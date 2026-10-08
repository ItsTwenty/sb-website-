const cart = new Map();
const cartButton = document.createElement('button');
cartButton.className='cart-toggle';
cartButton.setAttribute('aria-haspopup','dialog');
document.querySelector('header').append(cartButton);
const basket=document.createElement('dialog');
basket.id='basket';basket.setAttribute('aria-labelledby','basket-title');
basket.innerHTML=`<button class="close" aria-label="Fermer le panier">×</button><p class="eyebrow">SAMIRA BAGS</p><h2 id="basket-title">Votre panier</h2><div id="cart-items"></div><div id="cart-summary"></div><div id="checkout"></div><p id="checkout-note" class="status"></p>`;
document.body.append(basket);
basket.querySelector('.close').onclick=()=>basket.close();
basket.addEventListener('click',e=>{if(e.target===basket){const r=basket.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)basket.close()}});
cartButton.onclick=()=>{renderCart();basket.showModal()};
const notice=document.createElement('div');notice.className='cart-notice';notice.setAttribute('role','status');document.body.append(notice);
let noticeTimer;
function addToCart(p){cart.set(p.id,(cart.get(p.id)||0)+1);renderCart();notice.textContent=`${p.name} ajouté au panier`;notice.classList.add('visible');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>notice.classList.remove('visible'),2600)}
document.querySelectorAll('.card').forEach((card,i)=>{const b=document.createElement('button');b.className='add-cart';b.textContent='Ajouter au panier';b.setAttribute('aria-label',`Ajouter ${products[i].name}, ${products[i].id} au panier`);b.onclick=()=>addToCart(products[i]);card.append(b)});
function orderMessage(){
 const lines=['Bonjour Samira Bags ! Je souhaite commander :'];let total=0,unknown=false;
 for(const [id,qty] of cart){const p=products.find(p=>p.id===id);lines.push(`${qty} × ${p.id} — ${p.name} (${p.color}) — ${price(p)} / unité`);if(p.price===null)unknown=true;else total+=p.price*qty;}
 lines.push('',`${unknown?'Sous-total connu':'Total articles'} : ${price({price:total})}`, 'Merci de confirmer les prix, la disponibilité et les frais de livraison.');return lines.join('\n');
}
function renderCart(){
 const count=[...cart.values()].reduce((a,b)=>a+b,0);cartButton.textContent=`Panier (${count})`;
 const items=document.getElementById('cart-items');items.replaceChildren();let total=0,unknown=false;
 for(const [id,qty] of cart){const p=products.find(p=>p.id===id);if(p.price===null)unknown=true;else total+=p.price*qty;
 const row=document.createElement('article');row.className='cart-row';row.innerHTML=`<img src="${photo(p.photos[0])}" alt="${p.name} — ${p.color}"><div class="cart-item-copy"><h3>${p.name}</h3><p>${p.id} · ${p.color}</p><p>${price(p)} / unité</p><div class="quantity"><button data-delta="-1" aria-label="Diminuer la quantité de ${p.id}">−</button><span aria-label="Quantité">${qty}</span><button data-delta="1" aria-label="Augmenter la quantité de ${p.id}">+</button><button class="remove" aria-label="Retirer ${p.id}">Retirer</button></div></div><strong>${p.price===null?'À confirmer':price({price:p.price*qty})}</strong>`;
 row.querySelectorAll('[data-delta]').forEach(b=>b.onclick=()=>{const next=qty+Number(b.dataset.delta);if(next<=0)cart.delete(id);else cart.set(id,next);renderCart()});row.querySelector('.remove').onclick=()=>{cart.delete(id);renderCart()};items.append(row);
 }
 const summary=document.getElementById('cart-summary'),checkout=document.getElementById('checkout'),note=document.getElementById('checkout-note');checkout.replaceChildren();
 if(!count){items.innerHTML='<p class="empty-cart">Votre panier est vide. Choisissez votre premier sac dans la collection.</p>';summary.textContent='';const b=document.createElement('button');b.className='order-button';b.textContent='Continuer mes achats';b.onclick=()=>basket.close();checkout.append(b);note.textContent='';return}
 summary.innerHTML=`<div class="cart-total"><span>${unknown?'Sous-total connu':'Total articles'}</span><strong>${price({price:total})}</strong></div><p class="status">Hors livraison · Prix et disponibilité à confirmer.</p>`;
 const action=document.createElement(hasWhatsApp()?'a':'button');action.className='order-button whatsapp-checkout';action.textContent='Commander sur WhatsApp';
 if(hasWhatsApp()){action.href=`https://wa.me/${number()}?text=${encodeURIComponent(orderMessage())}`;action.target='_blank';action.rel='noopener noreferrer';note.textContent='Votre panier sera préparé dans WhatsApp. Envoyez le message pour demander votre commande.'}
 else{action.disabled=true;note.textContent='La commande WhatsApp sera disponible dès l’ouverture des commandes.'}
 checkout.append(action);
}
document.getElementById('order-status').textContent='Ajoutez vos sacs au panier, puis retrouvez votre sélection pour commander sur WhatsApp.';
renderCart();

if(hasWhatsApp()){
 const contact=document.createElement('a');contact.className='whatsapp-float';contact.href=`https://wa.me/${number()}?text=${encodeURIComponent('Bonjour Samira Bags ! Je souhaite avoir des informations sur vos sacs.')}`;contact.target='_blank';contact.rel='noopener noreferrer';contact.setAttribute('aria-label','Contacter Samira Bags sur WhatsApp');contact.title='Contactez-nous sur WhatsApp';contact.innerHTML='<svg aria-hidden="true" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.96L.02 24l6.25-1.64a11.9 11.9 0 0 0 5.77 1.47h.01C18.63 23.83 24 18.48 24 11.9a11.85 11.85 0 0 0-3.48-8.42ZM12.05 21.8a9.85 9.85 0 0 1-5.03-1.37l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.92-9.9a9.83 9.83 0 0 1 7.01 2.9 9.83 9.83 0 0 1 2.9 7.01c0 5.45-4.45 9.86-9.96 9.86Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>';document.body.append(contact);
}
