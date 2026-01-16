document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('nav > ul');
	const items = document.querySelectorAll('nav > ul li a');
	let anim = null;
	let currentActiveItem = null;

	const animate = (from, to) => {
		if (anim) clearInterval(anim);

		const start = Date.now();
		anim = setInterval(() => {
			const p = Math.min((Date.now() - start) / 500, 1);
			const e = 1 - Math.pow(1 - p, 3);

			const x = from + (to - from) * e;
			const y = -40 * (4 * e * (1 - e));
			const r = 200 * Math.sin(p * Math.PI);

			nav.style.setProperty('--translate-x', `${x}px`);
			nav.style.setProperty('--translate-y', `${y}px`);
			nav.style.setProperty('--rotate-x', `${r}deg`);

			if (p >= 1) {
				clearInterval(anim);
				anim = null;
				nav.style.setProperty('--translate-y', '0px');
				nav.style.setProperty('--rotate-x', '0deg');
			}
		}, 16);
	};

	const getCurrentPosition = () => parseFloat(nav.style.getPropertyValue('--translate-x')) || 0;

	const getItemCenter = (item) => {
		return item.getBoundingClientRect().left + item.offsetWidth / 2 - nav.getBoundingClientRect().left - 5;
	};

	const moveToItem = (item) => {
		const current = getCurrentPosition();
		const center = getItemCenter(item);
		animate(current, center);
		nav.classList.add('show-indicator');
	};

	const setActiveItem = (item) => {
		if (currentActiveItem) {
			currentActiveItem.classList.remove('active');
		}

		currentActiveItem = item;
		item.classList.add('active');
		moveToItem(item);
	};

	const handleMouseLeave = () => {
		if (currentActiveItem) {
			moveToItem(currentActiveItem);
		} else {
			nav.classList.remove('show-indicator');
			if (anim) clearInterval(anim);
		}
	};

	items.forEach(item => {
		item.addEventListener('mouseenter', () => moveToItem(item));
		item.addEventListener('mouseleave', handleMouseLeave);
		item.addEventListener('click', () => setActiveItem(item));
	});

	nav.addEventListener('mouseleave', handleMouseLeave);
	
	if (items.length > 0) {
		setTimeout(() => {
			setActiveItem(items[0]);
		}, 100);
	}
});


document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".alt-container");
  const words = container.querySelectorAll(".word");
  const letters = container.querySelectorAll(".letter");
  const stepCount = words.length - 1;

  if (stepCount <= 0) return;
  const stepPercentage = 100 / (stepCount*2);

  let keyframes = `@keyframes slide-steps {\n  0% { transform: translateY(0%); }\n`;

  for (let i = 0; i <= stepCount - 1; i++) {
    const startPercent = stepPercentage + stepPercentage * i *2 ;
    const endPercent = (stepPercentage + stepPercentage * i) * 2;
    const position = (i+1) * -100

    keyframes += `${startPercent}% { transform: translateY(${position}%); }\n`;
    keyframes += `${endPercent}% { transform: translateY(${position}%); }\n`;
  }

  keyframes += `}`;

  const style = document.createElement("style");
  style.textContent = keyframes;
  document.head.appendChild(style);
  
  letters.forEach((l) => {
    l.style.animationDuration = stepCount*2 + "s";
  });
});
