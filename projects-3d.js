// projects-3d.js - 3D tilt effect for .project cards
(function(){
    const cards = document.querySelectorAll('.project');
    if (!cards.length) return;

    const MAX_ROT = 18;
    const IMG_MOVE = 20;

    function setTransform(card, rotateX, rotateY){
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function setImageTransform(img, x, y){
        img.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    }

    function handleEnter(card){
        card.classList.add('is-hovered');
    }

    function handleLeave(card){
        card.classList.remove('is-hovered');
        card.style.transform = '';
        const img = card.querySelector('img');
        if (img) img.style.transform = '';
    }

    function handleMove(e, card){
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotY = (px - 0.5) * MAX_ROT * -2;
        const rotX = (py - 0.5) * MAX_ROT * 2;

        setTransform(card, rotX, rotY);

        const img = card.querySelector('img');
            if (img){
            const moveX = (px - 0.5) * IMG_MOVE;
            const moveY = (py - 0.5) * IMG_MOVE;
                setImageTransform(img, moveX, moveY);
            }
        }

        cards.forEach(card => {
            if (!card.querySelector('.project-caption')){
                const caption = document.createElement('div');
                caption.className = 'project-caption';
                const title = card.querySelector('.nameOfProject')?.textContent || 'Project';
                caption.textContent = title;
                card.appendChild(caption);
            }

        card.addEventListener('pointerenter', () => handleEnter(card));
        card.addEventListener('pointerleave', () => handleLeave(card));
        card.addEventListener('pointermove', (e) => handleMove(e, card));

        card.addEventListener('touchstart', () => handleEnter(card));
        card.addEventListener('touchend', () => handleLeave(card));
        });
})();
