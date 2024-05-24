document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    gsap.from('header', {duration: 1, y: -50, opacity: 0});
    gsap.from('nav ul li', {duration: 1, y: 20, opacity: 0, stagger: 0.2});

    gsap.from('#about', {duration: 1, x: -100, opacity: 0, delay: 1});
    gsap.from('#projects', {duration: 1, x: 100, opacity: 0, delay: 1.5});
    gsap.from('#skills', {duration: 1, y: 100, opacity: 0, delay: 2});
    gsap.from('#contact', {duration: 1, y: 100, opacity: 0, delay: 2.5});
});
document.addEventListener('DOMContentLoaded', () => {
    const comparisonSlider = document.querySelector('.comparison-slider');
    const comparisonHandle = document.querySelector('.comparison-handle');
    const beforeImage = document.querySelector('.comparison-image.before');
    const afterImage = document.querySelector('.comparison-image.after');
    
    let isDragging = false;

    comparisonHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
    });

    function onDrag(e) {
        if (!isDragging) return;
        const sliderRect = comparisonSlider.getBoundingClientRect();
        let xPos = e.clientX - sliderRect.left;
        if (xPos < 0) xPos = 0;
        if (xPos > sliderRect.width) xPos = sliderRect.width;
        updateSlider(xPos / sliderRect.width * 100);
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
    }

    function updateSlider(percentage) {
        comparisonHandle.style.left = `${percentage}%`;
        afterImage.style.clip = `rect(0, ${percentage}%, 100%, 0)`;
    }
});
