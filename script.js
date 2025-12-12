/**
 * Fichier : script.js
 * Logique JavaScript unifiée pour ORYX TRANSPORT LOGISTICS
 * -- FINALISÉ ET OPTIMISÉ --
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    /* ================= LOGO REFRESH ================= */
    const logoArea = document.querySelector(".logo-area");
    if (logoArea) {
      logoArea.style.cursor = "pointer";
      logoArea.addEventListener("click", () => {
        window.location.reload(); // 🔹 Rafraîchit la page au lieu de rediriger
      });
    }

    /* ----------------------------------------------------------
          1. Navigation Mobile (Menu Hamburger)
        ---------------------------------------------------------- */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
      const toggleMenu = () => {
        const isActive = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isActive);
      };

      menuToggle.addEventListener("click", toggleMenu);

      // Fermer le menu après avoir cliqué sur un lien (sur mobile)
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (navLinks.classList.contains("active")) {
            toggleMenu();
          }
        });
      });
    }

    /* ----------------------------------------------------------
          2. Accordéons (Collapsibles) - AMÉLIORÉ
        ---------------------------------------------------------- */
    const collapsibleHeaders = document.querySelectorAll(".collapsible-header");

    collapsibleHeaders.forEach((header) => {
      const toggleAccordion = (targetHeader, isOpening) => {
        const content = targetHeader.nextElementSibling;
        targetHeader.classList.toggle("active", isOpening);
        targetHeader.setAttribute("aria-expanded", isOpening);
        content.style.maxHeight = isOpening ? content.scrollHeight + "px" : "0";
      };

      header.addEventListener("click", () => {
        const isActive = header.classList.contains("active");

        // Fermer tous les autres accordéons
        collapsibleHeaders.forEach((otherHeader) => {
          if (
            otherHeader !== header &&
            otherHeader.classList.contains("active")
          ) {
            toggleAccordion(otherHeader, false);
          }
        });

        // Ouvrir ou fermer l'accordéon actuel
        toggleAccordion(header, !isActive);
      });
    });

    /* ----------------------------------------------------------
          3. Statistiques animées (Compteurs)
        ---------------------------------------------------------- */
    const statsSection = document.querySelector(".stats-section");
    const speed = 200; // Durée de l'animation en "pas"

    const animateStat = (stat) => {
      const target = +stat.dataset.target;
      const prefix = stat.dataset.prefix || "";
      const suffix = stat.dataset.suffix || "";
      let current = 0;
      const increment = target / speed;

      const update = () => {
        if (current < target) {
          current += increment;
          const displayedValue = Math.floor(current).toLocaleString("fr-FR");
          stat.textContent = prefix + displayedValue + suffix;
          requestAnimationFrame(update);
        } else {
          stat.textContent = prefix + target.toLocaleString("fr-FR") + suffix;
        }
      };
      update();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".stat-number").forEach(animateStat);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsSection) observer.observe(statsSection);

   /* -----------------------------
   CHATBOT PROFESSIONNEL ORYX - BOOSTÉ
----------------------------- */
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotToggle = document.getElementById("chatbot-toggle");
const closeChatbotBtn = document.querySelector(".close-chatbot-btn");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSendBtn = document.getElementById("chatbot-send-btn");
const chatbotMessages = document.querySelector(".chatbot-messages");
const notificationBadge = chatbotToggle?.querySelector(".notification-badge");

// ⚡ Mise à jour des options
const predefinedOptions = [
  { text: "Demander un Devis", action: "devis" },
  { text: "Travaillez avec nous", action: "recrutement" },
  { text: "Informations de Contact", action: "contact" },
];

function addInitialOptions() {
  if (chatbotMessages.querySelector(".option-buttons")) return;
  const div = document.createElement("div");
  div.className = "option-buttons";
  predefinedOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.className = "option-button";
    btn.dataset.action = opt.action;
    btn.setAttribute("type", "button");
    div.appendChild(btn);
  });
  chatbotMessages.appendChild(div);
}

function appendMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}-message`;
  div.innerHTML = text;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// ✅ FAQ simple côté frontend
const faq = [
  {
    keywords: ["livraison", "délai", "temps", "rapidité", "combien de temps", "quand"],
    answer:
      "Nos livraisons standard sont effectuées sous 24 à 72 heures ouvrées. Des options express le jour même ou J+1 sont également disponibles selon la zone."
  },
  {
    keywords: ["prix", "tarif", "coût", "facturation", "combien", "devis"],
    answer:
      "Les tarifs varient selon la distance, le volume et l’urgence. Pour un prix exact, veuillez remplir notre formulaire de demande de devis."
  },
  {
    keywords: ["assurance", "sécurité", "protection", "perte", "casse"],
    answer:
      "Toutes nos expéditions sont assurées et suivies en temps réel. Vos marchandises sont protégées contre la perte et les dommages."
  },
  {
    keywords: ["suivi", "tracking", "localisation", "où est", "statut"],
    answer:
      "Un suivi en temps réel est disponible pour chaque livraison. Vous recevez les mises à jour à chaque étape du transport."
  },
  {
    keywords: ["zone", "zones", "couverture", "où", "villes", "pays"],
    answer:
      "ORYX couvre la majorité des zones urbaines et périurbaines dans le cadre des livraisons last mile. Contactez-nous pour une zone spécifique."
  },
  {
    keywords: ["retour", "retours", "colis retourné", "échec"],
    answer:
      "Nous proposons une gestion optimisée des retours avec notification immédiate et reprogrammation rapide si nécessaire."
  },
  {
    keywords: ["entrepôt", "stockage", "logistique", "warehouse"],
    answer:
      "Nous offrons des solutions de stockage temporaire et de gestion d’entrepôt adaptées aux besoins e-commerce et B2B."
  },
  {
    keywords: ["entreprise", "professionnel", "b2b", "société"],
    answer:
      "Nos services sont pensés pour les entreprises, e-commerçants et partenaires logistiques souhaitant externaliser leur last mile."
  },
  {
    keywords: ["service client", "support", "aide", "assistance"],
    answer:
      "Notre service client est disponible pour vous accompagner et répondre à vos demandes sous 24 heures maximum."
  },
  {
    keywords: ["travailler", "emploi", "recrutement", "postuler", "job"],
    answer:
      "Nous recrutons régulièrement des profils logistiques et livreurs. Consultez notre page “Travaillez avec nous” pour postuler."
  },
  {
    keywords: ["contact", "téléphone", "email", "joindre"],
    answer:
      "Vous pouvez nous joindre au +33 6 21 56 91 94 ou par email à oryx-logistique@gmail.fr. Nous sommes ravis de vous aider."
  }
];


function getBotReply(msg) {
  msg = msg.toLowerCase();

  // Vérifier FAQ
  for (let item of faq) {
    if (item.keywords.some(k => msg.includes(k))) return item.answer;
  }

  // DEMANDE DE DEVIS
  if (msg.includes("devis") || msg.includes("prix") || msg.includes("tarif") || msg.includes("coût") || msg.includes("offre")) {
    const replies = [
      "📨 Pour un devis précis, merci de remplir notre <a href='#contact'>formulaire de demande de devis B2B</a>.",
      "Vous pouvez obtenir un devis rapidement via notre <a href='#contact'>formulaire de demande de devis</a>.",
      "Notre équipe vous répondra sous 24h après votre <a href='#contact'>demande de devis</a>."
    ];
    return replies[Math.floor(Math.random()*replies.length)];
  }

  // TRAVAILLEZ AVEC NOUS / RECRUTEMENT
  if (msg.includes("travaillez") || msg.includes("postuler") || msg.includes("candidature") || msg.includes("emploi") || msg.includes("stage")) {
    const replies = [
      "🤝 Rejoignez notre équipe dynamique ! Postulez via notre <a href='formulaire.html'>formulaire de candidature</a>.",
      "Nous recrutons ! Remplissez le <a href='formulaire.html'>formulaire de candidature</a> pour nous rejoindre.",
      "Faites partie de notre aventure logistique. Formulaire ici : <a href='formulaire.html'>candidature</a>."
    ];
    return replies[Math.floor(Math.random()*replies.length)];
  }

  // CONTACT / TELEPHONE / EMAIL
if (msg.includes("contact") || msg.includes("téléphone") || msg.includes("email") || msg.includes("mail")) {
  const replies = [
    "☎️ Vous pouvez nous contacter directement au <a href='tel:+33621569194'>+33 6 21 56 91 94</a> ou par email à <a href='mailto:oryx-logistique@gmail.fr'>oryx-logistique@gmail.fr</a>.",
    "Pour toute question, appelez-nous au +33 6 21 56 91 94 ou envoyez un email : <a href='mailto:oryx-logistique@gmail.fr'>oryx-logistique@gmail.fr</a>.",
    "Besoin d'aide rapide ? Contactez-nous par téléphone <a href='tel:+33621569194'>+33 6 21 56 91 94</a> ou par mail <a href='mailto:oryx-logistique@gmail.fr'>oryx-logistique@gmail.fr</a>."
  ];
  return replies[Math.floor(Math.random()*replies.length)];
}

  // AUTRES / INCOMPRIS
  return "Je n'ai pas compris votre demande. Pour toute question urgente, veuillez utiliser notre <a href='#contact'>formulaire de contact</a> ou nous appeler directement.";
}

function sendMessage() {
  const text = chatbotInput.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  chatbotInput.value = "";
  document.querySelector(".option-buttons")?.remove();

  // Typing dynamique
  setTimeout(() => {
    appendMessage('<i class="fas fa-ellipsis-h"></i>', "bot-typing");
    setTimeout(() => {
      document.querySelector(".bot-typing-message")?.remove();
      appendMessage(getBotReply(text), "bot");
      addInitialOptions();
    }, 500 + text.length * 20); // plus la question est longue, plus le délai
  }, 300);
}

// Events
if (chatbotToggle) {
  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.classList.toggle("chatbot-active");
    if (notificationBadge) notificationBadge.style.display = "none";
    if (chatbotContainer.classList.contains("chatbot-active") && chatbotMessages.children.length === 0) {
      appendMessage("Bonjour 👋 Je suis votre assistant ORYX. Comment puis-je vous aider ?", "bot");
      addInitialOptions();
    }
  });
}

if (closeChatbotBtn) closeChatbotBtn.addEventListener("click", () => {
  chatbotContainer.classList.remove("chatbot-active");
});

if (chatbotSendBtn) {
  chatbotSendBtn.addEventListener("click", sendMessage);
  chatbotSendBtn.setAttribute("type", "button");
}

if (chatbotInput) {
  chatbotInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
}

if (chatbotMessages) {
  chatbotMessages.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("option-button")) return;
    document.querySelector(".option-buttons")?.remove();
    chatbotInput.value = target.textContent;
    sendMessage();
  });
}

// Notification badge
setTimeout(() => {
  if (chatbotContainer && !chatbotContainer.classList.contains("chatbot-active") && notificationBadge) {
    notificationBadge.style.display = "flex";
  }
}, 5000);

    /* ----------------------------------------------------------
          5. Galerie dynamique (Carrousel Automatique)
        ---------------------------------------------------------- */
    const visualBlock = document.getElementById("dynamic-visual-block");
    const howItWorksItems = document.querySelectorAll(".how-it-works-item");

    if (visualBlock) {
      const images = visualBlock.querySelectorAll(".dynamic-flow-image");
      let i = 0,
        timer;

      const initializeGallery = () => {
        images.forEach((img) => img.classList.remove("active"));
        howItWorksItems.forEach((item) => item.classList.remove("active"));
        i = 0;
        images[0]?.classList.add("active");
        howItWorksItems[0]?.classList.add("active");
      };
      initializeGallery();

      const startCarousel = () => {
        timer = setInterval(() => {
          images[i].classList.remove("active");
          howItWorksItems[i]?.classList.remove("active");
          i = (i + 1) % images.length;
          images[i].classList.add("active");
          howItWorksItems[i]?.classList.add("active");
        }, 2000);
      };

      visualBlock.addEventListener("mouseenter", startCarousel);
      visualBlock.addEventListener("mouseleave", () => {
        clearInterval(timer);
        initializeGallery();
      });
    }
  });
})();
