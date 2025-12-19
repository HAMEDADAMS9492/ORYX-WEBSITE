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

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (navLinks.classList.contains("active")) {
            toggleMenu();
          }
        });
      });
    }

    /* ----------------------------------------------------------
          2. Accordéons adaptatifs selon écran
        ---------------------------------------------------------- */
    const collapsibleHeaders = document.querySelectorAll(".collapsible-header");

    const updateAccordionsByScreen = () => {
      const isDesktop = window.innerWidth >= 1024;

      collapsibleHeaders.forEach((header) => {
        const content = header.nextElementSibling;

        if (isDesktop) {
          // Ouvrir tous les blocs
          header.classList.add("active");
          header.setAttribute("aria-expanded", "true");
          content.style.maxHeight = content.scrollHeight + "px";
          // Désactiver le clic
          header.style.pointerEvents = "none";
        } else {
          // Restaurer le comportement mobile
          header.classList.remove("active");
          header.setAttribute("aria-expanded", "false");
          content.style.maxHeight = "0";
          header.style.pointerEvents = "auto";
        }
      });
    };

    // Initialisation
    updateAccordionsByScreen();

    // Mise à jour si redimensionnement
    window.addEventListener("resize", updateAccordionsByScreen);

    // Toggle accordéon sur mobile
    collapsibleHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        if (window.innerWidth >= 1024) return; // Pas de toggle sur desktop

        const isActive = header.classList.contains("active");

        // Fermer tous les autres accordéons
        collapsibleHeaders.forEach((otherHeader) => {
          if (
            otherHeader !== header &&
            otherHeader.classList.contains("active")
          ) {
            const otherContent = otherHeader.nextElementSibling;
            otherHeader.classList.remove("active");
            otherHeader.setAttribute("aria-expanded", "false");
            otherContent.style.maxHeight = "0";
          }
        });

        // Ouvrir ou fermer l'accordéon actuel
        const content = header.nextElementSibling;
        header.classList.toggle("active", !isActive);
        header.setAttribute("aria-expanded", !isActive);
        content.style.maxHeight = !isActive ? content.scrollHeight + "px" : "0";
      });
    });

    /* ----------------------------------------------------------
          3. Statistiques animées (Compteurs)
        ---------------------------------------------------------- */
    const statsSection = document.querySelector(".stats-section");
    const speed = 200;

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
       CHATBOT PROFESSIONNEL ORYX
    ----------------------------- */
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const closeChatbotBtn = document.querySelector(".close-chatbot-btn");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSendBtn = document.getElementById("chatbot-send-btn");
    const chatbotMessages = document.querySelector(".chatbot-messages");
    const notificationBadge = chatbotToggle?.querySelector(
      ".notification-badge"
    );

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

    const faq = [
      {
        keywords: ["livraison", "délai"],
        answer:
          "Nos livraisons standard sont effectuées sous 24 à 72 heures ouvrées. Des options express sont disponibles.",
      },
      {
        keywords: ["prix", "tarif", "coût"],
        answer:
          "Les tarifs varient selon distance, volume et urgence. Remplissez le formulaire pour un prix exact.",
      },
      {
        keywords: ["assurance", "sécurité"],
        answer:
          "Toutes nos expéditions sont assurées et suivies en temps réel.",
      },
      {
        keywords: ["suivi", "tracking"],
        answer: "Suivi en temps réel disponible pour chaque livraison.",
      },
      {
        keywords: ["zone", "couverture"],
        answer: "ORYX couvre la majorité des zones urbaines et périurbaines.",
      },
      {
        keywords: ["retour"],
        answer:
          "Gestion optimisée des retours avec reprogrammation rapide si nécessaire.",
      },
      {
        keywords: ["entrepôt", "stockage", "logistique"],
        answer:
          "Solutions de stockage temporaire et gestion d’entrepôt adaptées aux besoins e-commerce et B2B.",
      },
      {
        keywords: ["entreprise", "professionnel"],
        answer: "Services pensés pour entreprises et partenaires logistiques.",
      },
      {
        keywords: ["service client", "support", "aide"],
        answer: "Notre service client répond sous 24 heures maximum.",
      },
      {
        keywords: ["travailler", "emploi", "recrutement"],
        answer:
          "Nous recrutons régulièrement. Formulaire disponible sur la page dédiée.",
      },
      {
        keywords: ["contact", "téléphone", "email"],
        answer:
          "Contactez-nous au +33 6 21 56 91 94 ou par email : oryx-logistique@gmail.fr.",
      },
    ];

    function getBotReply(msg) {
      msg = msg.toLowerCase();
      for (let item of faq)
        if (item.keywords.some((k) => msg.includes(k))) return item.answer;

      if (
        msg.includes("devis") ||
        msg.includes("prix") ||
        msg.includes("tarif") ||
        msg.includes("coût") ||
        msg.includes("offre")
      ) {
        const replies = [
          "📨 Pour un devis précis, remplissez notre <a href='#contact'>formulaire</a>.",
          "Obtenez un devis via notre <a href='#contact'>formulaire</a>.",
          "Notre équipe vous répondra sous 24h après votre <a href='#contact'>demande de devis</a>.",
        ];
        return replies[Math.floor(Math.random() * replies.length)];
      }

      if (
        msg.includes("travaillez") ||
        msg.includes("postuler") ||
        msg.includes("emploi")
      ) {
        const replies = [
          "🤝 Rejoignez notre équipe ! Formulaire de candidature : <a href='formulaire.html'>ici</a>.",
          "Nous recrutons ! Remplissez le <a href='formulaire.html'>formulaire</a>.",
          "Faites partie de notre aventure logistique. Formulaire : <a href='formulaire.html'>candidature</a>.",
        ];
        return replies[Math.floor(Math.random() * replies.length)];
      }

      if (
        msg.includes("contact") ||
        msg.includes("téléphone") ||
        msg.includes("email")
      ) {
        const replies = [
          "☎️ Contactez-nous : <a href='tel:+33621569194'>+33 6 21 56 91 94</a> ou <a href='mailto:oryx-logistique@gmail.fr'>oryx-logistique@gmail.fr</a>.",
          "Pour toute question, appelez ou envoyez un email.",
          "Besoin d'aide rapide ? Contactez-nous par téléphone ou mail.",
        ];
        return replies[Math.floor(Math.random() * replies.length)];
      }

      return "Je n'ai pas compris votre demande. Veuillez utiliser notre <a href='#contact'>formulaire de contact</a>.";
    }

    function sendMessage() {
      const text = chatbotInput.value.trim();
      if (!text) return;

      appendMessage(text, "user");
      chatbotInput.value = "";
      document.querySelector(".option-buttons")?.remove();

      setTimeout(() => {
        appendMessage('<i class="fas fa-ellipsis-h"></i>', "bot-typing");
        setTimeout(() => {
          document.querySelector(".bot-typing-message")?.remove();
          appendMessage(getBotReply(text), "bot");
          addInitialOptions();
        }, 500 + text.length * 20);
      }, 300);
    }

    if (chatbotToggle) {
      chatbotToggle.addEventListener("click", () => {
        chatbotContainer.classList.toggle("chatbot-active");
        if (notificationBadge) notificationBadge.style.display = "none";
        if (
          chatbotContainer.classList.contains("chatbot-active") &&
          chatbotMessages.children.length === 0
        ) {
          appendMessage(
            "Bonjour 👋 Je suis votre assistant ORYX. Comment puis-je vous aider ?",
            "bot"
          );
          addInitialOptions();
        }
      });
    }

    if (closeChatbotBtn)
      closeChatbotBtn.addEventListener("click", () => {
        chatbotContainer.classList.remove("chatbot-active");
      });

    if (chatbotSendBtn) {
      chatbotSendBtn.addEventListener("click", sendMessage);
      chatbotSendBtn.setAttribute("type", "button");
    }

    if (chatbotInput) {
      chatbotInput.addEventListener(
        "keypress",
        (e) => e.key === "Enter" && sendMessage()
      );
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

    setTimeout(() => {
      if (
        chatbotContainer &&
        !chatbotContainer.classList.contains("chatbot-active") &&
        notificationBadge
      ) {
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
    /* Fichier : script.js (ou votre fichier JavaScript) */

    /* ----------------------------------------------------------
      6. Slider images hero-right (fade automatique)
---------------------------------------------------------- */
    const heroSliderImages = [
      "image/stockage1.jpeg", // Index 0
      "image/stockage2.jpg", // Index 1
      "image/stockage3.jpg", // Index 2
    ];

    // Sélectionnez l'élément <img> à l'intérieur du conteneur
    const heroSlider = document.querySelector(".hero-card.follow-card img");

    if (heroSlider) {
      let currentHero = 0;

      // 1. Ajoutez la transition CSS via JS (sinon l'effet est instantané)
      heroSlider.style.transition = "opacity 0.8s ease-in-out";

      setInterval(() => {
        // 2. Début du Fondu sortant (Fade out)
        heroSlider.style.opacity = 0;

        setTimeout(() => {
          // 3. Changement de l'image (invisible car opacité = 0)
          currentHero = (currentHero + 1) % heroSliderImages.length;
          heroSlider.src = heroSliderImages[currentHero];

          // 4. Fondu entrant (Fade in)
          heroSlider.style.opacity = 1;
        }, 800); // 800ms = durée du fade pour que l'image soit bien invisible lors du changement de source
      }, 3000); // Répétez toutes les 3 secondes
    }
    document.addEventListener("DOMContentLoaded", () => {
      const header = document.querySelector(".main-header");
      if (header) {
        setTimeout(() => {
          header.scrollIntoView({ behavior: "auto", block: "start" });
        }, 50); // 50ms suffit
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const images = document.querySelectorAll(".dynamic-flow-image");
      let currentIndex = 0;
      const totalImages = images.length;

      function showNextImage() {
        images.forEach((img, index) => {
          img.classList.remove("active");
        });
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add("active");
      }

      // Affichage initial
      images[0].classList.add("active");

      // Défilement toutes les 1 secondes (tu peux ajuster)
      setInterval(showNextImage, 1000);
    });
    /* =================================================================
   7. Formulaires Recrutement & Partenariat (GESTION COMPLÈTE)
================================================================= */

    (function () {
      // Initialisation EmailJS
      emailjs.init("Nghmh21DmTKRfKCpw");

      const recruitmentForm = document.getElementById("recruitment-form");
      const partnershipForm = document.getElementById("partner-form");

      function showNotify(message, type) {
        const container = document.getElementById("notification-container");
        if (!container) {
          console.warn("Conteneur de notification absent. Message :", message);
          return;
        }

        const toast = document.createElement("div");
        toast.className = `notification ${type}`;

        // Icône dynamique : coche pour succès, triangle attention pour erreur
        const iconClass =
          type === "success" ? "fa-check" : "fa-exclamation-triangle";

        toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;

        container.appendChild(toast);

        // Disparition après 5 secondes
        setTimeout(() => {
          toast.style.opacity = "0";
          toast.style.transform = "translateX(100%)";
          toast.style.transition = "all 0.5s ease";
          setTimeout(() => toast.remove(), 500);
        }, 5000);
      }

      // --- LOGIQUE RECRUTEMENT (Optimisée) ---
      if (recruitmentForm) {
        recruitmentForm.addEventListener("submit", async function (e) {
          e.preventDefault();
          const btn = this.querySelector("button[type='submit']");
          const originalBtnText = btn.innerHTML;
          btn.disabled = true;
          btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

          const formData = new FormData(this);
          const data = Object.fromEntries(formData.entries());
          const companyEmail = "Contact.oryxtl@gmail.com";

          try {
            // 1. Envoi vers Mohamed (Admin)
            await emailjs.send("service_sjv0ngx", "template_sxbdi4r", {
              ...data,
              send_to: companyEmail,
              reply_to: data.email,
              subject_title: ` 💼 Nouvelle Candidature : ${
                data.poste_souhaite || "Poste"
              } - ${data.nom || ""} ${data.prenom || ""}`,
              thanks_message:
                "Une nouvelle candidature a été soumise sur le site :",
              message_instruction:
                "📥 Dossier reçu. Le candidat a reçu les instructions pour l'envoi du CV.",
            });

            // 2. Envoi vers le Candidat (Confirmation)
            if (data.email) {
              await emailjs.send("service_sjv0ngx", "template_sxbdi4r", {
                ...data,
                send_to: data.email,
                reply_to: companyEmail,
                subject_title:
                  "Accusé de réception de votre candidature 🤝 ORYX TRANSPORT LOGISTICS",
                thanks_message: `Bonjour ${
                  data.prenom
                }, nous vous remercions de l'intérêt porté à notre enseigne. Votre demande pour le poste de ${
                  data.poste_souhaite || "Livreur"
                } a été enregistrée. Pour finaliser votre candidature, merci de bien vouloir répondre à cet e-mail en joignant votre CV (format PDF). Nous étudierons votre profil avec attention et reviendrons vers vous dans les plus brefs délais.`,
                message_instruction:
                  "📍 Note importante : L'examen de votre dossier de candidature est conditionné par la réception de votre curriculum vitæ par retour de courrier électronique.",
              });
            }

            showNotify(
              "✅ Candidature envoyée ! Vérifiez vos emails.",
              "success"
            );
            this.reset();
          } catch (error) {
            console.error("Erreur EmailJS Recrutement:", error);
            showNotify("⚠️ Erreur lors de l'envoi.", "error");
          } finally {
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
          }
        });
      }

      // --- LOGIQUE PARTENARIAT ---
      if (partnershipForm) {
        partnershipForm.addEventListener("submit", async function (e) {
          e.preventDefault();
          const btn = this.querySelector("button[type='submit']");
          const originalBtnText = btn ? btn.innerHTML : "Envoyer";

          if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
          }

          try {
            await emailjs.sendForm("service_sjv0ngx", "template_gh5vpl7", this);

            // C'est ici que la notification se déclenche
            showNotify(
              "✅ Demande de partenariat envoyée avec succès !",
              "success"
            );
            this.reset();
          } catch (error) {
            console.error("Erreur EmailJS Partenariat:", error);
            showNotify("⚠️ Erreur lors de l'envoi du partenariat.", "error");
          } finally {
            if (btn) {
              btn.disabled = false;
              btn.innerHTML = originalBtnText;
            }
          }
        });
      }
    })();
  });
})();
