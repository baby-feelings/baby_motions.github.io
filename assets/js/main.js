// FAQ Accordion Script
const faqAccordion = document.getElementById('faq-accordion');
if (faqAccordion) {
    const items = faqAccordion.getElementsByClassName('faq-item');
    for (let i = 0; i < items.length; i++) {
        const question = items[i].querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = items[i].querySelector('.faq-answer');
            const icon = items[i].querySelector('i');
            
            const isOpen = answer.style.maxHeight;

            // Close all other answers
            for (let j = 0; j < items.length; j++) {
                if (i !== j) {
                    items[j].querySelector('.faq-answer').style.maxHeight = null;
                    items[j].querySelector('i').classList.remove('rotate-180');
                }
            }

            // Toggle current answer if it was not open
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.add('rotate-180');
            }
        });
    }
}