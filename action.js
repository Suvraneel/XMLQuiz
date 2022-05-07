var xhr = new XMLHttpRequest();
xhr.open('GET', './quiz.xml', true);
xhr.send();
xhr.onload = () => {
    if (xhr.status === 200) {
        const quizText = xhr.responseText
        // console.log(quizText)
        parser = new DOMParser();
        const quizXmlDoc = parser.parseFromString(quizText, "text/xml");
        console.log(quizXmlDoc)
        const quizXml = quizXmlDoc.getElementsByTagName('MCQ');
        console.log(quizXml)
        quizData = []
        for (let i = 0; i < 20; i++) {
            var correct;
            var id = [a, b, c, d]
            var ans = quizXml[i].childNodes
            for (const element of ans) {
                if (element.hasAttribute('correct')) {
                    correct = element.firstChild.nodeValue
                }
            }
            // console.log(correct)
            quizData.push({
                question: quizXml[i].childNodes[0].firstChild.nodeValue,
                a: quizXml[i].childNodes[1].firstChild.nodeValue,
                b: quizXml[i].childNodes[2].firstChild.nodeValue,
                c: quizXml[i].childNodes[3].firstChild.nodeValue,
                d: quizXml[i].childNodes[4].firstChild.nodeValue,
                correct: correct
            })
        }
        console.log(quizData)


        const quiz = document.getElementById('quiz')
        const quizQuestion = document.getElementById('quiz-question')
        const quizA = document.getElementById('quiz-a')
        const quizB = document.getElementById('quiz-b')
        const quizC = document.getElementById('quiz-c')
        const quizD = document.getElementById('quiz-d')
        const quizBack = document.getElementById('quiz-back')
        const quizSubmit = document.getElementById('quiz-submit')

        var score = 0
        var questionNumber = 0
        var quizOver = false
        var quizStarted = false

        startQuiz()

        function startQuiz() {
            quizStarted = true
            quizOver = false
            questionNumber = 0
            score = 0
            quiz.style.display = 'block'
            quizQuestion.innerHTML = quizData[questionNumber].question
            quizA.innerHTML = quizData[questionNumber].a
            quizB.innerHTML = quizData[questionNumber].b
            quizC.innerHTML = quizData[questionNumber].c
            quizD.innerHTML = quizData[questionNumber].d
            quizSubmit.innerHTML = 'Submit'
        }

        var submissions = Array(20).fill("");
        function nextQn(answer) {
            // if (quizData[questionNumber].correct === answer) {
            //     score++
            //     console.log(score)
            // }
            submissions[questionNumber] = answer
            questionNumber++
            if (questionNumber === 20) {
                quizOver = true
                quizSubmit.innerHTML = 'Finish'
            }
            if (!quizOver) {
                quizQuestion.innerHTML = quizData[questionNumber].question
                quizA.innerHTML = quizData[questionNumber].a
                quizB.innerHTML = quizData[questionNumber].b
                quizC.innerHTML = quizData[questionNumber].c
                quizD.innerHTML = quizData[questionNumber].d
            }
        }


        function prevQn(answer) {
            submissions[questionNumber] = answer
            if (questionNumber > 0) {
                questionNumber--
                quizOver = false
                quizSubmit.innerHTML = 'Submit'
                quizQuestion.innerHTML = quizData[questionNumber].question
                quizA.innerHTML = quizData[questionNumber].a
                quizB.innerHTML = quizData[questionNumber].b
                quizC.innerHTML = quizData[questionNumber].c
                quizD.innerHTML = quizData[questionNumber].d
            }
        }

        quizSubmit.addEventListener('click', () => {
            const answerEls = document.querySelectorAll('.answer')
            if (quizStarted) {
                if (quizOver) {
                    finishQuiz()
                } else {
                    answerEls.forEach(answerEl => {
                        if(answerEl.checked) {
                            answer = answerEl.nextElementSibling.innerHTML
                        }
                    })
                    console.log(answer)
                    nextQn(answer)
                }
            } else {
                startQuiz()
            }
        })

        quizBack.addEventListener('click', () => {
            const answerEls = document.querySelectorAll('.answer')
            answerEls.forEach(answerEl => {
                if(answerEl.checked) {
                    answer = answerEl.nextElementSibling.innerHTML
                }
            })
            console.log(answer)
            prevQn(answer)
        })

        
        function finishQuiz() {
            quiz.style.display = 'none'
            const scoreCard = document.getElementById('score-card')
            const scoreImg = document.getElementById('score-img')
            const scoreText = document.getElementById('score-text')
            var resetQuiz = document.getElementById('reset-quiz')
            for (let i = 0; i < quizData.length; i++) {
                if (submissions[i] === quizData[i].correct) {
                    score++
                }
            }
            console.log(score)
            imgVal = score<5?0:score<=10?1:score<=15?2:3
            scoreCard.style.display = 'block'
            scoreImg.src = './assets/' + imgVal + '.png'
            scoreText.innerHTML = `You scored ${score} out of 20`
            // alert(`Your score is ${score}`)
        }
        // console.log(quizData)
    }
}