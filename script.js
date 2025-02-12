const questions = [
  {
    question: "당신은 하루를 어떻게 시작하나요?",
    choices: ["커피 한 잔으로 시작", "일찍 일어나서 운동", "알람을 끄고 다시 자는 편", "유튜브나 SNS를 확인", "빠르게 준비하고 출발"],
  },
  {
    question: "주말에는 무엇을 주로 하나요?",
    choices: ["집에서 쉬기", "친구 만나기", "야외 활동", "취미 생활", "다른 사람의 일정에 맞춰서 움직이기"],
  },
  {
    question: "당신의 성격은 어떤가요?",
    choices: ["활발하고 외향적", "조용하고 내향적", "상황에 맞게 행동", "감정을 잘 드러내는 편", "차분하고 신중한 편"],
  },
  {
    question: "여행을 갈 때, 무엇을 가장 중요하게 생각하나요?",
    choices: ["편안함", "모험과 탐험", "즐거운 경험", "휴식과 여유", "새로운 사람과의 만남"],
  },
  {
    question: "가장 좋아하는 음식은?",
    choices: ["한식", "양식", "일식", "패스트푸드", "채식"],
  },
  {
    question: "어떤 환경에서 일할 때 가장 잘 되나요?",
    choices: ["혼자서 집중", "사람들과 팀을 이루어", "조용한 환경에서 혼자", "자유로운 분위기", "조금 시끄러운 환경"],
  },
  {
    question: "시간 관리에 대해서 어떻게 생각하나요?",
    choices: ["계획을 세우고 철저하게", "그때그때 상황에 맞게", "예상대로 일이 풀리면 좋겠다", "잘 되지 않더라도 괜찮다", "항상 여유 있게 관리"],
  },
  {
    question: "친구들이 당신을 어떻게 생각하나요?",
    choices: ["적극적이고 에너지 넘치는 사람", "차분하고 침착한 사람", "혼자 있는 걸 좋아하는 사람", "감정적이고 섬세한 사람", "계획적인 사람"],
  },
  {
    question: "기술과 관련된 활동에 얼마나 관심이 있나요?",
    choices: ["매우 관심 있음", "흥미가 있음", "그저 그렇다", "별로 관심 없음", "전혀 관심 없음"],
  },
  {
    question: "긴급 상황에서 어떻게 대처하나요?",
    choices: ["즉시 대응", "조용히 계획 세우기", "다른 사람과 상의", "급하게 해결하려고 애씀", "잠시 멈추고 생각한 후 행동"],
  },
];

let currentQuestionIndex = 0;
let userResponses = new Array(questions.length).fill(null);

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;
  
  const choicesContainer = document.getElementById('choices-container');
  choicesContainer.innerHTML = '';
  
  question.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement('div');
    choiceDiv.textContent = choice;
    choiceDiv.addEventListener('click', () => selectAnswer(index));
    choicesContainer.appendChild(choiceDiv);
  });
}

function selectAnswer(choiceIndex) {
  userResponses[currentQuestionIndex] = choiceIndex;
  
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('survey-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
  
  // 각 문항별 응답
  let resultText = questions.map((question, qIndex) => {
    const selectedChoice = userResponses[qIndex];
    return `
      <h3>${question.question}</h3>
      <p>선택한 답: ${question.choices[selectedChoice]}</p>
    `;
  }).join('');

  // 전체 선택지 통계
  const choiceCounts = new Array(questions.length)
    .fill(0)
    .map(() => new Array(5).fill(0)); // 각 문항마다 5개의 선택지, 0으로 초기화

  userResponses.forEach(response => {
    if (response !== null) {
      choiceCounts[response]++;
    }
  });

  // 전체 선택지 통계 결과 출력
  let statsText = questions.map((question, qIndex) => {
    return `
      <h4>${question.question}</h4>
      ${question.choices.map((choice, index) => {
        return `<p>${index + 1}번 선택: ${choiceCounts[qIndex][index]}개</p>`;
      }).join('')}
    `;
  }).join('');

  document.getElementById('results-statistics').innerHTML = resultText + statsText;
}

document.getElementById('next-btn').addEventListener('click', loadQuestion);

// 첫 번째 질문 로드
loadQuestion();
