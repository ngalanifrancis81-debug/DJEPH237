// Full bilingual content (FR default + EN). Programs carry a `name` used to
// build the mailto/WhatsApp deep links required under every block.

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      approach: "Notre approche",
      programs: "Nos programmes",
      incubator: "Incubateur",
      coliving: "Coliving & Culture",
      donate: "Faire un don",
      contact: "Contact",
      contactCta: "Nous contacter",
      byEmail: "Par Email",
      byWhatsapp: "Par WhatsApp",
    },
    hero: {
      badge: "ONG à impact — approche startup",
      slogan: [
        "Co-créer le futur :",
        "quand l'exil devient",
        "une force d'innovation durable.",
      ],
      subtitle:
        "Widad International Volunteers rompt avec l'image de l'ONG traditionnelle. Nous misons sur l'action concrète, la tech, le design durable et l'énergie collective — aux côtés des réfugiés et des populations locales.",
      ctaPrograms: "Découvrir nos programmes",
      ctaDonate: "Faire un don",
      stats: [
        { value: "3", label: "Espaces d'innovation" },
        { value: "10", label: "Micro-projets an 1" },
        { value: "100%", label: "Énergie solaire" },
      ],
    },
    marquee: [
      "Changemakers",
      "Innovation durable",
      "Autonomie rapide",
      "Éco-responsabilité stylée",
      "Tech for good",
      "Énergie collective",
    ],
    esprit: {
      kicker: "Notre esprit",
      title: "Fini l'ONG où l'on subit. Place à la startup humanitaire.",
      intro:
        "Nous ne parlons pas de « bénéficiaires vulnérables ». Nous construisons avec des créateurs, des partenaires et des changemakers. L'objectif : l'autonomie rapide, pas l'assistanat.",
      pillars: [
        {
          n: "01",
          title: "Changemakers, créateurs et partenaires",
          text: "Personne ne subit sa situation. Chacun co-crée des solutions concrètes avec nous, avec dignité et ambition.",
        },
        {
          n: "02",
          title: "Autonomie rapide",
          text: "Des outils, des compétences et du capital — pas d'assistanat de long terme. On active le potentiel, vite.",
        },
        {
          n: "03",
          title: "Éco-responsabilité stylée",
          text: "Le durable n'est pas une contrainte mais une opportunité désirable : design, upcycling, énergie solaire.",
        },
      ],
    },
    spaces: {
      kicker: "Nos 3 espaces clés",
      title: "Trois lieux où l'exil se transforme en innovation.",
      intro:
        "Un tiers-lieu tech, un incubateur de green startups et un campus nomade culturel. Sous chaque programme, contactez-nous directement.",
      items: [
        {
          id: "makerspace",
          icon: "Wrench",
          tag: "🌍 Makerspace & Tech Lab",
          name: "le Makerspace & Tech Lab",
          title: "Le Makerspace & Tech Lab",
          description:
            "Un tiers-lieu physique et mobile où jeunes réfugiés et locaux se rencontrent pour résoudre les problèmes du quotidien.",
          sub: [
            {
              name: "le Fablab solaire",
              title: "Fablab solaire",
              text: "Réparation de matériel, impression 3D à partir de plastique recyclé, fabrication de chargeurs solaires portables.",
            },
            {
              name: "Digital Boost",
              title: "Digital Boost",
              text: "Formations rapides au code, graphisme et community management pour travailler en freelance à l'international.",
            },
          ],
        },
        {
          id: "incubator",
          icon: "Sprout",
          tag: "🌱 Incubateur de Green Startups",
          name: "l'Incubateur de Green Startups",
          title: "Incubateur de Green Startups",
          description:
            "On co-crée des business models viables. Pas de simple don d'argent : de vraies entreprises portées par leurs fondateurs.",
          sub: [
            {
              name: "Mode & Upcycling",
              title: "Mode & Upcycling",
              text: "Marques de vêtements éthiques à partir de textiles récupérés, portées par des designers réfugiés.",
            },
            {
              name: "Urban Farming & Food Trucks",
              title: "Urban Farming & Food Trucks",
              text: "Permaculture urbaine et cuisine du monde en coopératives (duo réfugié + local).",
            },
            {
              name: "le Micro-capital Fast Track",
              title: "Micro-capital « Fast Track »",
              text: "Financement participatif et micro-fonds pour lancer un projet en moins d'un mois.",
            },
          ],
        },
        {
          id: "coliving",
          icon: "Tent",
          tag: "⛺ Coliving & Campus Nomade",
          name: "le Coliving & Campus Nomade",
          title: "Coliving & Campus Nomade",
          description:
            "La cohésion sociale et culturelle par l'art et l'itinérance. On crée du lien, on célèbre, on sensibilise.",
          sub: [
            {
              name: "les Festivals & Jam Sessions",
              title: "Festivals & Jam Sessions",
              text: "Événements artistiques, battles de street art, concerts et festivals culinaires.",
            },
            {
              name: "le Campus Itinérant",
              title: "Campus Itinérant",
              text: "Vans et structures modulaires éco-responsables pour sensibiliser au climat et former aux énergies renouvelables.",
            },
          ],
        },
      ],
    },
    roadmap: {
      kicker: "Feuille de route",
      title: "Notre première année, mois après mois.",
      steps: [
        {
          period: "Mois 1–3",
          title: "Lancement du Hub pilote",
          text: "Un container aménagé, solaire et connecté — le premier point d'ancrage de WIV.",
        },
        {
          period: "Mois 4–6",
          title: "Premier batch de 10 micro-projets",
          text: "Artisanat, tech et food : dix projets incubés et accompagnés jusqu'au lancement.",
        },
        {
          period: "Mois 7–12",
          title: "Widad Fest",
          text: "Premier festival culturel et climatique pour célébrer les réussites et connecter les talents aux investisseurs et entreprises partenaires.",
        },
      ],
    },
    contactButtons: {
      email: "Discuter par Email",
      whatsapp: "Discuter par WhatsApp",
    },
    donation: {
      kicker: "Faire un don",
      title: "Votre don devient un projet, pas une aumône.",
      subtitle:
        "Chaque contribution finance des outils, des formations et du micro-capital pour lancer de vraies entreprises. Paiement 100% sécurisé, reçu envoyé par email.",
      chooseAmount: "Choisissez un montant",
      custom: "Montant libre",
      customPlaceholder: "Autre montant",
      yourInfo: "Vos informations",
      name: "Nom complet",
      email: "Email (pour le reçu)",
      payStripe: "Payer par carte (Stripe)",
      payPaypal: "Payer avec PayPal",
      paypalDisabled: "PayPal sera bientôt disponible.",
      secure: "Données chiffrées (SSL). Reçu envoyé par email.",
      transparency: "Transparence : 100% des dons servent nos programmes de terrain.",
      processing: "Redirection sécurisée en cours…",
      errAmount: "Veuillez choisir un montant valide.",
      errInfo: "Merci d'indiquer votre nom et un email valide.",
      currencySuffix: "€",
    },
    payment: {
      successTitle: "Merci infiniment pour votre don !",
      successText:
        "Votre paiement a bien été confirmé. Un reçu vous a été envoyé par email. Vous venez de rendre l'innovation durable possible.",
      verifying: "Vérification de votre paiement…",
      backHome: "Retour à l'accueil",
      cancelTitle: "Paiement annulé",
      cancelText:
        "Aucun montant n'a été débité. Vous pouvez réessayer à tout moment — chaque geste compte.",
      retry: "Réessayer le don",
      failedTitle: "Paiement non confirmé",
      failedText: "Nous n'avons pas pu confirmer votre paiement. Réessayez ou contactez-nous.",
    },
    contact: {
      kicker: "Contact",
      title: "Parlons de votre idée, de votre projet ou de votre soutien.",
      intro: "Écrivez-nous, ou joignez-nous directement par email et WhatsApp.",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le message",
      sending: "Envoi…",
      success: "Message envoyé ! Nous revenons vers vous très vite.",
      error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
      directTitle: "Contact direct",
      locationLabel: "Localisation",
      social: "Réseaux sociaux",
      soon: "Bientôt",
    },
    footer: {
      tagline: "Quand l'exil devient une force d'innovation durable.",
      quickLinks: "Navigation",
      contactTitle: "Contact",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      rights: "Tous droits réservés.",
    },
  },

  en: {
    nav: {
      home: "Home",
      approach: "Our approach",
      programs: "Our programs",
      incubator: "Incubator",
      coliving: "Coliving & Culture",
      donate: "Donate",
      contact: "Contact",
      contactCta: "Contact us",
      byEmail: "By Email",
      byWhatsapp: "By WhatsApp",
    },
    hero: {
      badge: "Impact NGO — startup approach",
      slogan: [
        "Co-creating the future:",
        "when exile becomes",
        "a force for sustainable innovation.",
      ],
      subtitle:
        "Widad International Volunteers breaks away from the traditional NGO image. We bet on concrete action, tech, sustainable design and collective energy — alongside refugees and local communities.",
      ctaPrograms: "Explore our programs",
      ctaDonate: "Donate",
      stats: [
        { value: "3", label: "Innovation spaces" },
        { value: "10", label: "Micro-projects year 1" },
        { value: "100%", label: "Solar powered" },
      ],
    },
    marquee: [
      "Changemakers",
      "Sustainable innovation",
      "Fast autonomy",
      "Stylish eco-responsibility",
      "Tech for good",
      "Collective energy",
    ],
    esprit: {
      kicker: "Our spirit",
      title: "No more NGO where people just endure. Enter the humanitarian startup.",
      intro:
        "We don't talk about \"vulnerable beneficiaries\". We build with creators, partners and changemakers. The goal: fast autonomy, not dependency.",
      pillars: [
        {
          n: "01",
          title: "Changemakers, creators and partners",
          text: "No one just endures their situation. Everyone co-creates concrete solutions with us, with dignity and ambition.",
        },
        {
          n: "02",
          title: "Fast autonomy",
          text: "Tools, skills and capital — not long-term assistance. We activate potential, fast.",
        },
        {
          n: "03",
          title: "Stylish eco-responsibility",
          text: "Sustainability is not a constraint but a desirable opportunity: design, upcycling, solar energy.",
        },
      ],
    },
    spaces: {
      kicker: "Our 3 key spaces",
      title: "Three places where exile turns into innovation.",
      intro:
        "A tech third-place, a green-startup incubator and a nomadic cultural campus. Under each program, reach us directly.",
      items: [
        {
          id: "makerspace",
          icon: "Wrench",
          tag: "🌍 Makerspace & Tech Lab",
          name: "the Makerspace & Tech Lab",
          title: "The Makerspace & Tech Lab",
          description:
            "A physical and mobile third-place where young refugees and locals meet to solve everyday problems.",
          sub: [
            {
              name: "the Solar Fablab",
              title: "Solar Fablab",
              text: "Equipment repair, 3D printing from recycled plastic, and portable solar chargers.",
            },
            {
              name: "Digital Boost",
              title: "Digital Boost",
              text: "Fast training in code, design and community management to freelance internationally.",
            },
          ],
        },
        {
          id: "incubator",
          icon: "Sprout",
          tag: "🌱 Green Startups Incubator",
          name: "the Green Startups Incubator",
          title: "Green Startups Incubator",
          description:
            "We co-create viable business models. Not just cash handouts: real companies driven by their founders.",
          sub: [
            {
              name: "Fashion & Upcycling",
              title: "Fashion & Upcycling",
              text: "Ethical clothing brands from recovered textiles, led by refugee designers.",
            },
            {
              name: "Urban Farming & Food Trucks",
              title: "Urban Farming & Food Trucks",
              text: "Urban permaculture and world cuisine in cooperatives (refugee + local duo).",
            },
            {
              name: "the Fast Track Micro-capital",
              title: "\"Fast Track\" Micro-capital",
              text: "Crowdfunding and micro-funds to launch a project in under a month.",
            },
          ],
        },
        {
          id: "coliving",
          icon: "Tent",
          tag: "⛺ Coliving & Nomadic Campus",
          name: "the Coliving & Nomadic Campus",
          title: "Coliving & Nomadic Campus",
          description:
            "Social and cultural cohesion through art and travel. We build bonds, celebrate and raise awareness.",
          sub: [
            {
              name: "the Festivals & Jam Sessions",
              title: "Festivals & Jam Sessions",
              text: "Artistic events, street-art battles, concerts and culinary festivals.",
            },
            {
              name: "the Traveling Campus",
              title: "Traveling Campus",
              text: "Eco-friendly vans and modular structures to raise climate awareness and train in renewable energy.",
            },
          ],
        },
      ],
    },
    roadmap: {
      kicker: "Roadmap",
      title: "Our first year, month after month.",
      steps: [
        {
          period: "Months 1–3",
          title: "Pilot Hub launch",
          text: "A fitted, solar-powered and connected container — WIV's first anchor point.",
        },
        {
          period: "Months 4–6",
          title: "First batch of 10 micro-projects",
          text: "Crafts, tech and food: ten incubated projects supported all the way to launch.",
        },
        {
          period: "Months 7–12",
          title: "Widad Fest",
          text: "First cultural and climate festival to celebrate success and connect talent with investors and partner companies.",
        },
      ],
    },
    contactButtons: {
      email: "Chat by Email",
      whatsapp: "Chat by WhatsApp",
    },
    donation: {
      kicker: "Donate",
      title: "Your gift becomes a project, not charity.",
      subtitle:
        "Every contribution funds tools, training and micro-capital to launch real businesses. 100% secure payment, receipt sent by email.",
      chooseAmount: "Choose an amount",
      custom: "Custom amount",
      customPlaceholder: "Other amount",
      yourInfo: "Your information",
      name: "Full name",
      email: "Email (for the receipt)",
      payStripe: "Pay by card (Stripe)",
      payPaypal: "Pay with PayPal",
      paypalDisabled: "PayPal will be available soon.",
      secure: "Encrypted data (SSL). Receipt sent by email.",
      transparency: "Transparency: 100% of donations fund our field programs.",
      processing: "Secure redirect in progress…",
      errAmount: "Please choose a valid amount.",
      errInfo: "Please provide your name and a valid email.",
      currencySuffix: "€",
    },
    payment: {
      successTitle: "Thank you so much for your donation!",
      successText:
        "Your payment has been confirmed. A receipt has been sent to your email. You just made sustainable innovation possible.",
      verifying: "Verifying your payment…",
      backHome: "Back to home",
      cancelTitle: "Payment cancelled",
      cancelText: "No amount was charged. You can try again anytime — every gesture counts.",
      retry: "Try donating again",
      failedTitle: "Payment not confirmed",
      failedText: "We couldn't confirm your payment. Please retry or contact us.",
    },
    contact: {
      kicker: "Contact",
      title: "Let's talk about your idea, your project or your support.",
      intro: "Write to us, or reach us directly by email and WhatsApp.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent! We'll get back to you very soon.",
      error: "Something went wrong. Retry or write to us directly.",
      directTitle: "Direct contact",
      locationLabel: "Location",
      social: "Social media",
      soon: "Soon",
    },
    footer: {
      tagline: "When exile becomes a force for sustainable innovation.",
      quickLinks: "Navigation",
      contactTitle: "Contact",
      legal: "Legal notice",
      privacy: "Privacy policy",
      rights: "All rights reserved.",
    },
  },
};
