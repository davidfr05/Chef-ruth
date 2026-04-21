export type MenuItem = { name: string; desc: string; price: string };
export type MenuCategory = { category: string; items: MenuItem[] };

export const restaurantMenu: MenuCategory[] = [
  {
    category: "Sandwichs",
    items: [
      {
        name: "Club Chef Ruth",
        desc: "Poulet rôti, avocat, tomate, roquette, sauce maison",
        price: "12€",
      },
      {
        name: "Saumon Fumé",
        desc: "Saumon fumé, cream cheese, câpres, citron, aneth",
        price: "13€",
      },
      {
        name: "Végétarien",
        desc: "Légumes grillés, hummus, roquette, tomates séchées",
        price: "11€",
      },
      {
        name: "Wrap Poulet Grillé",
        desc: "Poulet grillé, salade, tomate, sauce yaourt-menthe",
        price: "11€",
      },
    ],
  },
  {
    category: "Salades",
    items: [
      {
        name: "Salade Chef Ruth",
        desc: "Mesclun, quinoa, légumes rôtis, graines, vinaigrette maison",
        price: "13€",
      },
      {
        name: "Salade César",
        desc: "Romaine, poulet mariné, parmesan, croûtons, sauce César",
        price: "12€",
      },
    ],
  },
  {
    category: "Formules",
    items: [
      {
        name: "Formule Midi",
        desc: "Sandwich au choix + boisson + dessert du jour",
        price: "16€",
      },
      {
        name: "Formule Complète",
        desc: "Entrée + sandwich ou salade + dessert + boisson",
        price: "22€",
      },
    ],
  },
];

export const traiteurMenu: MenuCategory[] = [
  {
    category: "Plateaux Apéritifs",
    items: [
      {
        name: "Plateau Classique",
        desc: "Assortiment de mini-sandwichs, canapés et verrines — pour 10 personnes",
        price: "À partir de 85€",
      },
      {
        name: "Plateau Prestige",
        desc: "Saumon fumé, foie gras, tartares et mignardises — pour 10 personnes",
        price: "À partir de 140€",
      },
    ],
  },
  {
    category: "Buffets",
    items: [
      {
        name: "Buffet Cocktail",
        desc: "Mise en bouche, bouchées chaudes et froides, par personne",
        price: "25€ / pers.",
      },
      {
        name: "Buffet Déjeuner",
        desc: "Entrées, plats chauds et froids, desserts, par personne",
        price: "35€ / pers.",
      },
    ],
  },
  {
    category: "Plateaux Repas",
    items: [
      {
        name: "Plateau Repas Individuel",
        desc: "Sandwich ou salade + dessert + boisson, livrable en entreprise",
        price: "18€ / pers.",
      },
      {
        name: "Commande sur Mesure",
        desc: "Un événement particulier ? Contactez-nous pour un devis personnalisé adapté à vos besoins.",
        price: "Sur devis",
      },
    ],
  },
];
