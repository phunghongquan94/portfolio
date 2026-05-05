let current = 0;
const sections = document.querySelectorAll(".screen");
let scrolling = false;

const menuBtns = document.querySelectorAll(".menu-btn");
const menuIndicator = document.getElementById("menuIndicator");

Fancybox.bind("[data-fancybox]", { 
  animated: true,
  parentEl: document.getElementById("sec-2"),
  hideScrollbar: false, 
  placeFocusBack: false,
  Images: {
    zoom: false, 
  },
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: [
        "toggle1to1",
        "rotateCCW",
        "rotateCW",
        "flipX",
        "flipY",
      ],
      right: ["slideshow", "thumbs", "close"], 
    },
  },
});

// CURSOR & PARALLAX HANDLER
const splitSlider = document.getElementById('splitSlider');
const s4CursorImg = document.getElementById('s4-cursor-img');
const sec3 = document.getElementById('sec-3');

// 1. SCREEN 1: Vẫn lắng nghe toàn màn hình
window.addEventListener('mousemove', (e) => {
  if (current === 0 && splitSlider) {
    const rect = splitSlider.getBoundingClientRect();
    const localX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const localY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    splitSlider.style.setProperty('--position', `${(localX / rect.width) * 100}%`);
    splitSlider.style.setProperty('--px', `${((localX - rect.width/2)/(rect.width/2)) * -20}px`);
    splitSlider.style.setProperty('--py', `${((localY - rect.height/2)/(rect.height/2)) * -20}px`);
  } 
});

// 2. SCREEN 4: CHỈ LẮNG NGHE CHUỘT BÊN TRONG SEC-3
if (sec3 && s4CursorImg) {
  // Khi chuột di chuyển bên trong Screen 4
  sec3.addEventListener('mousemove', (e) => {
    if (current !== 3) return;
    const rect = sec3.getBoundingClientRect();
    s4CursorImg.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    s4CursorImg.style.setProperty('--my', `${e.clientY - rect.top}px`);
    s4CursorImg.style.opacity = '1'; // Hiện ảnh lên
  });

  // Khi chuột đi ra khỏi mép của Screen 4
  sec3.addEventListener('mouseleave', () => {
    s4CursorImg.style.opacity = '0'; // Từ từ mờ đi
  });
}

function initBubbles() {
  const boxes = document.querySelectorAll('.skill-box');
  boxes.forEach(box => {
    const container = box.querySelector('.water-container');
    if(!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'liquid-wrapper';

    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      const size = (0.5 + Math.random() * 0.8).toFixed(2);      
      const distance = (2.5 + Math.random() * 4).toFixed(2);  
      const time = 1 + Math.random() * 2;      
      const position = -5 + Math.random() * 80; 
      const delay = -1 * (1 + Math.random() * 2); 
      
      bubble.style.cssText = `--size:${size}rem; --distance:${distance}rem; --position:${position}%; --time:${time}s; --delay:${delay}s;`;
      wrapper.appendChild(bubble);
    }

    const base = document.createElement('div');
    base.className = 'liquid-base';
    wrapper.appendChild(base);

    container.appendChild(wrapper);
  });
}
initBubbles();

function initGalleryGooey() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    const container = document.createElement('div');
    container.className = 'gallery-gooey-container';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'liquid-wrapper';

    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = (0.8 + Math.random() * 1.2).toFixed(2);      
      const distance = (2.5 + Math.random() * 5).toFixed(2);  
      const time = 1 + Math.random() * 2;      
      const position = -5 + Math.random() * 90; 
      const delay = -1 * (1 + Math.random() * 2); 
      bubble.style.cssText = `--size:${size}rem; --distance:${distance}rem; --position:${position}%; --time:${time}s; --delay:${delay}s;`;
      wrapper.appendChild(bubble);
    }

    const base = document.createElement('div');
    base.className = 'liquid-base';
    wrapper.appendChild(base);
    container.appendChild(wrapper);
    
    const overlay = item.querySelector('.gallery-overlay');
    if(overlay) {
        item.insertBefore(container, overlay);
    } else {
        item.appendChild(container);
    }
  });
}
initGalleryGooey();

function initMouseTooltip() {
  const tooltip = document.createElement('div');
  tooltip.className = 'mouse-tooltip';
  document.body.appendChild(tooltip);

  const skillBoxes = document.querySelectorAll('.skill-box');

  skillBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      const text = this.getAttribute('data-tooltip');
      if (text) {
        tooltip.textContent = text;
        tooltip.classList.add('show');
      }
    });

    box.addEventListener('mousemove', function(e) {
      tooltip.style.left = e.clientX + 'px';
      tooltip.style.top = (e.clientY - 15) + 'px';
    });

    box.addEventListener('mouseleave', function() {
      tooltip.classList.remove('show');
    });
  });
}
initMouseTooltip();

function initWobbleHover() {
  const skillBoxes = document.querySelectorAll('.skill-box');
  skillBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      this.classList.remove('drop-bounce-anim', 'wobble-anim');
      void this.offsetWidth; 
      this.classList.add('wobble-anim');
    });

    box.addEventListener('animationend', function(e) {
      if (e.animationName === 'weebleWobble') {
        this.classList.remove('wobble-anim');
      }
    });
  });
}
initWobbleHover();

function triggerContentAnimation(sec) {
  const gridItems = sec.querySelectorAll(".anim-item");
  if(gridItems.length > 0) {
    gridItems.forEach((item, index) => {
      item.classList.remove("animate__animated", "animate__fadeInUp", "animate__fadeOutDown");
      item.style.opacity = "0";
      setTimeout(() => {
        item.style.opacity = "1";
        item.classList.add("animate__animated", "animate__fadeInUp");
      }, index * 30); 
    });
  }

  const skillItems = sec.querySelectorAll(".anim-skill");
  if(skillItems.length > 0) {
    skillItems.forEach((item, index) => {
      item.classList.remove("drop-bounce-anim", "wobble-anim", "filled");
      item.style.opacity = "0"; 
      item.style.pointerEvents = "none";
      void item.offsetWidth; 
      
      setTimeout(() => {
        item.style.opacity = "1"; 
        item.classList.add("drop-bounce-anim");
        
        setTimeout(() => {
          item.classList.add("filled");
        }, 500); 

        setTimeout(() => {
          item.style.pointerEvents = "auto";
          item.classList.remove("drop-bounce-anim");
        }, 800); 

      }, index * 80 + 100); 
    });
  }
}

function hideContentAnimation(sec) {
  const gridItems = sec.querySelectorAll(".anim-item");
  if(gridItems.length > 0) {
    gridItems.forEach((item, index) => {
      item.classList.remove("animate__animated", "animate__fadeInUp", "animate__fadeOutDown");
      setTimeout(() => {
        item.classList.add("animate__animated", "animate__fadeOutDown");
      }, index * 30); 
    });
  }

  const skillItems = sec.querySelectorAll(".anim-skill");
  if(skillItems.length > 0) {
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.pointerEvents = "none"; 
        item.style.opacity = "0"; 
        item.classList.remove("filled"); 
        
        setTimeout(() => {
          item.classList.remove("drop-bounce-anim", "wobble-anim");
        }, 500); 
      }, index * 40); 
    });
  }
}

function updateMenuUI(targetIndex) {
  menuBtns.forEach(btn => btn.classList.remove("active"));
  menuBtns[targetIndex].classList.add("active");
  
  const indicators = document.querySelectorAll('.active-indicator');
  indicators.forEach(ind => {
    ind.style.setProperty('--y', `calc(${targetIndex} * var(--menu-item-size))`);
  });
}

function goToScreen(targetIndex, forceClose = false) {
  if (window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches) return;
  
  const fancyboxInstance = Fancybox.getInstance();
  if (fancyboxInstance) {
    if (forceClose) fancyboxInstance.close(); 
    else return; 
  }

  if (scrolling) return;
  if (targetIndex === current || targetIndex < 0 || targetIndex >= sections.length) return;

  scrolling = true;
  
  const currentSec = sections[current];
  const nextSec = sections[targetIndex];
  
  const isScrollingDown = targetIndex > current;

  updateMenuUI(targetIndex);
  hideContentAnimation(currentSec);

  setTimeout(() => {
    sections.forEach(s => {
        s.classList.remove("slide-up-in", "push-back-out", "slide-down-out", "pull-forward-in");
    });

    nextSec.classList.add("active");
    let animatingSec; 

    if (isScrollingDown) {
      currentSec.style.zIndex = "2";
      currentSec.classList.add("push-back-out");
      nextSec.style.zIndex = "10";
      nextSec.classList.add("slide-up-in");
      animatingSec = nextSec; 
    } else {
      nextSec.style.zIndex = "2";
      nextSec.classList.add("pull-forward-in");
      currentSec.style.zIndex = "10";
      currentSec.classList.add("slide-down-out");
      animatingSec = currentSec; 
    }

    setTimeout(() => {
        triggerContentAnimation(nextSec);
    }, 200);

    const handleAnimationEnd = (event) => {
      if (event.target !== animatingSec) return;

      current = targetIndex;
      sections.forEach((s, i) => {
          s.classList.toggle("active", i === current);
          s.classList.remove("slide-up-in", "push-back-out", "slide-down-out", "pull-forward-in");
      });
      
      animatingSec.removeEventListener("animationend", handleAnimationEnd);
      setTimeout(() => { scrolling = false; }, 100);
    };

    animatingSec.addEventListener("animationend", handleAnimationEnd);

  }, 300); 
}

window.addEventListener("wheel", (e) => {
  let direction = e.deltaY > 0 ? 1 : -1;
  goToScreen(current + direction, false);
}, { passive: false });

let touchStartY = 0;
let touchEndY = 0;
window.addEventListener("touchstart", (e) => { touchStartY = e.changedTouches[0].clientY; }, { passive: true });
window.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].clientY;
  let diff = touchStartY - touchEndY;
  if (Math.abs(diff) > 50) {
    let direction = diff > 0 ? 1 : -1;
    goToScreen(current + direction, false);
  }
}, { passive: true });

menuBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetIndex = parseInt(btn.getAttribute("data-target"));
    goToScreen(targetIndex, true); 
  });
});

triggerContentAnimation(sections[0]);

// ==========================================
// TÍNH NĂNG COPY & HIỂN THỊ THÔNG BÁO SCREEN 4
// ==========================================
function initCopyToClipboard() {
  const cards = document.querySelectorAll('#sec-3 .s4-card');
  const notifyDiv = document.getElementById('copy-notify');
  let notifyTimeout;

  cards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function() {
      const noteContent = this.getAttribute('data-note');
      
      if (noteContent) {
        navigator.clipboard.writeText(noteContent).then(() => {
          
          // 1. TẮT TẠM THỜI CHUYỂN ĐỘNG: Ép thông báo thu nhỏ và tàng hình ngay lập tức
          notifyDiv.style.transition = 'none';
          notifyDiv.classList.remove('show');
          
          // 2. Ép trình duyệt ghi nhận trạng thái thu nhỏ (Reflow)
          void notifyDiv.offsetWidth; 
          
          // 3. BẬT LẠI CHUYỂN ĐỘNG (Xóa style.transition để nó dùng lại CSS gốc)
          notifyDiv.style.transition = ''; 
          
          // 4. Bơm class show vào để thông báo nảy cái "Bóp!"
          notifyDiv.classList.add('show');
          
          // 5. Đặt lại bộ đếm 2 giây
          clearTimeout(notifyTimeout);
          notifyTimeout = setTimeout(() => {
            notifyDiv.classList.remove('show');
          }, 2000);
          
        }).catch(err => {
          console.error('Không thể copy nội dung: ', err);
        });
      }
    });
  });
}

// Chạy hàm cài đặt
initCopyToClipboard();

// ==========================================
// CHUYỂN ĐỔI ẢNH TITLE (SCREEN 3)
// ==========================================
function initTitleToggle() {
  const titleBox = document.querySelector('.item-title');
  if (titleBox) {
    titleBox.addEventListener('click', function() {
      // Tự động thêm/xóa class 'swapped' mỗi khi click
      this.classList.toggle('swapped');
    });
  }
}

// Chạy hàm
initTitleToggle();