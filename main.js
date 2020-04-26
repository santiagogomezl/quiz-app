'use strict';

//Define quiz questions
const QUIZ = [
    {
    question: 'What is the name of Joe Exotic\'s zoo?', 
    options: 
        { 
        A: 'Tiger King Zoo',
        B: 'The Greater Wynnewood Exotic Animal Park',
        C: 'Big Cat Rescue',
        D: 'Myrtle Beach Safari'
        },
    answer: 'B'
    },
    {
    question: 'How many of Joe Exotic\'s husbands appear in the series?', 
    options: 
        { 
        A: '1',
        B: '2',
        C: '3',
        D: '4'
        },
    answer: 'C'
    },
    {
    question: 'Joe Exotic ran for governor of what state?', 
    options: 
        { 
        A: 'Iowa',
        B: 'Kansas',
        C: 'Texas',
        D: 'Oklahoma'
        },
    answer: 'D'
    },
    {
    question: 'How many years in jail has Joe Exotic been sentenced to?', 
    options: 
        { 
        A: '16',
        B: '18',
        C: '20',
        D: '22'
        },
    answer: 'D'
    },
    {
    question: 'Joe Exotic is a singer of what music genre?', 
    options: 
        { 
        A: 'Jazz',
        B: 'Country',
        C: 'Rock and Roll',
        D: 'Pop'
        },
    answer: 'B'
    },
    {
    question: 'What song did Joe Exotic sing about Carole Baskin\'s dead husband?', 
    options: 
        { 
        A: 'Here Kitty Kitty',
        B: 'I Saw A Tiger',
        C: 'My First Love',
        D: 'You Can\'t Believe'
        },
    answer: 'A'
    },
    {
    question: 'Which of these is NOT a theory about what happened to Carole Baskin\'s husband?', 
    options: 
        { 
        A: 'He fled to Costa Rica to spend his life with his other girlfriend',
        B: 'He was pushed out of an airplane',
        C: 'Carole Baskin fed him to the tigers',
        D: 'He\'s actually still living at Big Cat Rescue in a shed'
        },
    answer: 'D'
    },
    {
    question: 'What is Joe Exotic\'s real legal name?', 
    options: 
        { 
        A: 'Joseph Maldonado',
        B: 'Joseph Exotic',
        C: 'Joseph The Tiger King',
        D: 'Joseph Rhyne'
        },
    answer: 'A'
    },
    {
    question: 'How much did Carole Baskin sue Joe Exotic for in their trademark settlement case?', 
    options: 
        { 
        A: '$500k',
        B: '$1m',
        C: '$800k',
        D: '$2m'
        },
    answer: 'B'
    },
    {
    question: 'How much did Joe Exotic allegedly pay to kill Carole Baskin?', 
    options: 
        { 
        A: '$1,000',
        B: '$2,000',
        C: '$3,000',
        D: '$4,000'
        },
    answer: 'C'
    },
    {
    quizCount: 0,
    quizScore: 0
    }
];

function updateScore(scored){
    //App will update the score after answer is submitted
    
    scored ?
    QUIZ[QUIZ.length-1].quizScore += 1 :
    '';

    $('.js-score').
    removeClass('js-hidden').
    text(
    `Score: 
    ${QUIZ[QUIZ.length-1].quizScore}/${QUIZ.length-1}
    `);
}

function updateQuestionCount(questionCount){
    //App will update question count after user has moved to the next question

    $('.js-question-count').
    removeClass('js-hidden').
    text(`Question: ${QUIZ[QUIZ.length-1].quizCount + questionCount}/${QUIZ.length-1}`);
}

function loadQuestion(){
    //App will load a question based once quiz starts or user moves to the next question
    //If is the last question, app will prompt to review and finalize quiz
    
    $('.js-current-question').empty();

    const quizStats = QUIZ[QUIZ.length-1];
    const count = quizStats.quizCount;

    if(count != QUIZ.length){
    
        const loadedQuestion = QUIZ[count];
        const questionOptions = loadedQuestion.options

        $('.js-current-question')
        .append(
            `<h2 class='js-quiz-question'>${loadedQuestion.question}</h2>`  
        );

        $.each(questionOptions, function(key, value){
            $('.js-current-question')
            .append(
            `
            <input type="radio" id="${key}" name="option" value="${key}">
            <label for="${key}">${key}. ${value}</label><br>
            `            
            );
        });
        
        $('.js-current-question')
        .append(
            `<input class="js-validate-question" type="submit" value="Show me your stripes!">`  
        );
       
    }else{
        finishQuiz();   
    }

    

}

function startQuiz(){
    //app will reset question count and score to 0
    //app will start by loadings the questions one at the time

    QUIZ[QUIZ.length-1].quizCount = 0;
    QUIZ[QUIZ.length-1].quizScore = 0;

    const quizStats = QUIZ[QUIZ.length-1];
    const count = quizStats.quizCount;
    const score = quizStats.quizScore;

    //conditional to add security to the quiz.
    $('.quiz-form').on('click', '.js-start-quiz', function(){
        if(count == 0){
            $(this).addClass('js-hidden');
            $('.js-quiz-greeting').addClass('js-hidden');
            $('.js-restart-top').removeClass('js-hidden');
            loadQuestion();
            updateQuestionCount(1);
            updateScore();
        }else{
            QUIZ[QUIZ.length-1].quizCount = 0;
            QUIZ[QUIZ.length-1].quizScore = 0;
            startQuiz(); 
        } 
    }); 
}

function updateInterface(){
    //App will update user interface so user cannot select another
    //answer after submitting and to toggle form buttons
    $('.js-quiz-form input[type=radio]').prop( 'disabled', true );
    $('.js-quiz-form label').addClass('js-disabled');
    $('.js-next').toggleClass('js-hidden');
    $('.js-validate-question').toggleClass('js-hidden');
}

function provideFeedback(userAnswer){
    //App will provide feedback if user didn't choose an answer
    //if the answer was right or if the answer was wrong by providing the rigth answer
    
    $('.js-feedback').hasClass('js-hidden') ?
    $('.js-feedback').toggleClass('js-hidden') :
    '' ;

    $('.js-feedback').text('');
    
    const typesOffeedback = [
        {type: null, msg: 'Don\’t furrrget to select an option.' },
        {type: true, msg: 'Grrrrrreat job! That\'s the right answer.'},
        {type: false, msg: 'You\'ve cat to be kitten me! The right answer is:'}
    ];

    const currentFeedback = typesOffeedback.find(feedback => feedback.type == userAnswer);

    $('.js-feedback').text(currentFeedback.msg);

    if(currentFeedback.type === null){
        $('.js-feedback').attr('class', 'js-feedback js-empty-answer');
    }
    else if(currentFeedback.type){
        $('.js-feedback').attr('class', 'js-feedback js-right-answer');
        
    }else{

        //App will present right answer to user if wrong answer was choosen
        const quizStats = QUIZ[QUIZ.length-1];
        const count = quizStats.quizCount;

        const loadedQuestion = QUIZ[count];
        const questionOptions = loadedQuestion.options;
        const rightAnswer = loadedQuestion.answer;
        let rightFeedback;
        $.each(questionOptions, function(key,value){
            (rightAnswer != key ) ? 
            '' : 
            rightFeedback = value;
        });

        $('.js-feedback').attr('class', 'js-feedback js-wrong-answer').
        html(`${currentFeedback.msg} <br><strong>${rightAnswer}. ${rightFeedback}</strong>`);
    }
}

function validateQuestion(){
    //App will validate if the answer is right or wrong. Or if there's no selected option


    $('.quiz-form').on('click','.js-validate-question',function(event){
        event.preventDefault();

        const quizStats = QUIZ[QUIZ.length-1];
        const count = quizStats.quizCount;

        const loadedQuestion = QUIZ[count];
        const rightAnswer = loadedQuestion.answer;

        if($('input[name="option"]:checked').length == 0){
            provideFeedback(null);
           
        }
        else if($('input[name="option"]:checked').attr('id') == rightAnswer){
            provideFeedback(true);
            updateScore(true);
            updateInterface();
        } 
        else{
            provideFeedback(false);
            updateScore(false);
            updateInterface();
        }
    });

}

function displayNextQuestion(){
    //App will load next questions after user clicks on 'Next >' button
    //If is the last questions, then it will prompt fo finish quiz
    
    $('.quiz-form').on('click', '.js-next', function(){

        const quizStats = QUIZ[QUIZ.length-1];
        const count = quizStats.quizCount;

        if(count < QUIZ.length-2){
            $(this).addClass('js-hidden');
            $('.js-feedback').addClass('js-hidden');
            const currentCount= QUIZ[QUIZ.length-1].quizCount += 1;
            loadQuestion(currentCount);
            updateQuestionCount(1);
        }else{
            $(this).addClass('js-hidden');
            $('.js-feedback').addClass('js-hidden');
            $('.js-current-question').empty();
            finishQuiz(true);
        }
    });
    
}

function finishQuiz(quizStatus){
    //App will display final score and give the option to restart quiz 
    
    if(quizStatus){

        const quizStats = QUIZ[QUIZ.length-1];
        const score = quizStats.quizScore;

        const trueFan = [
            'Ahgrrrr not quite a true Joe Exotic fanatic. Try again!',
            'Paw-some! You are a true Joe Exotic fanatic!'
        ]

        $('.js-current-question').append(
            `
            <h2 class='js-quiz-question'>Score: ${score}/${QUIZ.length-1}</h2>
           `
        );
    
        if(score >= Math.round(QUIZ.length*0.75)){
            $('.js-current-question').append(`<p>${trueFan[1]}</p>`);
            $('.js-current-question > p').attr('class', 'js-feedback js-right-answer');
        }else{
            $('.js-current-question').append(`<p>${trueFan[0]}</p>`);
            $('.js-current-question > p').attr('class', 'js-feedback js-wrong-answer');
        }
        

        $('.js-current-question').append(
            `
            <p>Are you ready to play again?</p>
            <input class="js-restart" type="button" value="Play Again">
           `
        );
        
    }

}

function resetStage(){
    //Resets all styling to restart quiz
    $('.js-current-question').empty();
    $('.js-question-count').addClass('js-hidden');
    $('.js-score').addClass('js-hidden');
    $('.js-restart-top').addClass('js-hidden');
    $('.js-next').addClass('js-hidden');
    $('.js-start-quiz').removeClass('js-hidden');
    $('.js-quiz-greeting ').removeClass('js-hidden');
    $('.js-feedback').attr('class','js-feedback').text('');
}

function restartQuiz(){
    //App will restart if user clicks on 'Restart trivia' button at anytime
    //or user clicks on take the test again after quiz is compleated

    $('.js-restart-top').on('click',function(){
        resetStage();
        startQuiz();
    });

    $('.js-quiz-form').on('click','.js-restart', function(){
        resetStage();
        startQuiz();
    });
}

function handleQuizApp(){
    startQuiz();
    validateQuestion();
    displayNextQuestion();
    finishQuiz();
    restartQuiz();
    resetStage();  
}

$(handleQuizApp);