function navAnimation() {
    let nav = document.querySelector("nav");
  
    nav.addEventListener("mouseenter", function () {
      let tl = gsap.timeline();
  
      tl.to("#nav-bottom", {
        height: "21vh",
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          ".nav-part2 h5",
          {
            display: "block",
            opacity: 1,
            duration: 0.01, // just show instantly
          },
          "-=0.2"
        )
        .to(".nav-part2 h5 span", {
          y: 0,
          opacity: 1,
          stagger: {
            amount: 0.4,
            from: "start",
          },
          ease: "power3.out",
          duration: 0.5,
        });
    });
  
    nav.addEventListener("mouseleave", function () {
      let tl = gsap.timeline();
  
      tl.to(".nav-part2 h5 span", {
        y: 25,
        opacity: 0,
        stagger: {
          amount: 0.2,
          from: "end",
        },
        ease: "power2.in",
        duration: 0.4,
      })
        .to(".nav-part2 h5", {
          display: "none",
          duration: 0.1,
        })
        .to(
          "#nav-bottom",
          {
            height: "0",
            duration: 0.3,
            ease: "power2.inOut",
          },
          "-=0.2"
        );
    });
  }
  navAnimation();

  