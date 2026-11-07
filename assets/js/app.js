(() => {
  'use strict';

  const onReady = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  };

  onReady(() => {
    initFooterYear();
    initAvatarFallback();
    initEmailCopy();
    initSpotlight();
    initGraph();
    initViewTransitions();
  });

  function initFooterYear() {
    const year = document.getElementById('footerYear');
    if (year) {
      year.textContent = `© ${new Date().getFullYear()} Bunny • Built with Glassmorphic Style`;
    }
  }

  function initAvatarFallback() {
    const avatar = document.getElementById('avatar');
    if (!avatar) return;

    avatar.addEventListener('error', () => {
      const fallback = avatar.dataset.fallback;
      if (!fallback) return;

      const fallbackUrl = new URL(fallback, document.baseURI).href;
      if (avatar.src !== fallbackUrl) {
        avatar.src = fallback;
      }
    });
  }

  function initEmailCopy() {
    const button = document.getElementById('copyEmailBtn');
    const emailEl = document.getElementById('emailText');
    const toast = document.getElementById('toast');
    if (!button || !emailEl || !toast) return;

    let toastTimer = 0;

    const showToast = (message) => {
      toast.textContent = message;
      toast.classList.remove('hidden');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.add('hidden'), 2500);
    };

    const fallbackCopy = (text) => {
      const helper = document.createElement('textarea');
      helper.className = 'clipboard-helper';
      helper.value = text;
      helper.setAttribute('readonly', '');
      document.body.appendChild(helper);
      helper.select();

      let copied = false;
      try {
        copied = document.execCommand('copy');
      } finally {
        document.body.removeChild(helper);
      }

      if (!copied) throw new Error('Clipboard copy failed');
    };

    button.addEventListener('click', async () => {
      const email = emailEl.textContent.trim();
      if (!email) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          fallbackCopy(email);
        }
        showToast('✓ Copied email address to clipboard!');
      } catch {
        try {
          fallbackCopy(email);
          showToast('✓ Copied email address to clipboard!');
        } catch {
          showToast('Copy failed — select the address manually.');
        }
      }
    });
  }

  function initSpotlight() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    document.querySelectorAll('.glass-card').forEach((card) => {
      let frame = 0;

      card.addEventListener(
        'mousemove',
        (event) => {
          if (frame) return;

          frame = window.requestAnimationFrame(() => {
            frame = 0;
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
          });
        },
        { passive: true }
      );
    });
  }

  function initViewTransitions() {
    if (typeof document.startViewTransition !== 'function') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      const targetId = hash ? hash.slice(1) : '';
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      event.preventDefault();

      const transition = document.startViewTransition(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      transition.finished.then(() => {
        history.pushState(null, '', hash);
      });
    });
  }

  function initGraph() {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas || typeof canvas.getContext !== 'function') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coordDisplay = document.getElementById('coordDisplay');
    const resetButton = document.getElementById('resetGraphBtn');
    const GRID_SIZE = 30;
    const MAX_POINTS = 64;

    let points = [];
    let viewWidth = 0;
    let viewHeight = 0;
    let cursor = { gx: 0, gy: 0 };
    let keyboardMode = false;
    let isFocused = false;
    let resizeFrame = 0;

    const announce = (message) => {
      if (coordDisplay) coordDisplay.textContent = message;
    };

    const getCenter = () => ({
      x: Math.floor(viewWidth / (2 * GRID_SIZE)) * GRID_SIZE,
      y: Math.floor(viewHeight / (2 * GRID_SIZE)) * GRID_SIZE,
    });

    const toPixels = (gx, gy) => {
      const center = getCenter();
      return {
        x: center.x + gx * GRID_SIZE,
        y: center.y - gy * GRID_SIZE,
      };
    };

    const toGrid = (x, y) => {
      const center = getCenter();
      return {
        gx: Math.round((x - center.x) / GRID_SIZE),
        gy: Math.round((center.y - y) / GRID_SIZE),
      };
    };

    const getGridBounds = () => {
      const center = getCenter();
      return {
        minX: Math.ceil((0 - center.x) / GRID_SIZE),
        maxX: Math.floor((viewWidth - center.x) / GRID_SIZE),
        minY: Math.ceil((center.y - viewHeight) / GRID_SIZE),
        maxY: Math.floor(center.y / GRID_SIZE),
      };
    };

    const clampCursor = () => {
      const bounds = getGridBounds();
      cursor.gx = Math.min(bounds.maxX, Math.max(bounds.minX, cursor.gx));
      cursor.gy = Math.min(bounds.maxY, Math.max(bounds.minY, cursor.gy));
    };

    const draw = () => {
      if (viewWidth <= 0 || viewHeight <= 0) return;

      ctx.clearRect(0, 0, viewWidth, viewHeight);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      for (let x = 0; x < viewWidth; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, viewHeight);
        ctx.stroke();
      }

      for (let y = 0; y < viewHeight; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(viewWidth, y);
        ctx.stroke();
      }

      // Center axes
      const center = getCenter();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(0, center.y);
      ctx.lineTo(viewWidth, center.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(center.x, 0);
      ctx.lineTo(center.x, viewHeight);
      ctx.stroke();

      // Line connecting plotted points
      if (points.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);

        const first = toPixels(points[0].gx, points[0].gy);
        ctx.moveTo(first.x, first.y);

        for (let i = 1; i < points.length; i += 1) {
          const point = toPixels(points[i].gx, points[i].gy);
          ctx.lineTo(point.x, point.y);
        }

        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Plotted points
      points.forEach((point, index) => {
        const pixel = toPixels(point.gx, point.gy);

        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '10px monospace';
        ctx.fillText(`P${index + 1}(${point.gx}, ${point.gy})`, pixel.x + 10, pixel.y - 10);
      });

      // Keyboard cursor
      if (isFocused && keyboardMode) {
        const pixel = toPixels(cursor.gx, cursor.gy);

        ctx.strokeStyle = 'rgba(0, 242, 254, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(pixel.x - 12, pixel.y);
        ctx.lineTo(pixel.x + 12, pixel.y);
        ctx.moveTo(pixel.x, pixel.y - 12);
        ctx.lineTo(pixel.x, pixel.y + 12);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 5, 0, Math.PI * 2);
        ctx.strokeStyle = '#00f2fe';
        ctx.stroke();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      viewWidth = Math.max(1, Math.round(rect.width));
      viewHeight = Math.max(1, Math.round(rect.height));

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(viewWidth * pixelRatio);
      canvas.height = Math.round(viewHeight * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      clampCursor();
      draw();
    };

    const scheduleResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
      });
    };

    const addPoint = (gx, gy) => {
      if (points.length >= MAX_POINTS) {
        announce(`Maximum of ${MAX_POINTS} points reached. Press Reset to start over.`);
        return;
      }

      points.push({ gx, gy });
      draw();
      announce(`Plotted P${points.length}: [X: ${gx}, Y: ${gy}] • Total points: ${points.length}`);
    };

    const reset = () => {
      points = [];
      cursor = { gx: 0, gy: 0 };
      keyboardMode = false;
      draw();
      announce('Click grid to plot points');
    };

    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) * (viewWidth / rect.width);
      const y = (event.clientY - rect.top) * (viewHeight / rect.height);
      const grid = toGrid(x, y);

      keyboardMode = false;
      addPoint(grid.gx, grid.gy);
      canvas.focus({ preventScroll: true });
    });

    canvas.addEventListener('focus', () => {
      isFocused = true;
      draw();
    });

    canvas.addEventListener('blur', () => {
      isFocused = false;
      draw();
    });

    canvas.addEventListener('keydown', (event) => {
      const handledKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Home'];
      if (!handledKeys.includes(event.key)) return;

      event.preventDefault();
      keyboardMode = true;

      if (event.key === 'Home') {
        cursor = { gx: 0, gy: 0 };
        draw();
        announce(`Cursor at [X: ${cursor.gx}, Y: ${cursor.gy}]. Press Enter to plot.`);
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        addPoint(cursor.gx, cursor.gy);
        return;
      }

      if (event.key === 'ArrowUp') cursor.gy += 1;
      if (event.key === 'ArrowDown') cursor.gy -= 1;
      if (event.key === 'ArrowLeft') cursor.gx -= 1;
      if (event.key === 'ArrowRight') cursor.gx += 1;

      clampCursor();
      draw();
      announce(`Cursor at [X: ${cursor.gx}, Y: ${cursor.gy}]. Press Enter to plot.`);
    });

    if (resetButton) {
      resetButton.addEventListener('click', reset);
    }

    if ('ResizeObserver' in window) {
      new ResizeObserver(scheduleResize).observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', scheduleResize, { passive: true });
    }

    window.addEventListener('orientationchange', scheduleResize, { passive: true });
    resize();
  }
})();
