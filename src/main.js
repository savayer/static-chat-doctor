let lang_locale = navigator.language.split('-')[0],
    disableOtherChat = false,
    disableUserChat = true,
    dialogCallCount = 0,
    breakpointsChat = [2, 3, 4, 5, 8, 19], //для того чтобы не останавливаться на одном отправленном сообщение от доктора, если нужно отправить несклько
    Chat = {
        ru: {
            typing: 'печатает',
            validation: 'Ответ должен содержать только цифры',
            validation_age: 'Введите корректный возраст',
            validation_weight: 'Введите корректный вес',
            validation_height: 'Введите корректный рост',
            validation_eat: 'Введите корректное количество приемов пищи',
            mes1: 'Здравствуйте, меня зовут ***, я ведущий диетолог нашей клиники.',
            mes2: 'Для того, чтобы я смог вам помочь, ответьте, пожалуйста, на несколько вопросов в анкетной форме. Как вас зовут?',
            mes3: 'Рад знакомству, ***! Сколько вам полных лет?',
            mes4: 'Отлично! Укажите, пожалуйста, Ваш вес с последнего взвешивания в килограммах',
            mes5: 'Мне необходимо рассчитать ваш Индекс Массы Тела. Для этого не хватает вашего роста. Укажите, пожалуйста, рост в сантиметрах ',
            mes6: 'Спасибо за информацию. Ожидайте, пожалуйста, я быстро посчитаю ваш ИМТ ',
            mes7: 'Ваш ИМТ - ***',
            mes8: 'На основании вашего ИМТ  я настоятельно рекомендую вам изменить среднесуточный баланс калорий: его нужно сделать отрицательным, чтобы лишние жировые клетки могли сжигаться для выделения энергии. Таким образом вы сможете похудеть Сколько раз за сутки вы принимаете пищу?',
            mes9: 'Хорошо. Помимо этого важно сохранять достаточным уровень поступающего белка в ваш организм, чтобы сохранить ваши мышцы в тонусе и не потерять в размере мышечной ткани. ',
            mes10_false: 'На основании ваших ответов, я пришел(а) к выводу, что Вам нет необходимости проходить курс лечения в клинике для снижения веса, вы можете справиться с этой проблемой самостоятельно, соблюдая рекомендации, которые я опишу ниже.', /* ---> */
            mes11_false: 'На основании Вашего ИМТ, а также выбранному типу фигуры, я рекомендую Вам исключить из рациона питания простые углеводы и добавить больше сложных. Они ускоряют окисление белков и жиров.',
            mes12_false: 'Употреблять их стоит в первой половине дня, в послеобеденное время кормите свой организм блюдами, богатыми белками, не меньше 70 г в сутки. Разница между приемами пищи должна быть не менее 2-3 часов, ужинать старайтесь не позднее 18 часов. Пейте больше воды – минимум 1,5 литра вдень. ',
            mes13_false: 'Однако проблема не решится без дополнительных «помощников» - витаминов, экстрактов трав и растений. Такой палочкой-выручалочкой для Вас станет комплекс натуральных компонентов «Eco Slim». ',
            mes14_false: 'Препарат, изготовленный совместно с институтом питания, очищает организм от токсинов, расщепляя лишний жир. В первые дня использования заметно улучшается самочувствие, а стрелка на весах уже совсем скоро покажет желанный результат.',
            mes15_false: 'Добиться этого не сложно – следуйте советам диетолога и принимайте во время или после еды «Eco Slim» по 1 таблетке 3 раза в день. Минус 3 кг за неделю – это реально! А самое главное, без дополнительных физических нагрузок – Вы занимаетесь привычными делами, пока «Eco Slim» работает. ',
            mes10_true: 'На основании Вашего ИМТ могу сделать вывод – Ваш вес соответствует норме! Однако не стоит забывать о правильном питании и суточном количестве потребления калорий – около 1200 ккал. ',/* ---> */
            mes11_true: 'Принимать пищу следует несколько раз в день, небольшими порциями. Балансируйте углеводы, жиры и белки.',
            mes12_true: 'Последний компонент всегда должен присутствовать в рационе, ведь белки укрепляют мышцы. Это важно не только при диете, здоровье целого организма зависит от потребляемых продуктов. ',
            mes13_true: 'Чтобы поддерживать себя в идеальном весе, необходимо принимать «Eco Slim» - препарат, поддерживающий в тонусе вес и иммунитет в целом.',
            mes14_true: 'Продукт состоит из натуральных компонентов – витаминов, янтарной кислоты, ягод годжи и других полезных и вкусных веществ.',
            mes15_true: 'Достаточно 1 таблетки 3 раза в день для профилактики и стабилизации своего тела в тонусе!',
            mes16: 'Данное средство является эксклюзивным товаром и пока не доступно в свободной продаже в аптеке. Наша  клиника благодорит Вас за участие в нашей акции и дарит скидку 50% на средство для безопасного похудения EcoSlim.',
            mes17: 'Также предлагаю ознакомиться с отзывами наших пациентов об этом продукте.',
            mes18: 'Рецепт',
            mes19: 'Я благодарю Вас за проявленный интерес к нашей клинике. Желаю Вам здоровья и скорейшего достижения вашей цели. До свидания.'
        }
    },
    nowDate = {
        getDate: () => {
            let now = new Date(), date;
            date = ( now.getDate() < 10 ? '0'+now.getDate() : now.getDate() ) +'.'+ ( (now.getMonth()+1) < 10 ? '0'+(now.getMonth()+1) : (now.getMonth()+1) ) +'.'+now.getFullYear();
            return date;
            
        },
        getTime: () => {
            let now = new Date(), time;
            time = ( now.getHours() < 10 ? '0' + now.getHours() : now.getHours() ) +'.'+ ( now.getMinutes() < 10 ? '0' + now.getMinutes() : (now.getMinutes()) );
            return time;
        },
        getFullTime: () => {
            return nowDate.getDate()+' '+nowDate.getTime();
        }
    };

lang_locale = Chat[lang_locale] ? lang_locale : 'ru';

 
let v_chat = new Vue ({
        el: '#v_chat',
        data: {
            path: 'img/doctors/m1.jpg',
            name: 'Gabriel Porter',
            username: '',
            weight: 0,
            growth: 0,
            age: 0,
            imt: 0,
            dialog: []
        },
        methods: {
            getTypeMes: (type) => {
                if (type === 'user') return 'my-message'
            },
            setActiveDoctor: function(number) {
                if (number === 2) {
                    this.path = 'img/doctors/w1.jpg';
                    this.name = 'Maria Lawrence'
                } else {
                    this.path = 'img/doctors/m1.jpg';
                    this.name = 'Gabriel Porter';
                }
            }
        }
    }),
    dialog = {
        timeSend: 3000,
        typing: function() {
            if (dialogCallCount >= 19) return false;
            let points = '',
                $points = document.querySelector('.typing span.points'),
                $typing = document.querySelector('.typing span#typing');

            $typing.innerHTML = Chat[lang_locale].typing;
            let interval = setInterval(() => {
                if (points.length === 4) points = '';
                points += '.';
                $points.innerHTML = points;
            }, 300);
            // console.log(this.timeSend);
            setTimeout(() => {
                clearInterval(interval);
                $typing.innerHTML = '';
                $points.innerHTML = '';
                dialog.sendMesFromDoctor();
                 
                if (breakpointsChat.indexOf(dialogCallCount) == -1) {
                    dialog.typing(); 
                    return false;
                }
                disableUserChat = false;
                
            }, this.timeSend) //this.timeSend
        },
        sendMesFromDoctor: () => {
            dialogCallCount++;
            let mesObj = 'mes'+dialogCallCount;
            if (dialogCallCount >= 10 && dialogCallCount <= 15) { //если сообщение перепутье между true и false, то определяем результат имт
                mesObj += '_'+dialog.analysisIMT(v_chat.imt);
            }
            let mes = {
                    path: v_chat.path,
                    type: 'doctor',
                    text: Chat[lang_locale][mesObj],
                    date: nowDate.getFullTime()
                };
            if (dialogCallCount === 1) mes.text = mes.text.replace('***', v_chat.name); //name chosen doctor
            if (dialogCallCount === 3) mes.text = mes.text.replace('***', v_chat.username); //set username in chat
            if (dialogCallCount === 7) {
                v_chat.imt = (v_chat.weight / Math.pow((v_chat.growth/100), 2)).toFixed(2);
                mes.text = mes.text.replace('***', v_chat.imt); //set ИМТ in chat
            }
            let dialogCallNext = dialogCallCount+1, 
                mesObj2        = 'mes'+dialogCallNext; //след сообщение
            if (dialogCallNext >= 10 && dialogCallNext <= 15) {
                mesObj2 += '_'+dialog.analysisIMT(v_chat.imt);
            }
            let nextMessage    = Chat[lang_locale][mesObj2]; //? Chat[lang_locale][mesObj2] : Chat[lang_locale][mesObj];
            
            if (dialogCallCount < 19) {//общее кол-во сообщений
                
                dialog.timeSend = (nextMessage.length / 10) * 1000; //каждые 10 символов = 1 секунде
            }
            if (dialogCallNext === 7) { //если след сообщение - расчет имт, то время задаемс сами
                dialog.timeSend = 3000;
            }
            v_chat.dialog.push( mes );
            setTimeout(() => {
                window.document.querySelector('.chat__inner').scrollTop = 9999;
            }, 200);
            
        },
        sendMesFromUser: (message) => {
            let mesUser = {
                type: 'user',
                text: message,
                date: nowDate.getFullTime()
            };
            if (dialogCallCount === 2) v_chat.username = mesUser.text; //username
            if (dialogCallCount === 3) v_chat.age = mesUser.text; 
            if (dialogCallCount === 4) v_chat.weight = mesUser.text;
            if (dialogCallCount === 5) v_chat.growth = mesUser.text;
            setTimeout(() => {
                v_chat.dialog.push( mesUser );
            }, 200);
            setTimeout(() => {
                window.document.querySelector('.chat__inner').scrollTop = 9999;
            }, 210);
            
        },
        validation: (event, textarea) => {
            let breakpointsChatValidation = [3,4,5,8], //ограничить ввод только цифрами [ age, weight, height ]
                currentMessageNumber      = breakpointsChatValidation.indexOf(dialogCallCount);
            if ( currentMessageNumber != -1 ) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    //alert('Цифры сцука');
                    setTimeout(() => {
                        textarea.value = '';
                        textarea.setAttribute('placeholder', Chat[lang_locale].validation)
                    }, 0);
                } else {
                    function checkSymbols(maxvalue, element, errorMessage) {
                        let value = +element.value;
                        if (value <= 0 || value > maxvalue) {
                            if (element.value.length <= 1) return false;
                            setTimeout(function() {
                                element.value = element.value.substr(0, element.value.length-1);
                                element.setAttribute('placeholder', errorMessage)
                            }, 100);
                        }
                        
                    }
                    switch (currentMessageNumber) {
                        case 0://age
                            checkSymbols(100, textarea, Chat[lang_locale].validation_age);
                            break;
                        case 1://weight
                            checkSymbols(199, textarea, Chat[lang_locale].validation_weight);
                            break;
                        case 2://height
                            checkSymbols(250, textarea, Chat[lang_locale].validation_height);                            
                            break;
                        case 3://amount eat
                            checkSymbols(10, textarea, Chat[lang_locale].validation_eat);
                            break;
                        default:    
                            break;
                    }
                }
            }
            
        },
        analysisIMT: (imt) => {
            // if (imt < 17.5) {} //рекомендуется повышение массы тела, лечение анорексии. риск для здоровья высокий        
            // if (imt < 18.5) {} //рекомендуется повышение массы тела, лечение анорексии. риск для здоровья отсутствует
            
            if (v_chat.age <= 25) {
                if (imt >= 18.5 && imt <= 22.9) return 'true';
                if (imt >= 23) return 'false';
            }

            if (v_chat.age > 25) {
                if (imt >= 20 && imt <= 25.9) return 'true';
                if (imt >= 26) return 'false';
            }

            return 'true';

        }
    };

document.addEventListener('DOMContentLoaded', () => {

    let $consultStart = document.querySelector('#consult_button'),
        $section1     = document.querySelector('section.startpage'),
        $section2     = document.querySelector('section.chat_page'),
        $startChat    = document.querySelector('#start_chat'),
        $overlaySend  = document.querySelector('.chat__form-bg'),
        $sendMessage  = document.querySelector('#sent__message'),
        $sendButton   = document.querySelector('#send_message'),
        $chooseDoctor = document.querySelectorAll('.chat__doctors-hover');

    document.querySelector('html, body').scrollTop = 0;
    // $consultStart.onclick = () => {
    //     document.querySelector('html, body').scrollTop = $section2.getBoundingClientRect().top;
    //     /*if ie*/document.body.scrollTop = $section2.getBoundingClientRect().top;
    //     setTimeout(() => {
    //         $section1.style.display = 'none';
    //     }, 400)
    // };

    [].forEach.call($chooseDoctor, (current) => {
        current.addEventListener('click', () => {
            if (disableOtherChat) return false;
            let doctorId = +current.getAttribute('data-doctor');
            v_chat.setActiveDoctor(doctorId);

            if (doctorId === 1) { //если активный первый врач
                $chooseDoctor[1].classList.remove('online'); //то не активный второй
            } else if (doctorId === 2) {
                $chooseDoctor[0].classList.remove('online');
            }

            current.classList.add('online');
        })
    });

    $startChat.onclick = () => {
        $startChat.style.display = 'none';
        $overlaySend.classList = [];
        disableOtherChat = true;
        dialog.typing();
    }

    let sendMessage = () => {
        if (disableUserChat) return false;
        let message = $sendMessage.value;
        if (!message) return false;
        $sendMessage.value = '';
        dialog.sendMesFromUser(message);
        dialog.typing();
        disableUserChat = true;
    }

    $sendButton.onclick = () => {
        sendMessage();
    }

    $sendMessage.onkeyup = (e) => {
        dialog.validation(e, $sendMessage);
        if (e.keyCode == '13') {
            e.preventDefault();
            sendMessage();
        }
    }


});