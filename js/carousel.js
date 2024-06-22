// Binny Kanjur - https://binnykanjur.com/

//Sample Usage
/* ***********************
<div id="image-carousel-id">
    <script>
        initImageCarousel({
                images: [
                    { src: 'content%2Fimg.png', header: 'Img Details', text: 'Img Text..........' },
                    { src: 'content%2Fimage.jpg', header: 'Image Header', text: 'Image description...' }
                ],
                showFullscreenButton: true,
                showCaptions: true
            });
    </script>
</div>
*********************** */

function initImageCarousel(config) {
    const scriptTag = document.currentScript;
    const carouselContainer = scriptTag.parentNode;
    if (!(carouselContainer instanceof HTMLElement)) {
        return;
    }

    initializeBootstrapCarousel(carouselContainer, config);
}

/* function initCarousel(config) {
    const { targetId } = config;

    const carouselContainer = document.getElementById(targetId);
    if (!carouselContainer) return;

    initializeBootstrapCarousel(carouselContainer, config);
} */

function initializeBootstrapCarousel(carouselContainer, config) {
    const { images, showFullscreenButton = true, showCaptions = true } = config;

    if (!carouselContainer) return;
    if (!hasNonEmptyId(carouselContainer)) return;

    const targetId = carouselContainer.id;
    carouselContainer.className = 'carousel slide';

    const canNavigate = (images !== null && images.length > 1);

    const indicators = document.createElement('div');
    if (canNavigate) {
        indicators.className = 'carousel-indicators';
        images.forEach((_, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.bsTarget = `#${targetId}`;
            button.dataset.bsSlideTo = index;
            button.setAttribute("aria-label", `Slide ${index}`);
            if (index === 0) button.className = 'active';
            indicators.appendChild(button);
        });
    }

    const inner = document.createElement('div');
    inner.className = 'carousel-inner';
    images.forEach((imgData, index) => {
        const item = document.createElement('div');
        item.className = `carousel-item${index === 0 ? ' active' : ''}`;

        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = `${imgData.subtext}`;
        img.className = 'd-block w-100';

        img.addEventListener('click', () => {
            const caption = item.querySelector('.carousel-caption');
            const controls = carouselContainer.querySelectorAll('.carousel-control-prev, .carousel-control-next, .carousel-indicators, .fullscreen-btn');

            caption.classList.toggle('hide');
            controls.forEach(control => control.classList.toggle('d-none'));
        });

        item.appendChild(img);

        if (showCaptions) {
            const caption = document.createElement('div');
            caption.className = 'carousel-caption d-none d-md-block';
            caption.innerHTML = `
                <h5>${imgData.header}</h5>
                <p>${imgData.text}</p>
            `;
            item.appendChild(caption);
        }

        inner.appendChild(item);
    });

    if (canNavigate) {
        const prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 'carousel-control-prev';
        prev.dataset.bsTarget = `#${targetId}`;
        prev.dataset.bsSlide = 'prev';
        prev.setAttribute("aria-label", 'prev');
        prev.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    `;

        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'carousel-control-next';
        next.dataset.bsTarget = `#${targetId}`;
        next.dataset.bsSlide = 'next';
        next.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    `;
        carouselContainer.appendChild(indicators);
        carouselContainer.appendChild(inner);
        carouselContainer.appendChild(prev);
        carouselContainer.appendChild(next);
    } else {
        carouselContainer.appendChild(inner);
    }

    if (showFullscreenButton) {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'fullscreen-btn';
        fullscreenBtn.ariaLabel = 'Full Screen';
        fullscreenBtn.type = 'button';
        fullscreenBtn.addEventListener('click', function () {
            if (!document.fullscreenElement) {
                carouselContainer.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        });
        carouselContainer.appendChild(fullscreenBtn);
    }

    document.addEventListener('fullscreenchange', function () {
        if (document.fullscreenElement) {
            carouselContainer.classList.add('carousel-fullscreen');
        } else {
            carouselContainer.classList.remove('carousel-fullscreen');
        }
    });
}

function hasNonEmptyId(element) {
    if (element.hasAttribute('id')) {
        const idValue = element.getAttribute('id');
        return idValue !== null && idValue.trim() !== '';
    }
    return false;
}