"""Catalogue Widad International Volunteers — 8 pays, 14 projets par pays.

Contenu 100 % français, spécifique aux réalités de chaque pays. Images
Unsplash vérifiées, uniques au sein de chaque pays.
"""


def _img(pid, w=1100):
    return f"https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w={w}&q=80"


IMG = {
    "kids_arts": _img("1503454537195-1dcabb73ffb9"),
    "kids_group": _img("1497486751825-1233686d5d80"),
    "kids_play": _img("1488521787991-ed7bbaae773c"),
    "kids_rural": _img("1594708767771-a7502209ff51"),
    "classroom": _img("1509062522246-3755977927d7"),
    "students_study": _img("1523240795612-9a054b0db644"),
    "language_class": _img("1571260899304-425eee4c7efc"),
    "graduation": _img("1541339907198-e08756dedf3f"),
    "digital_youth": _img("1531482615713-2afd69097998"),
    "meeting": _img("1517048676732-d65bc937f952"),
    "coworking": _img("1521737604893-d14cc237f11d"),
    "women_mentor": _img("1590650516494-0c8e4a4dd67e"),
    "business_plan": _img("1454165804606-c3d57bc86b40"),
    "hands_together": _img("1531206715517-5c0ba140b2b8"),
    "exchange": _img("1604881988758-f76ad2f7aac1"),
    "sport": _img("1544033527-b192daee1f5b"),
    "field_sunset": _img("1500382017468-9049fed747ef"),
    "rice_farmer": _img("1520052203542-d3095f1b6cf0"),
    "compost": _img("1416879595882-3373a0480b5b"),
    "forest": _img("1441974231531-c6227db76b6e"),
    "water_nature": _img("1497436072909-60f360e1d4b1"),
    "market_produce": _img("1464226184884-fa280b87c399"),
    "market_stalls": _img("1533900298318-6b8da08a523e"),
    "food": _img("1595535873420-a599195b3f4a"),
    "solar": _img("1509391366360-2e959784a276"),
    "wind": _img("1466611653911-95081537e5b7"),
    "textile": _img("1556905055-8f358a7a47b2"),
    "pottery1": _img("1565193566173-7a0ee3dbe261"),
    "pottery2": _img("1610701596007-11502861dcfa"),
    "savanna_tree": _img("1547471080-7cc2caa01a7e", 1600),
    "backpacker": _img("1527631746610-bca00a040d60", 1400),
    "safari": _img("1516426122078-c23e76319801"),
    "giraffe": _img("1523805009345-7448845a9e53"),
    "desert_camels": _img("1489493585363-d69421e0edd3"),
    "desert_canyon": _img("1509316785289-025f5b846b35"),
    "african_food": _img("1517244683847-7456b63c5969"),
    "math_stairs": _img("1546833998-877b37c2e5c6"),
    "health": _img("1584982751601-97dcc096659c"),
    "food_bowls": _img("1543353071-873f17a7a088"),
    "fish": _img("1544551763-77ef2d0cfc6c"),
    "team_meeting": _img("1600880292203-757bb62b4baf"),
}

HERO_IMAGE = IMG["savanna_tree"]
COURSES_HERO = IMG["language_class"]

COUNTRIES = [
    {"slug": "cameroun", "name": "Cameroun", "flag": "🇨🇲"},
    {"slug": "mali", "name": "Mali", "flag": "🇲🇱"},
    {"slug": "nigeria", "name": "Nigeria", "flag": "🇳🇬"},
    {"slug": "senegal", "name": "Sénégal", "flag": "🇸🇳"},
    {"slug": "maroc", "name": "Maroc", "flag": "🇲🇦"},
    {"slug": "benin", "name": "Bénin", "flag": "🇧🇯"},
    {"slug": "burkina-faso", "name": "Burkina Faso", "flag": "🇧🇫"},
    {"slug": "niger", "name": "Niger", "flag": "🇳🇪"},
]

CATEGORIES = {
    "EDU": "Éducation",
    "SOCI": "Social",
    "ENV": "Environnement",
    "SANT": "Santé",
    "ENTR": "Entrepreneuriat",
    "LANG": "Langue",
}

C = {c["slug"]: c for c in COUNTRIES}


def _p(country, flag, slug, title, city, age_min, age_max, amount, duration, cats, desc, img):
    return {
        "slug": slug, "country": country["name"], "country_slug": country["slug"], "flag": flag,
        "title": title, "city": city, "age_min": age_min, "age_max": age_max,
        "age_label": f"{age_min}-{age_max} ans", "amount": float(amount), "currency": "eur",
        "duration": duration, "categories": cats, "description": desc, "image": img, "type": "project",
    }


# ============================================================================
# CAMEROUN — 14 projets (liste fournie par le client, description détaillée)
# ============================================================================
CM = C["cameroun"]
FCM = "🇨🇲"
CAMEROUN = [
    _p(CM, FCM, "renforcement-digue-de-maga", "Renforcement de la Digue de Maga",
       "Maga (Extrême-Nord)", 18, 60, 340, "3 à 6 semaines", ["ENV", "SOCI"],
       "Participation à la consolidation de la digue de Maga qui protège les villages riverains du lac de Maga contre les crues du Logone et du Chari. Les volontaires épaulent les équipes techniques dans le renforcement des levées de terre, la pose de gabions et la sensibilisation des communautés aux gestes qui préservent l'ouvrage pendant la saison des pluies.",
       IMG["water_nature"]),
    _p(CM, FCM, "construction-cases-obus-maga", "Construction de cases en obus à Maga",
       "Maga (Extrême-Nord)", 18, 60, 320, "2 à 6 semaines", ["ENV", "SOCI"],
       "Chantier de construction de cases traditionnelles en obus (huttes coniques en terre crue) pour reloger des familles sinistrées. Les volontaires apprennent aux côtés des maçons locaux le mélange banco/paille, le moulage des briques et le montage de la charpente conique, dans le respect strict des techniques musgum ancestrales.",
       IMG["compost"]),
    _p(CM, FCM, "yagoua-inondations", "Réponse aux inondations de Yagoua",
       "Yagoua (Extrême-Nord)", 18, 60, 350, "2 à 4 semaines", ["SOCI", "SANT"],
       "Mission d'urgence après les inondations qui frappent chaque année la ville de Yagoua : distribution de kits d'hygiène, appui à l'installation de camps de déplacés, dépompage, et sensibilisation santé (paludisme, choléra). Coordination avec les autorités locales et les ONG partenaires sur le terrain.",
       IMG["hands_together"]),
    _p(CM, FCM, "kousserie-inondations", "Réponse aux inondations de Kousséri",
       "Kousséri (Extrême-Nord)", 18, 60, 330, "2 à 4 semaines", ["SOCI", "SANT"],
       "Aide humanitaire à Kousséri à la frontière tchadienne, particulièrement touchée par les crues du Logone. Les volontaires soutiennent le recensement des sinistrés, la distribution alimentaire, la remise en état des écoles primaires inondées et l'appui psychosocial aux enfants déplacés.",
       IMG["field_sunset"]),
    _p(CM, FCM, "accueil-personnes-vulnerables", "Programme d'accueil des personnes vulnérables",
       "Douala / Yaoundé", 18, 60, 310, "3 à 8 semaines", ["SOCI"],
       "Accompagnement de structures d'accueil pour réfugiés centrafricains, déplacés internes de l'Extrême-Nord et jeunes en errance : soutien administratif, animation d'ateliers d'orientation, aide à la constitution des dossiers d'insertion et médiation avec les services sociaux.",
       IMG["exchange"]),
    _p(CM, FCM, "recherche-des-origines", "Recherche des origines familiales",
       "Yaoundé / Douala", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
       "Programme dédié aux membres de la diaspora souhaitant retrouver leurs origines camerounaises. Accompagnement par une équipe historienne locale : dépouillement des archives, visites de villages ancestraux, mise en relation avec les chefferies traditionnelles et documentation vidéo du parcours.",
       IMG["business_plan"]),
    _p(CM, FCM, "familles-accueil", "Réseau de familles d'accueil pour volontaires",
       "Cameroun (multi-villes)", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
       "Développement et suivi du réseau des familles d'accueil qui hébergent les volontaires internationaux : visites à domicile, formation à l'accueil interculturel, médiation en cas de difficulté et évaluation de la qualité du séjour. Immersion garantie dans le quotidien camerounais.",
       IMG["kids_play"]),
    _p(CM, FCM, "enseignement-lycee-bafang", "Enseignement au Lycée Classique de Bafang",
       "Bafang (Ouest)", 21, 60, 300, "4 à 12 semaines", ["EDU"],
       "Renfort pédagogique au Lycée Classique de Bafang : cours de français, mathématiques et informatique de base, en co-animation avec les enseignants titulaires. Préparation aux examens (BEPC, Probatoire, Baccalauréat), animation de clubs scolaires et appui à la bibliothèque de l'établissement.",
       IMG["classroom"]),
    _p(CM, FCM, "volontariat-pygmees-nomedjo-mantissoun", "Volontariat auprès des Pygmées (Nomedjo, Mantissoun)",
       "Nomedjo & Mantissoun (Est)", 18, 55, 350, "3 à 8 semaines", ["SOCI", "SANT"],
       "Séjour d'immersion dans les campements pygmées Baka de Nomedjo et Mantissoun, dans le Sud-Est forestier. Appui aux structures de santé mobile, à la scolarisation des enfants et au dialogue avec les autorités locales sur les droits fonciers. Encadrement obligatoire par une ONG partenaire spécialisée.",
       IMG["forest"]),
    _p(CM, FCM, "volontariat-bororo-gado", "Volontariat auprès des Bororo à Gado",
       "Gado (Est, région de Bertoua)", 18, 55, 360, "3 à 8 semaines", ["SOCI"],
       "Vie et travail aux côtés des Bororo (Peuls nomades) à Gado : accompagnement du bétail, appui à la santé animale et humaine (vaccinations, points d'eau), sensibilisation à la scolarisation des enfants et documentation ethnographique respectueuse de la culture pastorale.",
       IMG["desert_camels"]),
    _p(CM, FCM, "bororo-extreme-nord-education", "Bororo de l'Extrême-Nord — enseignement du français et éducation",
       "Kolofata / Mora (Extrême-Nord)", 21, 60, 330, "4 à 10 semaines", ["EDU", "SOCI"],
       "Programme d'éducation itinérant auprès des enfants Bororo transhumants de l'Extrême-Nord : cours de français, alphabétisation en fulfulde, hygiène et calcul de base. Les volontaires travaillent avec des instituteurs mobiles et adaptent les emplois du temps aux déplacements saisonniers des campements.",
       IMG["language_class"]),
    _p(CM, FCM, "bororo-pygmees-informatique", "Informatique pour les Bororo et les Pygmées",
       "Est & Extrême-Nord", 21, 60, 500, "4 à 10 semaines", ["EDU", "ENTR"],
       "Programme premium : mise en place de cyber-classes solaires dans deux campements bororo (Extrême-Nord) et deux campements pygmées (Est). Initiation à l'ordinateur, à Internet et aux outils bureautiques pour les jeunes de 12 à 25 ans. Le montant plus élevé finance le matériel (ordinateurs portables reconditionnés + panneaux solaires).",
       IMG["digital_youth"]),
    _p(CM, FCM, "tourisme-solidaire-accueil-famille", "Tourisme solidaire — accueil et logement en famille",
       "Cameroun (Ouest, Littoral, Sud)", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
       "Formule courte pour découvrir le Cameroun autrement : logement et repas chez une famille locale sélectionnée, visites guidées par un jeune du village, participation aux activités quotidiennes (marché, champs, veillées). Une immersion authentique qui rémunère directement les familles hôtes.",
       IMG["backpacker"]),
    _p(CM, FCM, "apprentissage-cuisine-africaine", "Apprentissage de la cuisine africaine",
       "Douala / Yaoundé / Bafoussam", 18, 70, 220, "1 à 3 semaines", ["SOCI", "ENTR"],
       "Atelier de cuisine camerounaise et panafricaine chez une cheffe locale : Ndolé, Poulet DG, Eru, Koki, Bobolo, Poisson braisé. Marché du matin, préparation guidée, dégustation et discussions autour du patrimoine culinaire. Idéal pour les passionnés qui veulent ramener l'Afrique dans leur cuisine.",
       IMG["african_food"]),
]

# ============================================================================
# Helper pour générer les 14 projets « thématiques » d'un pays donné
# (14 thèmes analogues aux Cameroun, adaptés à la réalité du pays)
# ============================================================================
def _build(country, flag, entries):
    return [
        _p(country, flag, slug, title, city, age_min, age_max, amount, duration, cats, desc, img)
        for (slug, title, city, age_min, age_max, amount, duration, cats, desc, img) in entries
    ]


# ============================================================================
# MALI — 14 projets
# ============================================================================
CM_ML = C["mali"]; FML = "🇲🇱"
MALI = _build(CM_ML, FML, [
    ("mali-digues-niger-mopti", "Renforcement des digues du fleuve Niger à Mopti", "Mopti", 18, 60, 340, "3 à 6 semaines", ["ENV","SOCI"],
     "Consolidation des digues qui protègent Mopti — surnommée la « Venise malienne » — des crues annuelles du Niger et du Bani. Les volontaires épaulent les techniciens locaux dans la pose d'enrochements, la surveillance des points sensibles et l'organisation de comités villageois d'alerte précoce.", IMG["water_nature"]),
    ("mali-cases-banco-djenne", "Restauration des maisons en banco de Djenné", "Djenné", 18, 60, 320, "2 à 6 semaines", ["ENV","SOCI"],
     "Djenné, classée UNESCO, doit reconstruire chaque année son architecture de terre crue. Chantier participatif de crépissage, moulage de briques de banco et entretien de la Grande Mosquée aux côtés des maçons de la corporation Barey Ton.", IMG["compost"]),
    ("mali-inondations-bamako", "Réponse aux inondations à Bamako", "Bamako (quartiers du fleuve)", 18, 60, 350, "2 à 4 semaines", ["SOCI","SANT"],
     "Aide d'urgence dans les quartiers de Bakaraw, Bozola et Djélibougou régulièrement inondés par la crue du Niger : distribution alimentaire, purification de l'eau, appui médical léger et remise en état des écoles.", IMG["hands_together"]),
    ("mali-secheresse-kayes", "Lutte contre la sécheresse à Kayes", "Kayes", 18, 60, 330, "2 à 4 semaines", ["ENV","SOCI"],
     "Région la plus chaude du Mali. Appui aux villages dans le forage manuel de puits, la construction de réservoirs et la sensibilisation à la gestion économe de l'eau pour l'élevage et le maraîchage.", IMG["field_sunset"]),
    ("mali-accueil-deplaces-segou", "Accueil des déplacés internes à Ségou", "Ségou", 18, 60, 310, "3 à 8 semaines", ["SOCI"],
     "Familles déplacées par la crise sécuritaire du nord et du centre : appui aux camps, animation d'espaces enfants, aide administrative et médiation avec les services de l'État malien.", IMG["exchange"]),
    ("mali-recherche-origines-diaspora", "Recherche des origines — diaspora malienne", "Bamako", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
     "Programme pour la diaspora malienne d'Europe et d'Amérique : recherches généalogiques dans les archives, visites de villages ancestraux (Kayes, Ségou, Mopti) et rencontres avec les griots dépositaires de la mémoire familiale.", IMG["business_plan"]),
    ("mali-familles-accueil", "Réseau de familles d'accueil", "Bamako, Ségou, Mopti", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
     "Suivi des familles hôtes qui accueillent les volontaires internationaux à travers le Mali. Visites, formation interculturelle et médiation garantissent une immersion sûre et enrichissante.", IMG["kids_play"]),
    ("mali-lycee-askia-bamako", "Enseignement au Lycée Askia Mohamed", "Bamako", 21, 60, 300, "4 à 12 semaines", ["EDU"],
     "Cours de français, mathématiques et informatique au Lycée Askia Mohamed de Bamako. Co-animation avec les professeurs titulaires, préparation au DEF et au Baccalauréat, animation de clubs (sciences, débat, code).", IMG["classroom"]),
    ("mali-volontariat-dogons-bandiagara", "Volontariat chez les Dogons de Bandiagara", "Bandiagara (falaise)", 18, 55, 350, "3 à 8 semaines", ["SOCI","EDU"],
     "Immersion dans les villages accrochés à la falaise de Bandiagara. Appui aux écoles rurales, à la préservation des greniers Toguna et à la documentation orale du patrimoine cosmogonique Dogon.", IMG["forest"]),
    ("mali-volontariat-bozos", "Bozos, pêcheurs du fleuve Niger", "Mopti / Konna", 18, 55, 360, "3 à 8 semaines", ["SOCI","ENV"],
     "Vie et travail auprès des Bozos, maîtres pêcheurs du Niger : sortie sur les pirogues, apprentissage du séchage du capitaine, appui à la scolarisation des enfants de pêcheurs et sensibilisation à la préservation halieutique.", IMG["desert_camels"]),
    ("mali-touaregs-education-gao", "Éducation des Touaregs au Nord", "Gao / Kidal", 21, 60, 330, "4 à 10 semaines", ["EDU","SOCI"],
     "Programme d'éducation itinérant auprès des enfants touaregs des campements du Nord : français, alphabétisation en tamasheq, hygiène et calcul, adapté au calendrier de transhumance.", IMG["language_class"]),
    ("mali-informatique-dogons-bozos", "Informatique pour Dogons et Bozos", "Bandiagara / Mopti", 21, 60, 500, "4 à 10 semaines", ["EDU","ENTR"],
     "Programme premium : installation de mini cyber-classes solaires à Bandiagara et Mopti. Initiation informatique et Internet pour les jeunes de 12 à 25 ans. Le montant finance le matériel (portables reconditionnés + solaire).", IMG["digital_youth"]),
    ("mali-tourisme-solidaire", "Tourisme solidaire — accueil en famille", "Ségou / Djenné", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
     "Court séjour d'immersion en famille malienne : marché, cérémonies, veillées de contes bambaras, visite des rives du Niger. Une manière authentique de voyager qui rémunère directement les familles hôtes.", IMG["backpacker"]),
    ("mali-cuisine-malienne", "Apprentissage de la cuisine malienne", "Bamako", 18, 70, 220, "1 à 3 semaines", ["SOCI","ENTR"],
     "Ateliers guidés autour du Tô au gombo, du Riz au gras, du Poulet Yassa et du Capitaine à la Bamako. Marché du matin, préparation, dégustation et transmission des secrets culinaires transmis de mère en fille.", IMG["african_food"]),
])

# ============================================================================
# NIGERIA — 14 projets
# ============================================================================
CM_NG = C["nigeria"]; FNG = "🇳🇬"
NIGERIA = _build(CM_NG, FNG, [
    ("nigeria-digues-delta", "Renfort des digues du delta du Niger", "Yenagoa (Bayelsa)", 18, 60, 340, "3 à 6 semaines", ["ENV","SOCI"],
     "Le delta du Niger subit à la fois montée des eaux et pollutions pétrolières. Chantiers de protection des berges, plantation de mangrove et sensibilisation communautaire à la préservation des voies d'eau.", IMG["water_nature"]),
    ("nigeria-habitat-nord-kano", "Réhabilitation d'habitats traditionnels au nord", "Kano", 18, 60, 320, "2 à 6 semaines", ["ENV","SOCI"],
     "Restauration d'habitats en terre crue haoussa (soko) dans la vieille ville de Kano : réfection des murs, teintures traditionnelles à l'indigo et transmission des techniques de construction bioclimatique du Sahel.", IMG["compost"]),
    ("nigeria-inondations-lagos", "Réponse aux inondations à Lagos", "Lagos (Makoko, Ajegunle)", 18, 60, 350, "2 à 4 semaines", ["SOCI","SANT"],
     "Aide aux quartiers lagunaires régulièrement inondés de Lagos : distribution alimentaire, appui aux écoles surélevées et sensibilisation aux maladies hydriques dans le quartier flottant de Makoko.", IMG["hands_together"]),
    ("nigeria-inondations-port-harcourt", "Aide aux inondations à Port Harcourt", "Port Harcourt (Rivers)", 18, 60, 330, "2 à 4 semaines", ["ENV","SANT"],
     "Rivers State est ravagée par les crues du Niger. Recensement des sinistrés, points d'eau potable, remise en état des dispensaires et appui aux comités communautaires de gestion des risques.", IMG["field_sunset"]),
    ("nigeria-accueil-deplaces-maiduguri", "Accueil des déplacés du Nord-Est", "Maiduguri (Borno)", 21, 60, 310, "3 à 8 semaines", ["SOCI"],
     "Appui aux camps de déplacés de la crise sécuritaire du bassin du lac Tchad. Animation d'espaces enfants, soutien administratif, médiation communautaire et sensibilisation à la santé mentale.", IMG["exchange"]),
    ("nigeria-recherche-origines-yoruba-igbo", "Recherche des origines — Yoruba, Igbo, Haoussa", "Ibadan / Enugu / Kano", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
     "Accompagnement de descendants de la diaspora (Amériques, Caraïbes, Europe) sur les traces de leurs ancêtres yoruba, igbo ou haoussa : archives, visites de villages, rencontres avec les chefs traditionnels et documentation photo/vidéo.", IMG["business_plan"]),
    ("nigeria-familles-accueil", "Réseau de familles d'accueil", "Lagos, Ibadan, Enugu, Kano", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
     "Suivi du réseau des familles d'accueil nigérianes — hospitalité proverbiale, immersion linguistique (yoruba, igbo, haoussa) et sécurité assurée grâce à un référent local.", IMG["kids_play"]),
    ("nigeria-federal-college-lagos", "Enseignement au Federal Government College", "Lagos", 21, 60, 300, "4 à 12 semaines", ["EDU"],
     "Cours d'appui en français langue étrangère, mathématiques et informatique. Co-animation avec les professeurs, préparation aux WAEC, animation d'un club de code et d'un club de débat.", IMG["classroom"]),
    ("nigeria-volontariat-minorites-nok", "Volontariat auprès des minorités du Plateau", "Jos (Plateau)", 18, 55, 350, "3 à 8 semaines", ["SOCI","EDU"],
     "Immersion auprès des communautés minoritaires du Plateau (Ham, Berom, Nok) : appui aux écoles rurales, dialogue interethnique et documentation du patrimoine archéologique de la culture Nok.", IMG["forest"]),
    ("nigeria-fulani-plateau", "Bergers Fulani/Peuls du Plateau", "Plateau / Kaduna", 18, 55, 360, "3 à 8 semaines", ["SOCI"],
     "Vie et travail auprès des bergers peuls transhumants : accompagnement du bétail, santé vétérinaire, points d'eau et médiation avec les communautés agricoles voisines pour prévenir les conflits.", IMG["desert_camels"]),
    ("nigeria-education-peuls-sokoto", "Éducation des Peuls du Nord", "Sokoto / Kebbi", 21, 60, 330, "4 à 10 semaines", ["EDU","SOCI"],
     "Programme d'éducation itinérant pour les enfants peuls transhumants : français/anglais, fulfulde écrit, calcul et santé, adapté au rythme de transhumance saharo-sahélienne.", IMG["language_class"]),
    ("nigeria-informatique-minorites", "Informatique pour Peuls et communautés du Delta", "Sokoto / Bayelsa", 21, 60, 500, "4 à 10 semaines", ["EDU","ENTR"],
     "Programme premium : cyber-classes solaires dans deux communautés peules (nord) et deux communautés du Delta (sud). Initiation à l'ordinateur, à Internet, à la bureautique. Le budget finance le matériel.", IMG["digital_youth"]),
    ("nigeria-tourisme-solidaire", "Tourisme solidaire — accueil en famille", "Calabar / Ibadan", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
     "Court séjour d'immersion dans une famille nigériane : cuisine yoruba ou efik, marchés colorés, festivals locaux (Osun-Osogbo, Carnaval de Calabar). Une expérience authentique qui rémunère les hôtes.", IMG["backpacker"]),
    ("nigeria-cuisine-nigeriane", "Apprentissage de la cuisine nigériane", "Lagos / Ibadan", 18, 70, 220, "1 à 3 semaines", ["SOCI","ENTR"],
     "Ateliers autour du Jollof rice, de l'Egusi soup, du Suya et du Pounded yam. Marché matinal, cuisine guidée par une cheffe locale, dégustation et découverte du patrimoine culinaire pluriel du Nigeria.", IMG["african_food"]),
])

# ============================================================================
# SÉNÉGAL — 14 projets
# ============================================================================
CM_SN = C["senegal"]; FSN = "🇸🇳"
SENEGAL = _build(CM_SN, FSN, [
    ("senegal-digues-delta-saloum", "Renfort des digues du Delta du Saloum", "Foundiougne / Djifer", 18, 60, 340, "3 à 6 semaines", ["ENV","SOCI"],
     "Delta du Saloum classé UNESCO : renforcement des digues anti-sel, plantation de mangrove et sensibilisation des villages insulaires à la préservation des bolongs.", IMG["water_nature"]),
    ("senegal-cases-casamance", "Construction de cases traditionnelles en Casamance", "Ziguinchor / Oussouye", 18, 60, 320, "2 à 6 semaines", ["ENV","SOCI"],
     "Chantier de restauration des cases à impluvium diola en pisé et pans de bois. Apprentissage des techniques ancestrales avec les maîtres bâtisseurs de la Basse-Casamance.", IMG["compost"]),
    ("senegal-inondations-dakar", "Réponse aux inondations de la banlieue de Dakar", "Guédiawaye / Pikine", 18, 60, 350, "2 à 4 semaines", ["SOCI","SANT"],
     "Banlieues de Dakar régulièrement inondées : distribution alimentaire, pompage, kits d'hygiène et appui aux écoles primaires touchées.", IMG["hands_together"]),
    ("senegal-inondations-kaolack", "Aide aux inondations de Kaolack", "Kaolack", 18, 60, 330, "2 à 4 semaines", ["SOCI","SANT"],
     "Kaolack subit chaque hivernage la remontée du fleuve Saloum. Recensement des sinistrés, points d'eau potable et appui aux dispensaires de quartier.", IMG["field_sunset"]),
    ("senegal-accueil-deplaces-climatiques", "Accueil des déplacés climatiques", "Saint-Louis", 18, 60, 310, "3 à 8 semaines", ["SOCI","ENV"],
     "Saint-Louis, ville patrimoine, voit sa Langue de Barbarie disparaître sous les eaux : accompagnement des familles relogées, appui administratif et sensibilisation aux enjeux climatiques.", IMG["exchange"]),
    ("senegal-recherche-origines", "Recherche des origines — diaspora sérère et wolof", "Dakar / Thiès", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
     "Programme pour la diaspora sénégalaise : archives, visites de villages sérères et wolof, rencontres avec les Cadors et les griots dépositaires de la mémoire familiale.", IMG["business_plan"]),
    ("senegal-familles-accueil", "Réseau de familles d'accueil", "Dakar, Thiès, Saint-Louis", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
     "La « Teranga » (hospitalité) est au cœur du séjour : suivi des familles d'accueil et formation interculturelle pour une immersion réussie.", IMG["kids_play"]),
    ("senegal-lycee-blaise-diagne", "Enseignement au Lycée Blaise Diagne", "Dakar", 21, 60, 300, "4 à 12 semaines", ["EDU"],
     "Cours d'appui en français, mathématiques et informatique, préparation au Baccalauréat et animation d'un club numérique dans l'un des lycées historiques de Dakar.", IMG["classroom"]),
    ("senegal-volontariat-diolas-casamance", "Volontariat chez les Diolas de Casamance", "Oussouye / Cap Skirring", 18, 55, 350, "3 à 8 semaines", ["SOCI","EDU"],
     "Immersion dans les villages diolas de Basse-Casamance : appui aux écoles rurales, riziculture et préservation des bois sacrés animistes.", IMG["forest"]),
    ("senegal-peuls-ferlo", "Peuls du Ferlo — bergers nomades", "Ferlo (Linguère / Ranérou)", 18, 55, 360, "3 à 8 semaines", ["SOCI","ENV"],
     "Vie auprès des bergers peuls du Ferlo semi-désertique : accompagnement du bétail, forages et sensibilisation à la préservation des pâturages.", IMG["desert_camels"]),
    ("senegal-education-peuls-ferlo", "Éducation des Peuls du Ferlo", "Linguère", 21, 60, 330, "4 à 10 semaines", ["EDU","SOCI"],
     "Programme éducatif itinérant pour les enfants peuls du Ferlo : français, alphabétisation en pulaar et calcul, adapté au calendrier de transhumance.", IMG["language_class"]),
    ("senegal-informatique-diolas-peuls", "Informatique pour Diolas et Peuls", "Casamance / Ferlo", 21, 60, 500, "4 à 10 semaines", ["EDU","ENTR"],
     "Programme premium : cyber-classes solaires à Oussouye (Diolas) et Linguère (Peuls). Initiation à l'ordinateur et à Internet. Le budget finance le matériel.", IMG["digital_youth"]),
    ("senegal-tourisme-solidaire", "Tourisme solidaire — accueil en famille", "Sine-Saloum / Île de Gorée", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
     "Court séjour d'immersion chez une famille sénégalaise : pirogue au Saloum, cérémonies du thé, marchés colorés et visite mémorielle de l'île de Gorée.", IMG["backpacker"]),
    ("senegal-cuisine-senegalaise", "Apprentissage de la cuisine sénégalaise", "Dakar", 18, 70, 220, "1 à 3 semaines", ["SOCI","ENTR"],
     "Ateliers autour du Thieboudienne, du Yassa poulet, du Mafé et du Bissap. Marché de Sandaga au petit matin, préparation guidée et grande tablée collective.", IMG["african_food"]),
])

# ============================================================================
# MAROC — 14 projets
# ============================================================================
CM_MA = C["maroc"]; FMA = "🇲🇦"
MAROC = _build(CM_MA, FMA, [
    ("maroc-digues-beni-mellal", "Gestion des crues à Beni Mellal", "Beni Mellal", 18, 60, 340, "3 à 6 semaines", ["ENV","SOCI"],
     "Beni Mellal est frappée par des crues éclair au pied de l'Atlas. Renfort des digues, curage des oueds et sensibilisation communautaire aux gestes de mise à l'abri.", IMG["water_nature"]),
    ("maroc-habitats-pise-ouarzazate", "Rénovation d'habitats en pisé à Ouarzazate", "Ouarzazate / Aït Ben Haddou", 18, 60, 320, "2 à 6 semaines", ["ENV","SOCI"],
     "Restauration de kasbahs en pisé menacées d'effondrement, notamment autour de l'Aït Ben Haddou (UNESCO), aux côtés des maîtres artisans berbères.", IMG["compost"]),
    ("maroc-inondations-casablanca", "Réponse aux inondations à Casablanca", "Casablanca (banlieue)", 18, 60, 350, "2 à 4 semaines", ["SOCI","SANT"],
     "Aide aux quartiers casablancais touchés par les crues de l'oued Bouskoura : distribution alimentaire, pompage et appui médical léger.", IMG["hands_together"]),
    ("maroc-secheresse-zagora", "Lutte contre la sécheresse à Zagora", "Zagora / vallée du Drâa", 18, 60, 330, "2 à 4 semaines", ["ENV","SOCI"],
     "Vallée du Drâa asséchée : appui aux khettaras (galeries souterraines d'irrigation), forages manuels et sensibilisation à l'agroécologie oasienne.", IMG["field_sunset"]),
    ("maroc-accueil-migrants-rabat", "Accueil des migrants subsahariens à Rabat", "Rabat / Casablanca", 21, 60, 310, "3 à 8 semaines", ["SOCI","SANT"],
     "Appui aux structures d'accueil pour migrants subsahariens en transit : cours de darija, aide administrative pour la régularisation et médiation avec les services sociaux.", IMG["exchange"]),
    ("maroc-recherche-origines-amazigh", "Recherche des origines — diaspora amazighe", "Marrakech / Agadir", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
     "Programme pour la diaspora amazighe (Berbère) souhaitant retrouver ses villages ancestraux dans l'Atlas, le Rif ou le Souss : archives, généalogies orales et rencontres avec les Amghars.", IMG["business_plan"]),
    ("maroc-familles-accueil", "Réseau de familles d'accueil", "Marrakech, Fès, Rabat", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
     "Suivi du réseau de familles d'accueil marocaines : hospitalité légendaire, immersion en darija et découverte du quotidien de la médina.", IMG["kids_play"]),
    ("maroc-lycee-rabat", "Enseignement dans un lycée public de Rabat", "Rabat", 21, 60, 300, "4 à 12 semaines", ["EDU"],
     "Renfort pédagogique en français, mathématiques et informatique dans un lycée public : préparation au Bac marocain, co-animation avec les enseignants et clubs scolaires.", IMG["classroom"]),
    ("maroc-volontariat-amazighs-atlas", "Volontariat chez les Amazighs de l'Atlas", "Haut Atlas (Imlil / Aït Bougmez)", 18, 55, 350, "3 à 8 semaines", ["SOCI","EDU"],
     "Immersion dans les villages berbères de l'Atlas : appui aux écoles rurales isolées, chantiers de rénovation et documentation du patrimoine oral tamazight.", IMG["forest"]),
    ("maroc-sahraouis-laayoune", "Séjour auprès des Sahraouis du Sud", "Laâyoune / Dakhla", 18, 55, 360, "3 à 8 semaines", ["SOCI"],
     "Vie auprès des tribus sahraouies : cérémonie du thé, tradition orale hassaniya, appui à l'artisanat du désert et sensibilisation environnementale sur la côte atlantique.", IMG["desert_camels"]),
    ("maroc-education-amazighs", "Éducation dans les villages amazighs", "Haut Atlas / Rif", 21, 60, 330, "4 à 10 semaines", ["EDU","SOCI"],
     "Programme éducatif dans les écoles de montagne : français, alphabétisation en tamazight (Tifinagh), calcul et hygiène. Une réponse au décrochage scolaire des zones enclavées.", IMG["language_class"]),
    ("maroc-informatique-amazighs-sahraouis", "Informatique pour Amazighs et Sahraouis", "Atlas / Sahara", 21, 60, 500, "4 à 10 semaines", ["EDU","ENTR"],
     "Programme premium : cyber-classes solaires dans deux villages de l'Atlas et deux campements sahraouis. Initiation à l'ordinateur et à Internet, matériel inclus.", IMG["digital_youth"]),
    ("maroc-tourisme-solidaire", "Tourisme solidaire — accueil en famille", "Marrakech / Chefchaouen", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
     "Court séjour chez une famille marocaine : médina, souks, hammam, cuisine partagée. Une immersion qui rémunère directement les familles hôtes.", IMG["backpacker"]),
    ("maroc-cuisine-marocaine", "Apprentissage de la cuisine marocaine", "Fès / Marrakech", 18, 70, 220, "1 à 3 semaines", ["SOCI","ENTR"],
     "Ateliers autour du Tajine, du Couscous du vendredi, de la Pastilla et des pâtisseries au miel. Marché aux épices, préparation guidée et grande table partagée.", IMG["african_food"]),
])

# ============================================================================
# BÉNIN — 14 projets
# ============================================================================
CM_BJ = C["benin"]; FBJ = "🇧🇯"
BENIN = _build(CM_BJ, FBJ, [
    ("benin-digues-lac-nokoue", "Protection du lac Nokoué à Ganvié", "Ganvié / So-Ava", 18, 60, 340, "3 à 6 semaines", ["ENV","SOCI"],
     "Ganvié, la « Venise africaine » : renfort des digues et pilotis autour du village lacustre, sensibilisation à la préservation du lac Nokoué contre la jacinthe d'eau.", IMG["water_nature"]),
    ("benin-cases-somba-boukoumbe", "Restauration des Tata Somba à Boukoumbé", "Boukoumbé (Atacora)", 18, 60, 320, "2 à 6 semaines", ["ENV","SOCI"],
     "Chantier auprès des maîtres bâtisseurs Somba pour restaurer les célèbres tata (habitats-forteresses en terre) de la région de Boukoumbé, candidate au patrimoine UNESCO.", IMG["compost"]),
    ("benin-inondations-cotonou", "Réponse aux inondations à Cotonou", "Cotonou", 18, 60, 350, "2 à 4 semaines", ["SOCI","SANT"],
     "Aide aux quartiers de Cotonou touchés par la montée des eaux : distribution alimentaire, pompage, remise en état des écoles et sensibilisation au paludisme post-crue.", IMG["hands_together"]),
    ("benin-inondations-porto-novo", "Aide aux inondations à Porto-Novo", "Porto-Novo", 18, 60, 330, "2 à 4 semaines", ["SOCI","SANT"],
     "Réponse humanitaire dans la capitale à la crue du fleuve Ouémé : recensement des sinistrés, kits d'hygiène et appui aux dispensaires.", IMG["field_sunset"]),
    ("benin-accueil-vidomegon", "Accueil et protection des enfants Vidomègon", "Cotonou / Abomey", 21, 60, 310, "3 à 8 semaines", ["SOCI","SANT"],
     "Appui aux ONG qui luttent contre le placement domestique abusif des enfants (Vidomègon) : réinsertion scolaire, accompagnement psycho-social et sensibilisation communautaire.", IMG["exchange"]),
    ("benin-recherche-origines-ouidah", "Recherche des origines — routes de l'esclavage", "Ouidah / Abomey", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
     "Pour la diaspora afro-descendante des Amériques : parcours mémoriel de la « Route des esclaves » de Ouidah, archives et rencontres avec les prêtres vodouns.", IMG["business_plan"]),
    ("benin-familles-accueil", "Réseau de familles d'accueil", "Cotonou, Abomey, Natitingou", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
     "Suivi des familles hôtes qui accueillent les volontaires — l'hospitalité béninoise dans son quotidien, avec un référent local en cas de besoin.", IMG["kids_play"]),
    ("benin-lycee-cotonou", "Enseignement au Lycée technique de Cotonou", "Cotonou", 21, 60, 300, "4 à 12 semaines", ["EDU"],
     "Renfort en français, mathématiques et informatique dans un lycée technique de Cotonou. Préparation au BEPC et au Baccalauréat, clubs numériques et bibliothèque scolaire.", IMG["classroom"]),
    ("benin-volontariat-sombas-atacora", "Volontariat chez les Sombas de l'Atacora", "Atacora (Natitingou)", 18, 55, 350, "3 à 8 semaines", ["SOCI","EDU"],
     "Immersion auprès des Somba (Betamaribe) : appui aux écoles rurales, aide à la conservation des tata et documentation du patrimoine oral.", IMG["forest"]),
    ("benin-peuls-bororo-nord", "Peuls Bororo du nord Bénin", "Alibori / Borgou", 18, 55, 360, "3 à 8 semaines", ["SOCI","ENV"],
     "Vie auprès des Peuls Bororo transhumants du nord Bénin : accompagnement du bétail, forages, santé vétérinaire et médiation avec les cultivateurs sédentaires.", IMG["desert_camels"]),
    ("benin-education-sombas", "Éducation dans les villages Sombas", "Atacora", 21, 60, 330, "4 à 10 semaines", ["EDU","SOCI"],
     "Programme éducatif dans les écoles reculées de l'Atacora : français, alphabétisation, calcul et hygiène, avec des enseignants locaux passionnés.", IMG["language_class"]),
    ("benin-informatique-sombas-peuls", "Informatique pour Sombas et Peuls", "Natitingou / Kandi", 21, 60, 500, "4 à 10 semaines", ["EDU","ENTR"],
     "Programme premium : cyber-classes solaires à Natitingou (Sombas) et Kandi (Peuls). Initiation à l'ordinateur et à Internet, matériel inclus.", IMG["digital_youth"]),
    ("benin-tourisme-solidaire", "Tourisme solidaire — accueil en famille", "Ouidah / Ganvié", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
     "Court séjour chez une famille béninoise : pirogue à Ganvié, marché de Dantokpa, cérémonies vodoun et cuisine locale.", IMG["backpacker"]),
    ("benin-cuisine-beninoise", "Apprentissage de la cuisine béninoise", "Cotonou / Ouidah", 18, 70, 220, "1 à 3 semaines", ["SOCI","ENTR"],
     "Ateliers autour de l'Amiwo (pâte de maïs à la sauce), du Wagassi (fromage peul), du poisson braisé et des sauces gombo. Marchés, préparation et dégustation.", IMG["african_food"]),
])

# ============================================================================
# BURKINA FASO — 14 projets
# ============================================================================
CM_BF = C["burkina-faso"]; FBF = "🇧🇫"
BURKINA = _build(CM_BF, FBF, [
    ("burkina-faso-digues-nakambe", "Renfort des berges du Nakambé", "Ouagadougou / Bagré", 18, 60, 340, "3 à 6 semaines", ["ENV","SOCI"],
     "Consolidation des berges du fleuve Nakambé (Volta Blanche) pour limiter les crues autour de Ouagadougou et du barrage de Bagré.", IMG["water_nature"]),
    ("burkina-faso-cases-tiebele", "Cases peintes de Tiébélé", "Tiébélé (Cour royale Kassena)", 18, 60, 320, "2 à 6 semaines", ["ENV","SOCI"],
     "Chantier de rénovation des cases rondes en banco de Tiébélé, célèbres pour leurs peintures géométriques Kassena — un joyau à préserver.", IMG["compost"]),
    ("burkina-faso-inondations-ouaga", "Réponse aux inondations à Ouagadougou", "Ouagadougou (non-lotis)", 18, 60, 350, "2 à 4 semaines", ["SOCI","SANT"],
     "Aide d'urgence dans les quartiers non lotis de Ouaga, régulièrement inondés à chaque hivernage : distribution alimentaire, kits d'hygiène et remise en état des écoles.", IMG["hands_together"]),
    ("burkina-faso-secheresse-dori", "Lutte contre la sécheresse au Sahel", "Dori (Sahel)", 18, 60, 330, "2 à 4 semaines", ["ENV","SOCI"],
     "Région sahélienne frappée par la désertification et l'insécurité : forages manuels, cordons pierreux et sensibilisation à l'agroécologie sahélienne (zaï, demi-lunes).", IMG["field_sunset"]),
    ("burkina-faso-accueil-deplaces", "Accueil des déplacés internes", "Kaya / Fada N'Gourma", 21, 60, 310, "3 à 8 semaines", ["SOCI"],
     "Appui aux camps de déplacés de la crise sécuritaire : animation d'espaces enfants, soutien administratif, médiation communautaire et sensibilisation à la santé mentale.", IMG["exchange"]),
    ("burkina-faso-recherche-origines", "Recherche des origines — diaspora mossi", "Ouagadougou / Ouahigouya", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
     "Programme pour la diaspora burkinabé : archives des royaumes mossi, généalogies orales et rencontres avec les Naaba (chefs traditionnels).", IMG["business_plan"]),
    ("burkina-faso-familles-accueil", "Réseau de familles d'accueil", "Ouaga, Bobo, Koudougou", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
     "Suivi des familles hôtes burkinabé — hospitalité chaleureuse, immersion en mooré ou dioula et référent local pour un séjour serein.", IMG["kids_play"]),
    ("burkina-faso-lycee-zinda-kabore", "Enseignement au Lycée Zinda Kaboré", "Ouagadougou", 21, 60, 300, "4 à 12 semaines", ["EDU"],
     "Renfort pédagogique en français, mathématiques et informatique. Co-animation, préparation au Bac et clubs scolaires dans un lycée public historique.", IMG["classroom"]),
    ("burkina-faso-volontariat-peuls-nord", "Volontariat chez les Peuls du Nord", "Djibo / Dori", 18, 55, 350, "3 à 8 semaines", ["SOCI","EDU"],
     "Immersion auprès des communautés peules du Sahel burkinabé : appui aux écoles nomades, santé vétérinaire et sensibilisation à la scolarisation des filles.", IMG["forest"]),
    ("burkina-faso-bissa-gourmantche", "Bissa et Gourmantché de l'Est", "Fada N'Gourma / Diapaga", 18, 55, 360, "3 à 8 semaines", ["SOCI"],
     "Vie auprès des Bissa et Gourmantché de l'Est burkinabé : appui aux coopératives agricoles, transmission des savoirs et documentation du patrimoine.", IMG["desert_camels"]),
    ("burkina-faso-education-peuls-sahel", "Éducation des Peuls du Sahel", "Djibo / Gorom-Gorom", 21, 60, 330, "4 à 10 semaines", ["EDU","SOCI"],
     "Programme éducatif itinérant pour les enfants peuls du Sahel : français, alphabétisation en fulfulde, calcul et hygiène adaptés à la transhumance.", IMG["language_class"]),
    ("burkina-faso-informatique-peuls-bissa", "Informatique pour Peuls et Bissa", "Djibo / Fada N'Gourma", 21, 60, 500, "4 à 10 semaines", ["EDU","ENTR"],
     "Programme premium : cyber-classes solaires à Djibo (Peuls) et Fada N'Gourma (Bissa). Initiation à l'ordinateur et à Internet, matériel inclus.", IMG["digital_youth"]),
    ("burkina-faso-tourisme-solidaire", "Tourisme solidaire — accueil en famille", "Bobo-Dioulasso / Banfora", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
     "Court séjour d'immersion chez une famille burkinabé : marchés colorés, festivals du masque (Dédougou), cascades de Banfora et cuisine locale.", IMG["backpacker"]),
    ("burkina-faso-cuisine-burkinabe", "Apprentissage de la cuisine burkinabé", "Ouagadougou / Bobo", 18, 70, 220, "1 à 3 semaines", ["SOCI","ENTR"],
     "Ateliers autour du Tô (pâte de mil ou de maïs), du Riz gras, du Poulet bicyclette et des sauces d'oseille. Marchés, préparation guidée et grande tablée conviviale.", IMG["african_food"]),
])

# ============================================================================
# NIGER — 14 projets
# ============================================================================
CM_NE = C["niger"]; FNE = "🇳🇪"
NIGER = _build(CM_NE, FNE, [
    ("niger-digues-niamey", "Renfort des digues du fleuve Niger à Niamey", "Niamey", 18, 60, 340, "3 à 6 semaines", ["ENV","SOCI"],
     "Niamey vit chaque année la crue du fleuve Niger. Renforcement des digues, comités d'alerte précoce et sensibilisation des quartiers rive gauche.", IMG["water_nature"]),
    ("niger-tentes-touaregues", "Camp nomade touareg — Aïr", "Agadez / Aïr", 18, 60, 320, "2 à 6 semaines", ["ENV","SOCI"],
     "Chantier participatif autour des tentes nomades (ehen) touarègues : tissage de nattes, réparation des supports et immersion dans la vie du désert.", IMG["compost"]),
    ("niger-inondations-niamey", "Réponse aux inondations à Niamey", "Niamey (rive gauche)", 18, 60, 350, "2 à 4 semaines", ["SOCI","SANT"],
     "Aide humanitaire dans les quartiers Kirkissoye et Saguia inondés : distribution alimentaire, kits d'hygiène et appui aux écoles primaires.", IMG["hands_together"]),
    ("niger-secheresse-zinder", "Sécheresse dans la région de Zinder", "Zinder / Tanout", 18, 60, 330, "2 à 4 semaines", ["ENV","SOCI"],
     "Forages manuels, sensibilisation à l'agroécologie sahélienne et appui aux banques céréalières face à la sécheresse chronique du Niger central.", IMG["field_sunset"]),
    ("niger-accueil-deplaces-diffa", "Accueil des déplacés du Diffa", "Diffa", 21, 60, 310, "3 à 8 semaines", ["SOCI","SANT"],
     "Camps de déplacés de la crise du lac Tchad : animation d'espaces enfants, appui administratif, sensibilisation santé et médiation communautaire.", IMG["exchange"]),
    ("niger-recherche-origines-haoussa-zarma", "Recherche des origines — Haoussa & Zarma", "Niamey / Zinder", 18, 60, 290, "2 à 4 semaines", ["SOCI"],
     "Programme pour la diaspora nigérienne : archives sultaniques, généalogies orales et rencontres avec les Sarkin (chefs traditionnels) haoussa et zarma.", IMG["business_plan"]),
    ("niger-familles-accueil", "Réseau de familles d'accueil", "Niamey, Zinder, Agadez", 18, 60, 260, "2 à 12 semaines", ["SOCI"],
     "Suivi des familles hôtes nigériennes — hospitalité, immersion en haoussa ou zarma et référent local pour la sécurité du séjour.", IMG["kids_play"]),
    ("niger-lycee-niamey", "Enseignement au Lycée d'Excellence de Niamey", "Niamey", 21, 60, 300, "4 à 12 semaines", ["EDU"],
     "Cours d'appui en français, mathématiques et informatique. Co-animation avec les enseignants du LEN, préparation au Baccalauréat et clubs scolaires.", IMG["classroom"]),
    ("niger-volontariat-touaregs-agadez", "Volontariat chez les Touaregs d'Agadez", "Agadez / Aïr", 18, 55, 350, "3 à 8 semaines", ["SOCI","EDU"],
     "Immersion dans les campements touaregs de la région de l'Aïr : appui aux écoles nomades, hygiène et documentation du patrimoine oral targui.", IMG["forest"]),
    ("niger-peuls-bororo-tanout", "Peuls Bororo — Tanout", "Tanout (Zinder)", 18, 55, 360, "3 à 8 semaines", ["SOCI","ENV"],
     "Vie auprès des Peuls Bororo Wodaabé, célèbres pour leur Gerewol : accompagnement du bétail, santé vétérinaire et documentation ethnographique respectueuse.", IMG["desert_camels"]),
    ("niger-education-bororo-transhumance", "Éducation itinérante Bororo", "Nord Zinder / Diffa", 21, 60, 330, "4 à 10 semaines", ["EDU","SOCI"],
     "Programme d'éducation itinérant qui suit les campements Bororo : français, alphabétisation en fulfulde, calcul et hygiène.", IMG["language_class"]),
    ("niger-informatique-touaregs-bororo", "Informatique pour Touaregs et Bororo", "Agadez / Tanout", 21, 60, 500, "4 à 10 semaines", ["EDU","ENTR"],
     "Programme premium : cyber-classes solaires à Agadez (Touaregs) et Tanout (Bororo). Initiation à l'ordinateur et à Internet, matériel inclus.", IMG["digital_youth"]),
    ("niger-tourisme-solidaire", "Tourisme solidaire — accueil en famille", "Zinder / Agadez", 18, 70, 200, "1 à 4 semaines", ["SOCI"],
     "Court séjour chez une famille nigérienne : sultanat de Zinder, vieille ville d'Agadez, marchés au chameau et thé nomade.", IMG["backpacker"]),
    ("niger-cuisine-nigerienne", "Apprentissage de la cuisine nigérienne", "Niamey", 18, 70, 220, "1 à 3 semaines", ["SOCI","ENTR"],
     "Ateliers autour du Djerma djerma, du Riz gras, du Kilishi (viande séchée épicée) et des beignets de mil. Marchés, préparation guidée et grande tablée.", IMG["african_food"]),
])


PROJECTS = CAMEROUN + MALI + NIGERIA + SENEGAL + MAROC + BENIN + BURKINA + NIGER


# ============================================================================
# COURS DE LANGUES — inchangés (24 cours, 3 par pays)
# ============================================================================
def _co(country, flag, slug, language, city, age_min, amount, session, teaching, desc, schedule, img):
    return {
        "slug": slug, "country": country["name"], "country_slug": country["slug"], "flag": flag,
        "language": language, "title": f"{country['name']} : Cours de {language} à {city}",
        "city": city, "age_min": age_min, "age_label": f"{age_min} ans et +",
        "amount": float(amount), "currency": "eur", "session": session, "teaching": teaching,
        "description": desc, "schedule": schedule, "image": img,
        "categories": ["LANG"], "type": "course",
    }


COURSES = [
    _co(CM, FCM, "cameroun-ewondo-yaounde", "Ewondo", "Yaoundé", 16, 220, "Session 4 semaines", "Français + Ewondo",
        "Apprentissage de l'ewondo, langue du peuple Beti, à travers l'immersion quotidienne et la vie en famille d'accueil à Yaoundé.",
        ["Semaines 1-2 : alphabet, phonétique, salutations, vie quotidienne (2h/jour, 9h-11h).",
         "Semaines 3-4 : conversation, expressions culturelles, mise en pratique au marché et en famille d'accueil.",
         "Examen oral final le vendredi de la 4e semaine."], IMG["language_class"]),
    _co(CM, FCM, "cameroun-duala-douala", "Duala", "Douala", 16, 220, "Session 4 semaines", "Français + Duala",
        "Découverte du duala, langue côtière du Cameroun, mêlant grammaire, chants traditionnels et sorties culturelles.",
        ["Semaine 1 : bases grammaticales et vocabulaire courant (2h/jour, 14h-16h).",
         "Semaines 2-3 : dialogues pratiques, chants traditionnels, sorties culturelles guidées.",
         "Semaine 4 : immersion complète avec familles duala et restitution finale."], IMG["classroom"]),
    _co(CM, FCM, "cameroun-feefee-bafoussam", "Fe'efe'e (Bamiléké)", "Bafoussam", 16, 200, "Session 3 semaines", "Français + Fe'efe'e",
        "Cours intensif de fe'efe'e, langue bamiléké de l'Ouest, avec pratique guidée sur les marchés locaux.",
        ["Cours intensif 3h/jour (9h-12h), du lundi au vendredi.",
         "Semaine 1 : phonétique et salutations.", "Semaine 2 : vocabulaire de la vie courante et proverbes.",
         "Semaine 3 : conversation et visite de marchés locaux avec pratique guidée."], IMG["market_stalls"]),
    _co(CM_ML, FML, "mali-bambara-bamako", "Bambara", "Bamako", 16, 210, "Session 4 semaines", "Français + Bambara",
        "Le bambara, langue véhiculaire du Mali, enseigné du quotidien jusqu'à la conversation courante au grand marché de Bamako.",
        ["Cours 2h/jour (8h-10h), lundi-vendredi.", "Semaines 1-2 : alphabet, chiffres, salutations.",
         "Semaines 3-4 : conversation courante, expressions imagées, sortie pratique au grand marché de Bamako."], IMG["language_class"]),
    _co(CM_ML, FML, "mali-fulfulde-mopti", "Fulfulde (Peul)", "Mopti", 16, 210, "Session 4 semaines", "Français + Fulfulde",
        "Immersion dans le fulfulde peul, du vocabulaire pastoral à la vie villageoise, avec séjour en familles peules.",
        ["2h/jour (16h-18h).", "Semaine 1 : phonétique et politesse.",
         "Semaines 2-3 : vocabulaire pastoral et vie villageoise.",
         "Semaine 4 : immersion chez des familles peules, restitution orale."], IMG["classroom"]),
    _co(CM_ML, FML, "mali-songhai-gao", "Songhaï", "Gao", 18, 230, "Session 3 semaines", "Français + Songhaï",
        "Cours de songhaï en petit groupe autour de la culture du fleuve Niger et de la pêche.",
        ["3h/jour (9h-12h) en petit groupe.", "Semaine 1 : bases linguistiques.",
         "Semaine 2 : expressions liées au fleuve Niger et à la pêche.",
         "Semaine 3 : conversation avancée et sortie culturelle."], IMG["water_nature"]),
    _co(CM_NG, FNG, "nigeria-yoruba-ibadan", "Yoruba", "Ibadan", 16, 240, "Session 4 semaines", "Anglais + Yoruba",
        "Apprentissage du yoruba (tons, proverbes) avec sortie au marché traditionnel Bodija d'Ibadan.",
        ["2h/jour (10h-12h).", "Semaines 1-2 : alphabet, tons, salutations.",
         "Semaines 3-4 : conversation, proverbes yoruba, sortie au marché traditionnel Bodija."], IMG["language_class"]),
    _co(CM_NG, FNG, "nigeria-igbo-enugu", "Igbo", "Enugu", 16, 240, "Session 4 semaines", "Anglais + Igbo",
        "Cours d'igbo axé sur les tons et le vocabulaire familial et commercial, ponctué par un festival culturel local.",
        ["2h/jour (14h-16h).", "Semaine 1 : phonétique et tons.",
         "Semaines 2-3 : vocabulaire familial et commercial.",
         "Semaine 4 : mise en pratique lors d'un festival culturel local."], IMG["students_study"]),
    _co(CM_NG, FNG, "nigeria-haoussa-kano", "Haoussa", "Kano", 18, 230, "Session 3 semaines", "Anglais + Haoussa",
        "Le haoussa du commerce et de l'artisanat, avec visite guidée des souks historiques de Kano.",
        ["3h/jour (9h-12h).", "Semaine 1 : alphabet et salutations.",
         "Semaine 2 : vocabulaire du commerce et de l'artisanat.",
         "Semaine 3 : conversation et visite guidée des souks de Kano."], IMG["market_stalls"]),
    _co(CM_SN, FSN, "senegal-wolof-dakar", "Wolof", "Dakar", 16, 220, "Session 4 semaines", "Français + Wolof",
        "Le wolof, langue la plus parlée du Sénégal, de l'alphabet à la conversation au marché Sandaga.",
        ["2h/jour (9h-11h).", "Semaines 1-2 : alphabet, salutations, chiffres.",
         "Semaines 3-4 : conversation, expressions courantes, sortie pratique au marché Sandaga."], IMG["language_class"]),
    _co(CM_SN, FSN, "senegal-pulaar-saint-louis", "Pulaar (Peul)", "Saint-Louis", 16, 210, "Session 4 semaines", "Français + Pulaar",
        "Immersion en pulaar autour du vocabulaire pastoral et familial, en milieu peul à Saint-Louis.",
        ["2h/jour (15h-17h).", "Semaine 1 : bases phonétiques.",
         "Semaines 2-3 : vocabulaire pastoral et familial.",
         "Semaine 4 : immersion en milieu peul, restitution orale finale."], IMG["classroom"]),
    _co(CM_SN, FSN, "senegal-serere-thies", "Sérère", "Thiès", 18, 210, "Session 3 semaines", "Français + Sérère",
        "Cours de sérère explorant le vocabulaire agricole et religieux traditionnel jusqu'à la conversation avancée.",
        ["3h/jour (9h-12h).", "Semaine 1 : alphabet et salutations.",
         "Semaine 2 : vocabulaire agricole et religieux traditionnel.",
         "Semaine 3 : conversation avancée."], IMG["students_study"]),
    _co(CM_MA, FMA, "maroc-darija-rabat", "Darija (arabe marocain)", "Rabat", 16, 250, "Session 4 semaines", "Français + Darija",
        "La darija du quotidien, de la négociation au souk à la conversation dans la médina de Rabat.",
        ["2h/jour (9h-11h).", "Semaines 1-2 : alphabet, salutations, expressions du quotidien.",
         "Semaines 3-4 : conversation, négociation au souk, sortie pratique dans la médina."], IMG["language_class"]),
    _co(CM_MA, FMA, "maroc-tamazight-marrakech", "Tamazight (Amazigh)", "Marrakech", 16, 240, "Session 4 semaines", "Français + Tamazight",
        "Le tamazight et l'alphabet Tifinagh, avec immersion dans un village de l'Atlas.",
        ["2h/jour (14h-16h).", "Semaine 1 : alphabet Tifinagh et phonétique.",
         "Semaines 2-3 : vocabulaire de la vie berbère (montagne, artisanat).",
         "Semaine 4 : immersion dans un village de l'Atlas."], IMG["pottery2"]),
    _co(CM_MA, FMA, "maroc-hassaniya-agadir", "Hassaniya", "Agadir", 18, 230, "Session 3 semaines", "Français + Hassaniya",
        "Cours de hassaniya autour de la culture nomade saharienne et de la rencontre avec des locuteurs natifs.",
        ["3h/jour (9h-12h).", "Semaine 1 : bases linguistiques.",
         "Semaine 2 : expressions sahariennes et culture nomade.",
         "Semaine 3 : conversation et rencontre avec des locuteurs natifs."], IMG["desert_camels"]),
    _co(CM_BJ, FBJ, "benin-fon-abomey", "Fon", "Abomey", 16, 210, "Session 4 semaines", "Français + Fon",
        "Le fon, langue majeure du Bénin, et la découverte des traditions royales d'Abomey.",
        ["2h/jour (9h-11h).", "Semaines 1-2 : alphabet, tons, salutations.",
         "Semaines 3-4 : conversation, découverte des traditions royales d'Abomey."], IMG["language_class"]),
    _co(CM_BJ, FBJ, "benin-yoruba-porto-novo", "Yoruba (Bénin)", "Porto-Novo", 16, 210, "Session 4 semaines", "Français + Yoruba",
        "Le yoruba du Bénin, de la phonétique aux proverbes, avec mise en pratique au marché de Porto-Novo.",
        ["2h/jour (15h-17h).", "Semaine 1 : phonétique.",
         "Semaines 2-3 : vocabulaire courant et proverbes.",
         "Semaine 4 : mise en pratique au marché de Porto-Novo."], IMG["market_stalls"]),
    _co(CM_BJ, FBJ, "benin-bariba-parakou", "Bariba", "Parakou", 18, 220, "Session 3 semaines", "Français + Bariba",
        "Cours de bariba autour du vocabulaire agricole et communautaire, avec locuteurs natifs.",
        ["3h/jour (9h-12h).", "Semaine 1 : bases linguistiques.",
         "Semaine 2 : vocabulaire agricole et communautaire.",
         "Semaine 3 : conversation avancée avec locuteurs natifs."], IMG["students_study"]),
    _co(CM_BF, FBF, "burkina-faso-moore-ouagadougou", "Mooré", "Ouagadougou", 16, 210, "Session 4 semaines", "Français + Mooré",
        "Le mooré, langue des Mossi, jusqu'à la conversation au grand marché de Ouagadougou.",
        ["2h/jour (9h-11h).", "Semaines 1-2 : alphabet, salutations, chiffres.",
         "Semaines 3-4 : conversation, sortie pratique au grand marché de Ouagadougou."], IMG["language_class"]),
    _co(CM_BF, FBF, "burkina-faso-dioula-bobo-dioulasso", "Dioula", "Bobo-Dioulasso", 16, 210, "Session 4 semaines", "Français + Dioula",
        "Le dioula du commerce, avec immersion pratique au marché central de Bobo-Dioulasso.",
        ["2h/jour (14h-16h).", "Semaine 1 : phonétique et politesse.",
         "Semaines 2-3 : vocabulaire commercial.",
         "Semaine 4 : immersion pratique au marché central."], IMG["market_stalls"]),
    _co(CM_BF, FBF, "burkina-faso-fulfulde-dori", "Fulfulde", "Dori", 18, 220, "Session 3 semaines", "Français + Fulfulde",
        "Cours de fulfulde autour du vocabulaire pastoral, avec immersion chez des familles peules.",
        ["3h/jour (9h-12h).", "Semaine 1 : bases linguistiques.",
         "Semaine 2 : vocabulaire pastoral.",
         "Semaine 3 : conversation et immersion chez des familles peules."], IMG["classroom"]),
    _co(CM_NE, FNE, "niger-haoussa-zinder", "Haoussa", "Zinder", 16, 210, "Session 4 semaines", "Français + Haoussa",
        "Le haoussa du quotidien, avec sortie pratique au marché de Zinder.",
        ["2h/jour (9h-11h).", "Semaines 1-2 : alphabet, salutations.",
         "Semaines 3-4 : conversation, sortie pratique au marché de Zinder."], IMG["language_class"]),
    _co(CM_NE, FNE, "niger-zarma-songhai-niamey", "Zarma-Songhaï", "Niamey", 16, 210, "Session 4 semaines", "Français + Zarma",
        "Le zarma-songhaï, du vocabulaire familial à l'immersion en famille d'accueil à Niamey.",
        ["2h/jour (15h-17h).", "Semaine 1 : phonétique.",
         "Semaines 2-3 : vocabulaire courant et familial.",
         "Semaine 4 : immersion en famille d'accueil à Niamey."], IMG["students_study"]),
    _co(CM_NE, FNE, "niger-tamasheq-agadez", "Tamasheq", "Agadez", 18, 230, "Session 3 semaines", "Français + Tamasheq",
        "Le tamasheq touareg et l'alphabet Tifinagh, autour du vocabulaire nomade et désertique.",
        ["3h/jour (9h-12h).", "Semaine 1 : bases linguistiques et alphabet Tifinagh.",
         "Semaine 2 : vocabulaire nomade et désertique.",
         "Semaine 3 : conversation avancée avec locuteurs touaregs."], IMG["desert_canyon"]),

    # --- LANGUES SUPPLÉMENTAIRES (2 de plus par pays → 5 langues par pays) ---
    # Cameroun
    _co(CM, FCM, "cameroun-bassa-edea", "Bassa", "Édéa", 16, 210, "Session 3 semaines", "Français + Bassa",
        "Le bassa, langue du peuple Bassa du Littoral camerounais, exploré à travers l'immersion en famille et la musique traditionnelle.",
        ["3h/jour (9h-12h), lundi-vendredi.", "Semaine 1 : phonétique et salutations.",
         "Semaine 2 : vocabulaire courant et vie familiale.",
         "Semaine 3 : conversation et découverte des chants Bassa."], IMG["classroom"]),
    _co(CM, FCM, "cameroun-fulfulde-ngaoundere", "Fulfulde (Peul)", "Ngaoundéré", 16, 220, "Session 4 semaines", "Français + Fulfulde",
        "Le fulfulde du Cameroun septentrional, langue véhiculaire du grand Nord, appris auprès des communautés peules de l'Adamaoua.",
        ["2h/jour (15h-17h).", "Semaines 1-2 : phonétique, salutations, vocabulaire pastoral.",
         "Semaines 3-4 : conversation, expressions imagées, immersion dans une famille peule."], IMG["desert_camels"]),

    # Mali
    _co(CM_ML, FML, "mali-dogon-bandiagara", "Dogon (Dogosso)", "Bandiagara", 18, 230, "Session 3 semaines", "Français + Dogon",
        "Le dogon, langue à cosmogonie riche parlée sur la falaise de Bandiagara, appris auprès des hogons et des sages du plateau.",
        ["3h/jour (9h-12h).", "Semaine 1 : bases phonétiques et salutations.",
         "Semaine 2 : vocabulaire cosmogonique et symbolique dogon.",
         "Semaine 3 : conversation et visite guidée d'un village Dogon."], IMG["forest"]),
    _co(CM_ML, FML, "mali-tamasheq-kidal", "Tamasheq (Touareg)", "Kidal", 18, 240, "Session 3 semaines", "Français + Tamasheq",
        "Le tamasheq targui du Mali, langue nomade du désert, appris autour du thé et de l'alphabet Tifinagh.",
        ["3h/jour (9h-12h).", "Semaine 1 : alphabet Tifinagh et phonétique.",
         "Semaine 2 : vocabulaire du désert et de la caravane.",
         "Semaine 3 : conversation avec locuteurs natifs."], IMG["desert_camels"]),

    # Nigeria
    _co(CM_NG, FNG, "nigeria-fulfulde-sokoto", "Fulfulde", "Sokoto", 18, 230, "Session 3 semaines", "Anglais + Fulfulde",
        "Le fulfulde des Peuls du nord Nigeria, langue transfrontalière du Sahel, appris auprès des éleveurs de Sokoto.",
        ["3h/jour (9h-12h).", "Semaine 1 : phonétique et politesse peule.",
         "Semaine 2 : vocabulaire pastoral et transhumance.",
         "Semaine 3 : conversation et immersion en famille peule."], IMG["classroom"]),
    _co(CM_NG, FNG, "nigeria-efik-calabar", "Efik", "Calabar", 16, 220, "Session 3 semaines", "Anglais + Efik",
        "L'efik, langue du sud-est nigérian et royaume historique de Calabar, appris à travers la cuisine et les proverbes.",
        ["3h/jour (10h-13h).", "Semaine 1 : alphabet et salutations.",
         "Semaine 2 : vocabulaire culinaire (edikang ikong) et vie quotidienne.",
         "Semaine 3 : conversation et visite du musée de Calabar."], IMG["market_stalls"]),

    # Sénégal
    _co(CM_SN, FSN, "senegal-diola-ziguinchor", "Diola", "Ziguinchor", 16, 220, "Session 4 semaines", "Français + Diola",
        "Le diola de Basse-Casamance, langue à multiples variantes, appris en immersion dans un village traditionnel.",
        ["2h/jour (9h-11h).", "Semaines 1-2 : phonétique, salutations, vie villageoise.",
         "Semaines 3-4 : conversation, initiation aux rites du bois sacré (avec accord)."], IMG["forest"]),
    _co(CM_SN, FSN, "senegal-mandinka-kolda", "Mandinka", "Kolda", 16, 210, "Session 3 semaines", "Français + Mandinka",
        "Le mandinka, langue mandingue partagée entre Sénégal, Gambie et Guinée, appris à travers les récits des griots.",
        ["3h/jour (9h-12h).", "Semaine 1 : phonétique et salutations.",
         "Semaine 2 : vocabulaire du quotidien et proverbes mandingues.",
         "Semaine 3 : conversation et écoute des griots."], IMG["language_class"]),

    # Maroc
    _co(CM_MA, FMA, "maroc-tarifit-nador", "Tarifit (Rif)", "Nador", 18, 230, "Session 3 semaines", "Français + Tarifit",
        "Le tarifit, variante amazighe parlée dans le Rif marocain, exploré en immersion en pays rifain.",
        ["3h/jour (9h-12h).", "Semaine 1 : phonétique et alphabet Tifinagh.",
         "Semaine 2 : vocabulaire de la montagne et de l'artisanat rifain.",
         "Semaine 3 : conversation et rencontre avec des locuteurs natifs."], IMG["pottery2"]),
    _co(CM_MA, FMA, "maroc-tachelhit-agadir", "Tachelhit (Souss)", "Agadir", 16, 230, "Session 4 semaines", "Français + Tachelhit",
        "Le tachelhit, variante amazighe du Souss, apprise dans les villages berbères de l'Anti-Atlas et de la région d'Agadir.",
        ["2h/jour (14h-16h).", "Semaines 1-2 : phonétique et alphabet Tifinagh.",
         "Semaines 3-4 : conversation, vocabulaire du souk et immersion dans un village."], IMG["language_class"]),

    # Bénin
    _co(CM_BJ, FBJ, "benin-ditammari-boukoumbe", "Ditammari (Somba)", "Boukoumbé", 18, 220, "Session 3 semaines", "Français + Ditammari",
        "Le ditammari, langue des Betamaribe (Somba), apprise dans les célèbres tata de l'Atacora.",
        ["3h/jour (9h-12h).", "Semaine 1 : phonétique et salutations.",
         "Semaine 2 : vocabulaire de la vie villageoise et de l'habitat tata.",
         "Semaine 3 : conversation et immersion en famille Somba."], IMG["classroom"]),
    _co(CM_BJ, FBJ, "benin-adja-aplahoue", "Adja", "Aplahoué", 16, 210, "Session 4 semaines", "Français + Adja",
        "L'adja, langue proche du fon parlée au sud-ouest du Bénin, apprise à travers les marchés et la tradition orale.",
        ["2h/jour (9h-11h).", "Semaines 1-2 : phonétique, tons et salutations.",
         "Semaines 3-4 : conversation, sortie pratique au marché d'Aplahoué."], IMG["market_stalls"]),

    # Burkina Faso
    _co(CM_BF, FBF, "burkina-faso-bissa-garango", "Bissa", "Garango", 18, 220, "Session 3 semaines", "Français + Bissa",
        "Le bissa, langue du centre-est burkinabé, apprise en immersion dans les villages de la région du Boulgou.",
        ["3h/jour (9h-12h).", "Semaine 1 : phonétique et salutations.",
         "Semaine 2 : vocabulaire agricole et vie communautaire.",
         "Semaine 3 : conversation avec locuteurs natifs."], IMG["students_study"]),
    _co(CM_BF, FBF, "burkina-faso-gulmancema-fada", "Gulmancéma", "Fada N'Gourma", 16, 220, "Session 3 semaines", "Français + Gulmancéma",
        "Le gulmancéma, langue des Gourmantché de l'est burkinabé, exploré à travers récits, chants et vie villageoise.",
        ["3h/jour (9h-12h).", "Semaine 1 : phonétique et salutations.",
         "Semaine 2 : vocabulaire du quotidien et des cérémonies.",
         "Semaine 3 : conversation et immersion en famille Gourmantché."], IMG["classroom"]),

    # Niger
    _co(CM_NE, FNE, "niger-kanuri-diffa", "Kanuri", "Diffa", 18, 220, "Session 3 semaines", "Français + Kanuri",
        "Le kanuri, langue héritière de l'empire du Bornou, apprise dans la région de Diffa au bord du lac Tchad.",
        ["3h/jour (9h-12h).", "Semaine 1 : phonétique et salutations.",
         "Semaine 2 : vocabulaire du lac et du commerce transfrontalier.",
         "Semaine 3 : conversation avec locuteurs natifs."], IMG["market_stalls"]),
    _co(CM_NE, FNE, "niger-peul-tillaberi", "Fulfulde (Peul)", "Tillabéri", 16, 210, "Session 4 semaines", "Français + Fulfulde",
        "Le fulfulde des Peuls du fleuve Niger, appris auprès des éleveurs et pêcheurs de la région de Tillabéri.",
        ["2h/jour (15h-17h).", "Semaines 1-2 : phonétique, salutations, vocabulaire pastoral.",
         "Semaines 3-4 : conversation et immersion en famille peule au bord du fleuve."], IMG["water_nature"]),
]
