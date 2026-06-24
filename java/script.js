  // LOADER
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
      }, 2000);
    });

    // CUSTOM CURSOR
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('follower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect for cursor
    document.querySelectorAll('a, button, .port-item, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(2)';
        follower.style.background = 'rgba(74, 173, 170, 0.1)';
        follower.style.borderColor = 'transparent';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.background = 'transparent';
        follower.style.borderColor = 'var(--teal)';
      });
    });

    // NAVBAR SCROLL
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // REVEAL ON SCROLL
    const observerOptions = {
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // PORTFOLIO FILTERING (FIXED)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portItems = document.querySelectorAll('.port-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portItems.forEach(item => {
          const category = item.getAttribute('data-category');

          // Reset animation
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';

          setTimeout(() => {
            if (filter === 'all' || filter === category) {
              item.classList.remove('hidden');
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            } else {
              item.classList.add('hidden');
            }
          }, 300);
        });
      });
    });

    // FORM SUBMISSION
    document.getElementById('mainContactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('.submit-btn');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Message Sent Successfully!';
        btn.style.background = '#4CAF50';
        e.target.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = 'var(--dark)';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });