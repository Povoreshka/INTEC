document.addEventListener('DOMContentLoaded', function() {
    // 1. Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.block1, .work-block, .info-block, .block2, .block3, .block4 ');
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    const initAnimationStyles = function() {
        const elementsToAnimate = document.querySelectorAll('.block1, .work-block, .info-block, .block2, .block3, .block4 ');
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
    };

    initAnimationStyles();
    window.addEventListener('scroll', animateOnScroll);

    // 2. Анимация кнопок при наведении
    const buttons = document.querySelectorAll('.but-1, .but-2, .but-3, .but-log');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.05)';
        });
    });

    // 3. Анимация пунктов меню
    const menuItems = document.querySelectorAll('.text-menu');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.color = '#194DD2';
            item.style.transform = 'translateY(-3px)';
            item.style.transition = 'color 0.3s ease, transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.color = '#FFF';
            item.style.transform = 'translateY(0)';
        });
    });

    // 4. Анимация чисел в статистике
    const animateNumbers = function() {
        const numbers = document.querySelectorAll('.number');
        const duration = 2000; // Длительность анимации в мс
        const startValues = [0, 0, 0, 0];
        const endValues = [932, 960696, 67, 109500];
        const prefixes = ['', '', '', ''];
        const suffixes = ['', '', '', 'р.'];
        
        let startTime = null;
        
        const animate = function(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            numbers.forEach((num, index) => {
                const value = Math.floor(progress * (endValues[index] - startValues[index]) + startValues[index]);
                num.textContent = prefixes[index] + value.toLocaleString() + suffixes[index];
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.static'));
    };

    animateNumbers();

});