/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import db from '../../../db.json';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';
import GitHubCorner from '../../components/GitHubCorner';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const questionId = `question__${questionIndex}`;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget
      style={{ marginTop: -30 }}
      as={motion.section}
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />

        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <Widget.Image
        as={motion.img}
        transition={{ delay: 0, duration: 2 }}
        variants={{
          show: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        initial="hidden"
        animate="show"
        src={question.image}
        id="question_image"
      />

      <Widget.Content>
        <p>
          {question.title}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            document.getElementById('question_image').style.filter = 'brightness()';
            setTimeout(() => {
              onSubmit();
              addResult(isCorrect);
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget
      style={{ marginTop: -30 }}
      as={motion.section}
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <img src={db.loading} alt="Carregando..." />
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget
      style={{ marginTop: -30 }}
      as={motion.section}
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;

            if (isAcerto) {
              return somatoriaAtual + 1;
            }

            return somatoriaAtual;
          }, 0)}
          {' '}
          perguntas
        </p>

        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

const secreenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [secreenState, setSecreenState] = React.useState(secreenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  React.useEffect(() => {
    setTimeout(() => {
      setSecreenState(secreenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setSecreenState(secreenStates.RESULT);
    }
  }

  function addResult(result) {
    setResults([...results, result]);
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <Head>
        <title>Perguntas | Soccer Club</title>
      </Head>

      <QuizContainer>
        <QuizLogo />

        {secreenState === secreenStates.QUIZ && (
          <QuestionWidget
            questionIndex={questionIndex}
            question={question}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {secreenState === secreenStates.LOADING && <LoadingWidget />}

        {secreenState === secreenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/rcttavares" />
    </QuizBackground>
  );
}
