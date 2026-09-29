const slides = document.querySelector('.slides')
const hidenNumber = document.getElementById('hidenNumber')
const butCallText = document.getElementById('butCallText')
const slideCount = document.querySelectorAll('.slide').length
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')
const home = document.getElementById('home')
const moreButton = document.querySelector('.moreButton')


let currentIndex = 0;



// Функция смены слайдов
function goToSlide(index) {
    if (index < 0) {    
        index = slideCount-1; // Если нажали «Назад» на первом слайде, переходим на последний
    } else if (index >= slideCount) {
        index = 0; // Если нажали «Вперёд» на последнем слайде, переходим на первый
    }
        currentIndex = index; // Запоминаем текущий слайд
        slides.style.transform = `translateX(${-index * 100}%)`; // Сдвигаем контейнер со слайдами
    currentIndex = index; // текущий слайд
    
}

// обработчик клика для кнопки Назад
prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

// обработчик клика для кнопки Вперёд
nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

goToSlide(0);



$(document).ready(function() {
    $('.serviceButton').on('click', function(event) {
        event.preventDefault();
        let posY = $('.services').offset().top;
        let down = 50;
        $('html, body').animate({
            scrollTop: posY - down
        }, 1300);
    });
});
$(document).ready(function() {
    $('.portfolioButton').on('click', function(event) {
        event.preventDefault();
        let posY = $('.portfolio').offset().top;
        $('html, body').animate({
            scrollTop: posY - 40
        }, 1300);
    });
});
$(document).ready(function(){
    $('.pasButton').on('click', function(e){
        e.preventDefault()
        let posY = $('.whyWe').offset().top
        $('html,body').animate({
            scrollTop:posY- 150
        },1300)
    })
})
$(document).ready(function(){
    $('#ecoButton').on('click', function(e){
        e.preventDefault()
        $('html,body').animate({
            scrollTop:0
        },1300)
    })
})
$(document).ready(function(){
    $('.contactButton').on('click', function(e){
        e.preventDefault()
        let posY = $('.contacts').offset().top
        $('html,body').animate({
            scrollTop:posY
        },1300)
    })
})
const portfolioImages = []
const src = './portfolio/IMG-20251002-WA00'
for (let i=1 ; i< 67; i++){
    if(i>=10){
        portfolioImages.push(src+ i + '.jpg')
    }else{
        portfolioImages.push(src+0+ i + '.jpg')
    }
    
}

const totalImages = portfolioImages.length
let step = 6
var displyImages = 0
let remainderImages = totalImages - displyImages


function checkMoreButton(){
    if(remainderImages === 0){
        moreButton.style.display = 'none';
    }
    else{
        createPortfolio()
    }
}
function createPortfolio(){
    if (remainderImages >= step){
        for(i = 0; i < step; i++){
            const plitka = document.querySelector('.container')
            plitka.innerHTML += `
                <div class="plitka-item">
                    <img src="${portfolioImages[displyImages]}" alt="Наша работа">
                </div>
            `;
            displyImages++
            remainderImages = totalImages - displyImages
        }
    }
    else{
        while(remainderImages!=0){
            const plitka = document.querySelector('.container')
            plitka.innerHTML += `
                <div class="plitka-item">
                    <img src="${portfolioImages[displyImages]}" alt="Наша работа">
                </div>
            `;
            displyImages++
            remainderImages = totalImages - displyImages
        }
    }
    if(remainderImages === 0){
        moreButton.style.display = 'none';
    }
    // checkMoreButton()
    console.log('Оставшиее число картинок: ',remainderImages)
    console.log('Показанных картинок: ',displyImages)
    console.log('Всего картинок: ',totalImages)
}
createPortfolio()


async function sendToTelegram(formData) {
    try {
        const response = await fetch('https://xn--61-6kcha4a9aocujx3h.xn--p1ai/telegram/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.success;

    } catch (error) {
        console.error('Ошибка отправки:', error);
        return false;
    }
}

// Остальной ваш JavaScript код остается без изменений...
document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('buttonSendForm');
    
    if (sendButton) {
        sendButton.addEventListener('click', async function(e) {
            e.preventDefault();

            // Получаем значения полей
            const formData = {
                name: document.getElementById('trackName').value.trim(),
                phone: document.getElementById('trackName2').value.trim(),
                comment: document.getElementById('trackName3').value.trim()
            };

            if (!formData.name) {
                alert('Пожалуйста, введите ваше имя');
                return;
            }
            
            if (!formData.phone) {
                alert('Пожалуйста, введите ваш телефон');
                return;
                
            }
            if((formData.phone.length)<11){
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            const originalText = sendButton.textContent;
            sendButton.textContent = 'Отправка...';
            sendButton.disabled = true;

            const success = await sendToTelegram(formData);

            if (success) {
                alert('✅ Заявка отправлена!\n Мы свяжемся с вами в ближайшее время.');
                document.getElementById('trackName').value = '';
                document.getElementById('trackName2').value = '';
                document.getElementById('trackName3').value = '';
                console.log(formData.phone)
            } else {
                alert('❌ Ошибка отправки.\n Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
            }
            sendButton.textContent = originalText;
            sendButton.disabled = false;
        });
    }
});