gsap.registerPlugin(ScrollTrigger);

/* ========================= */
/* HERO (PARALLAX SUAVE) */
/* ========================= */
gsap.to(".hero-image-bg", {
    y: "15%",
    scale: 1.05,
    ease: "none",
    scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1.2
    }
});

/* LOGO ENTRADA */
gsap.from(".floating-logo", {
    y: 50,
    opacity: 0,
    duration: 2,
    ease: "power4.out",
    delay: 0.5
});

/* ========================= */
/* EMPRESA (ANIMAÇÃO ENTRADA) */
/* ========================= */
gsap.from(".exchange-image img", {
    x: -150,
    opacity: 0,
    duration: 2.5,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".exchange-section",
        start: "top 70%",
    }
});

gsap.from(".exchange-text", {
    y: 100,
    opacity: 0,
    duration: 2.2,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".exchange-section",
        start: "top 70%",
    }
});

/* ========================= */
/* TRABALHE CONOSCO */
/* ========================= */
const workTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".work-section",
        start: "top 60%",
    }
});

workTl.from(".work-image img", {
    scale: 0.7,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out"
})
.from(".work-text", {
    x: 100,
    opacity: 0,
    duration: 1
}, "-=1");

/* ========================= */
/* CARD 3D + TROCA DE CONTEÚDO */
/* ========================= */
window.onload = () => {

    const empresaData = [
        {
            img: 'assets/portfolio/08.png',
            titulo: 'Nossa Essência',
            desc: 'Priorizamos a segurança absoluta.'
        },
        {
            img: 'assets/portfolio/07.jpeg',
            titulo: 'Inovação e Resultados',
            desc: 'Unimos experiência técnica e modernidade para otimizar a cadeia produtiva mineral. Na Scavare Mineração, transformamos recursos em valor por meio de uma gestão focada em eficiência, segurança e sustentabilidade.'
        },
        {
            img: 'assets/portfolio/09.png',
            titulo: 'Reflorestamento',
            desc: 'Recuperando biomas com precisão.'
        },
        {
            img: 'assets/portfolio/13.jpg',
            titulo: 'Treinamentos',
            desc: 'Equipe preparada para qualquer desafio.'
        }
    ];

    let currentIndex = 0;
    let isFlipped = false;

    function updateEmpresa() {

        currentIndex = (currentIndex + 1) % empresaData.length;
        const data = empresaData[currentIndex];

        const card = document.getElementById('meu-card');
        const titulo = document.getElementById('empresa-titulo');
        const desc = document.getElementById('empresa-desc');
        const imgFrente = document.getElementById('img-frente');
        const imgVerso = document.getElementById('img-verso');

        // 🔥 TROCA IMAGEM ANTES DO GIRO
        if (!isFlipped) {
            imgVerso.src = data.img + "?v=" + Date.now();
        } else {
            imgFrente.src = data.img + "?v=" + Date.now();
        }

        // 🔥 GARANTE QUE O NAVEGADOR RENDERIZE
        setTimeout(() => {

            isFlipped = !isFlipped;

            gsap.to(card, {
                rotateY: isFlipped ? 180 : 0,
                duration: 1.2,
                ease: "power2.inOut"
            });

        }, 150);

        // 🔥 TEXTO SINCRONIZADO
        gsap.to([titulo, desc], {
            opacity: 0,
            y: 10,
            duration: 0.4,
            onComplete: () => {

                titulo.innerText = data.titulo;
                desc.innerText = data.desc;

                gsap.to([titulo, desc], {
                    opacity: 1,
                    y: 0,
                    duration: 0.4
                });
            }
        });
    }

    // troca automática
    setInterval(updateEmpresa, 6000);
};