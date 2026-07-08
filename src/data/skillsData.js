export const skillCategories = {
  프로그래밍: { color: 'var(--color-accent-blue)' },
  디자인: { color: 'var(--color-accent-pink)' },
  형상관리: { color: 'var(--color-accent-olive)' },
};

export const skillsData = [
  {
    id: 1,
    icon: 'Html',
    name: 'HTML',
    level: 80,
    category: '프로그래밍',
    description: '시맨틱 마크업으로 웹 구조를 설계해요.',
  },
  {
    id: 2,
    icon: 'Css',
    name: 'CSS',
    level: 75,
    category: '프로그래밍',
    description: '반응형 레이아웃과 애니메이션을 구현해요.',
  },
  {
    id: 3,
    icon: 'Javascript',
    name: 'JavaScript',
    level: 70,
    category: '프로그래밍',
    description: 'DOM 제어부터 비동기 처리까지 다뤄요.',
  },
  {
    id: 4,
    icon: 'Hub',
    name: 'React',
    level: 60,
    category: '프로그래밍',
    description: '컴포넌트 기반으로 UI를 구성해요.',
  },
  {
    id: 5,
    icon: 'DesignServices',
    name: 'Figma',
    level: 65,
    category: '디자인',
    description: 'UI/UX 디자인과 프로토타이핑을 해요.',
  },
  {
    id: 6,
    icon: 'PhotoCamera',
    name: 'Photoshop',
    level: 70,
    category: '디자인',
    description: '이미지 편집과 리터칭 작업을 해요.',
  },
  {
    id: 7,
    icon: 'Brush',
    name: 'Illustrator',
    level: 90,
    category: '디자인',
    description: '벡터 일러스트와 로고를 제작해요.',
  },
  {
    id: 8,
    icon: 'AccountTree',
    name: 'Git',
    level: 78,
    category: '형상관리',
    description: '버전 관리와 협업 워크플로우를 관리해요.',
  },
];

export function sortByLevelDesc(skills) {
  return [...skills].sort((a, b) => b.level - a.level);
}

export function getTopSkills(skills, n) {
  return sortByLevelDesc(skills).slice(0, n);
}

export function groupByCategory(skills) {
  return Object.keys(skillCategories)
    .map((category) => ({
      category,
      skills: sortByLevelDesc(skills.filter((skill) => skill.category === category)),
    }))
    .filter((group) => group.skills.length > 0);
}
