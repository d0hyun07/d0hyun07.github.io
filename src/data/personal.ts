import type { Personal } from '@/types'

/**
 * 개인 정보.
 * 출처: PDF 자료/기존 노션 포트폴리오/Kang DoHyun ...pdf
 *       PDF 자료/주간일지/ (현재 직무 — 바질컴퍼니 C/S팀)
 */
export const personal: Personal = {
  name: '강도현',
  role: [
    '풀스택 개발자',
    '로봇 소프트웨어 개발자',
    '임베디드 엔지니어',
    'AI / ML 엔지니어',
  ],
  bio: 'Vue 3·n8n으로 사내 업무를 자동화하고, Isaac Sim·ROS2로 로봇을 학습시키는 풀스택 / 로봇 소프트웨어 개발자입니다.',
  description: [
    '부산소프트웨어마이스터고 재학 시절 자율주행 안내 로봇(PECO)과 기타 자동 AI 반주 시스템(BIAS) 등 임베디드·AI 프로젝트를 거치며 하드웨어와 소프트웨어를 모두 다루는 풀스택 개발자로 성장해 왔습니다.',
    '현재는 바질컴퍼니 C/S팀 연구원으로 Vue 3 + n8n 기반 사내 자동화 플랫폼 「Vazil MCP」 6개 모듈을 단독 설계·구현하고, NVIDIA Isaac Sim·Isaac Lab을 활용한 4족 보행 로봇(Deep-Robotics) 강화학습, 창원 컨벤션센터 전시용 OPC UA 기반 산업 통신 아키텍처까지 폭넓게 담당하고 있습니다.',
    '사이드 프로젝트 BandSync(React Native + Supabase 밴드 운영 앱)를 통해 모바일·BaaS 운영 경험도 쌓고 있으며, 시스템 운영·자동화에서 얻은 감각을 토대로 인프라·보안(Active Directory 등) 영역으로 도메인을 확장하는 것을 다음 목표로 두고 있습니다.',
  ],
  interests: [
    '풀스택 웹',
    '로봇 제어 / ROS2',
    '임베디드 시스템',
    '강화학습 / 휴머노이드',
    'Active Directory',
  ],
  email: 'strongdh07@gmail.com',
  github: 'https://github.com/d0hyun07',
  // linkedin: 미보유 — 추가 시 주석 해제
  // linkedin: 'https://www.linkedin.com/in/...',
}
