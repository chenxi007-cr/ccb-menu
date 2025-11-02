document.addEventListener('DOMContentLoaded', function () {
  // 设置当前页面导航状态
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active', 'clicked');
    }

    // 点击导航链接效果
    link.addEventListener('click', function (e) {
      if (this.classList.contains('active')) {
        e.preventDefault(); // 阻止跳转当前页面
        return;
      }

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('clicked'));
      this.classList.add('clicked');
    });
  });

  // 初始化 Swiper
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
  });
});

function switchLang(lang) {
  const contents = document.querySelectorAll('.lang-content');
  const buttons = document.querySelectorAll('.lang-toggle button');
  
  contents.forEach(p => {
    p.style.display = p.getAttribute('data-lang') === lang ? 'block' : 'none';
  });

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(lang));
  });
}

// 每日时段控制逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有每日限时section
  const timeSections = document.querySelectorAll('.daily-time-limited');
  if (timeSections.length === 0) return;

  // 获取当前时间（转换为时分数字，如9:30→930）
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  timeSections.forEach(section => {
    // 解析时段参数（HH:MM）
    const [startHour, startMinute] = section.dataset.start.split(':').map(Number);
    const [endHour, endMinute] = section.dataset.end.split(':').map(Number);
    
    // 转换为时分数字（如9:00→900，12:00→1200）
    const startTime = startHour * 100 + startMinute;
    const endTime = endHour * 100 + endMinute;

    // 判断当前时间是否在时段内
    if (currentTime >= startTime && currentTime <= endTime) {
      section.classList.add('active');
    }
  });

  // 定时检查（每10分钟更新一次状态）
  setInterval(() => {
    const newTime = new Date().getHours() * 100 + new Date().getMinutes();
    timeSections.forEach(section => {
      const [sH, sM] = section.dataset.start.split(':').map(Number);
      const [eH, eM] = section.dataset.end.split(':').map(Number);
      const sTime = sH * 100 + sM;
      const eTime = eH * 100 + eM;
      
      if (newTime >= sTime && newTime <= eTime) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }, 600000); // 10分钟 = 600000毫秒
});

document.addEventListener('DOMContentLoaded', function() {
  const timeSections = document.querySelectorAll('.daily-time-limited');
  if (timeSections.length === 0) return;

  const now = new Date();
  const currentHour = now.getHours() * 100 + now.getMinutes();

  timeSections.forEach(section => {
    // 解析时段参数（改为6pm-8pm）
    const [startHour, startMinute] = section.dataset.start.split(':').map(Number); // 18, 0
    const [endHour, endMinute] = section.dataset.end.split(':').map(Number);     // 20, 0
    
    const startTime = startHour * 100 + startMinute; // 1800 (6pm)
    const endTime = endHour * 100 + endMinute;       // 2000 (8pm)

    // 判断当前时间是否在18:00-20:00之间
    if (currentTime >= startTime && currentTime <= endTime) {
      section.classList.add('active');
    }
  });

  // 定时检查（每10分钟）
  setInterval(() => {
    const newTime = new Date().getHours() * 100 + new Date().getMinutes();
    timeSections.forEach(section => {
      const [sH, sM] = section.dataset.start.split(':').map(Number);
      const [eH, eM] = section.dataset.end.split(':').map(Number);
      const sTime = sH * 100 + sM; // 1800
      const eTime = eH * 100 + eM; // 2000
      
      if (newTime >= sTime && newTime <= eTime) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }, 600000);
});