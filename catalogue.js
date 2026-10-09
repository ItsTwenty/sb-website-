window.shop = { name: 'Samira Bags', whatsapp: '212602717722', currency: 'MAD' };
window.products = [
 {id:'SB01',name:'Fashion & Bag · Cabas',color:'Bordeaux & écru',photos:[1],price:199},
 {id:'SB02',name:'Fashion & Bag · Sac épaule',color:'Écru & camel',photos:[2],price:199},
 {id:'SB03',name:'Le grand cabas',color:'Bronze',photos:[3],price:199},
 {id:'SB04',name:'La besace ajourée',color:'Rose poudré',photos:[4],price:199},
 {id:'SB05',name:'Fashion & Bags · Sac à rabat',color:'Noir',photos:[5],price:199},
 {id:'SB06',name:'Le sac texturé',color:'Taupe doré',photos:[6,12],price:199},
 {id:'SB07',name:'David Jones · Sac à rabat',color:'Écru',photos:[7],price:199},
 {id:'SB08',name:'David Jones · Sac à rabat',color:'Taupe métallisé',photos:[8],price:199},
 {id:'SB09',name:'David Jones Paris · Monogramme',color:'Rose poudré',photos:[9],price:199},
 {id:'SB10',name:'David Jones Paris · Monogramme',color:'Écru',photos:[10],price:199},
 {id:'SB11',name:'Cabas noir · RS5104',color:'Noir · détails dorés',photos:[11,18],price:199},
 {id:'SB12',name:'Le mini texturé',color:'Noir · bijou de sac',photos:[13],price:199},
 {id:'SB13',name:'Elisa Bag · Sac à chaîne',color:'Camel & écru',photos:[14,19],price:199},
 {id:'SB14',name:'Le sac à foulard',color:'Camel & écru',photos:[15,16],price:199},
 {id:'SB15',name:'Elisa Bag · Sac à chaîne',color:'Noir & écru',photos:[17],price:199},
 {id:'SB16',name:'Le sac à foulard',color:'Beige clair & écru',photos:[20],price:199}
];
const confirmedPrices = {
  SB01: 90, SB02: 90, SB03: 90, SB04: 100,
  SB05: 200, SB06: 230, SB07: 200, SB08: 200,
  SB09: 270, SB10: 270, SB11: 250, SB12: 250,
  SB13: 200, SB14: 280, SB15: 200, SB16: 280
};

window.products.forEach(product => {
  product.price = confirmedPrices[product.id];
});
