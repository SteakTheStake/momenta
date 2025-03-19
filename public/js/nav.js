const nav = document.querySelector("nav");
const effectEl = document.querySelector(".effect.filter");
const textEl = document.querySelector(".effect.text");

let animationTime = 600;
let pCount = 15;
const minDistance = 20;
const maxDistance = 42;
const maxRotate = 75;
const colors = [1,2,3,1,2,3,1,4];
const timeVariance = 300;
	
function noise(n = 1) {
    return n/2 - Math.random() * n;
}
function getXY(distance,pointIndex,totalPoints) {
    const x = (distance) * Math.cos(((360+noise(8))/totalPoints*pointIndex) * Math.PI / 180);
    const y = (distance) * Math.sin(((360+noise(8))/totalPoints*pointIndex) * Math.PI / 180);
    return [x, y];
}

function makeParticles($el) {
    const d = [90,10];
    const r = 100;

    const bubbleTime = animationTime * 2 + timeVariance;
    $el.style.setProperty( '--time', bubbleTime + 'ms' );

    for( let i = 0; i < pCount; i++ ) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      const $place = $el;
      if ( $place ) {
        $place.classList.remove('active');
        setTimeout(() => {
            const $particle = document.createElement('span');
            const $point = document.createElement('span');
            $particle.classList.add('particle');
            $particle.style = `
              --start-x: ${p.start[0]}px;
              --start-y: ${p.start[1]}px;
              --end-x: ${p.end[0]}px;
              --end-y: ${p.end[1]}px;
              --time: ${p.time}ms;
              --scale: ${p.scale};
              --color: var( --color-${p.color}, white );
              --rotate: ${p.rotate}deg;
            `;
            $point.classList.add('point');
            $particle.append( $point );
            $place.append($particle);
            requestAnimationFrame(() => {
              $place.classList.add('active');
            })
            setTimeout(() => {
                try {
                    $place.removeChild( $particle );
                } catch(e) {
                    
                }
            }, t );
        }, 30);
      };
    }
}

function createParticle(i, t, d, r) {
  let rotate = noise(r/10);
  let minDistance = d[0];
  let maxDistance = d[1];
  return {
    start: getXY(minDistance,pCount-i,pCount),
    end: getXY(maxDistance+noise(7),pCount-i,pCount),
    time: t,
    scale: 1 + noise(0.2),
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: rotate > 0 ? (rotate  + r/20)*10 : (rotate -  r/20)*10
  }
}


function updateEffectPosition(element) {
    const pos = element.getBoundingClientRect();
    const styles = {
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`
    };
    
    Object.assign(effectEl.style, styles);
    Object.assign(textEl.style, styles);
    textEl.innerText = element.innerText;
}


nav.querySelectorAll('li').forEach(($el) => {
    const link = $el.querySelector('a');

    const handleClick = (e) => {
        updateEffectPosition($el);

        if (!$el.classList.contains('active')) {
            nav.querySelectorAll('li').forEach(($el) => {
                $el.classList.remove('active');
            });
            effectEl.querySelectorAll('.particle').forEach(($el) => {
                effectEl.removeChild($el);
            });
            $el.classList.add('active');
            textEl.classList.remove('active');

            setTimeout(() => {
                textEl.classList.add('active');
            }, 100);

            makeParticles(effectEl);
        }
    };

    $el.addEventListener('click', handleClick);

    // Add keyboard navigation
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
        }
    });
});

// Resize Observer
const resizeObserver = new ResizeObserver(() => {
    const activeEl = nav.querySelector('li.active');
    if (activeEl) {
        updateEffectPosition(activeEl);
    }
});

resizeObserver.observe(document.body);

setTimeout(() => {
    nav.querySelector('li').click();
},200)

document.addEventListener('DOMContentLoaded', function() {
    // Get navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Function to highlight the active shader based on URL hash
    function highlightActiveShader() {
      const hash = window.location.hash || '#momenta'; // Default to momenta if no hash
      
      // Reset all navigation highlights
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Find and highlight the active navigation link
      const activeLink = document.querySelector(`nav ul li a[href="${hash}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
      
      // Hide all shader titles (reset highlighting)
      document.querySelectorAll('h2').forEach(title => {
        title.classList.remove('highlight-title');
      });
      
      // Highlight the appropriate shader title
      if (hash === '#momenta') {
        document.querySelector('.columns:first-of-type h2').classList.add('highlight-title');
      } else if (hash === '#momentart') {
        document.querySelector('.columns:last-of-type h2').classList.add('highlight-title');
      }
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Allow default behavior to update the URL hash
        setTimeout(highlightActiveShader, 50); // Short delay to ensure hash is updated
      });
    });
    
    // Initial highlight on page load
    highlightActiveShader();
    
    // Listen for hash changes (if user manually changes URL)
    window.addEventListener('hashchange', highlightActiveShader);
  });