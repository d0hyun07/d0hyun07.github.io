import type { Experience } from '@/types'

/**
 * 경력.
 * 출처:
 *   - PDF 자료/주간일지/2025/10월 2주차 ~ 2026/2월 2주차 (바질컴퍼니 C/S팀 업무 기록)
 *   - PDF 자료/바질 홈페이지 관리/픽스 내용.pdf (회사 홈페이지 유지보수 이력)
 *   - PDF 자료/MCP/서비스 소개.md (Vazil MCP 사내 자동화 플랫폼)
 *   - PDF 자료/Research/Physical AI/Deep-Robotics 4족 보행 로봇/ (강화학습 보고서 v1~v4)
 *   - PDF 자료/창원 컨벤션센터 용접 전시회/창원컨벤션센터_로봇통신아키텍처.pdf
 */
export const workExperience: Experience[] = [
  {
    id: 1,
    type: 'work',
    period: '2025.9 - 현재',
    organization: '바질컴퍼니 (Vazil Company)',
    role: 'C/S팀 연구원',
    description: [
      'Vue 3 + Vite + n8n 기반 사내 업무 자동화 플랫폼 「Vazil MCP」 6개 모듈 단독 설계·구현 (휴머노이드 브리핑·트렌드 키워드 스크립트·회의록 업로드·스토리보드 이미지·조달청·하이패스 PDF)',
      '바질컴퍼니 공식 홈페이지 유지·보수 및 리뉴얼 — 회사 소개·제품·기술·소식·어드민 페이지 개선, 팝업 관리·문의 로그·첨부파일 다운로드 기능 추가, GTM 연동을 위한 프론트엔드 구조 전면 리뉴얼',
      'Deep-Robotics 4족 보행 로봇 강화학습 — NVIDIA Isaac Sim·Isaac Lab 환경에서 v1~v4 모델 반복 실험 및 보고서 작성, Navigation 정책 상한선 검증',
      '창원 컨벤션센터 용접 전시회 출품 — 페어리노 로봇 3대(FR5×2, FR3) OPC UA 기반 통신 아키텍처 단독 설계·구축 및 디지털 트윈 연동',
      'TAG(Table-Augmented Generation) 시스템, lotus 라이브러리 등 신규 기술 조사 및 MCP 활용 방안 검토',
    ],
    tags: [
      'Vue 3',
      'n8n',
      'Express',
      'Docker',
      'Isaac Sim',
      'Isaac Lab',
      'ROS2',
      'OPC UA',
      'Python',
    ],
  },
]

/**
 * 학력.
 * 출처: PDF 자료/기존 노션 포트폴리오/Kang DoHyun ...pdf, Awards ...csv
 * TODO: 입학 연도 정확히 확인 (현재 마이스터고 표준 3년제로 가정 — 2022.03 ~ 2025.02).
 */
export const education: Experience[] = [
  {
    id: 1,
    type: 'education',
    period: '2025',
    organization: '지멘스(Siemens) 공식 파트너',
    role: 'Solution Developer 과정 이수',
    description: [
      'Teamcenter 기반 PLM 솔루션 개발 과정 이수',
      'SOA Client·ITK(Integration Toolkit)를 활용한 Teamcenter 커스터마이징·연동 개발 학습',
    ],
    tags: ['Teamcenter', 'SOA Client', 'ITK'],
  },
  {
    id: 2,
    type: 'education',
    period: '2023.03 - 2026.01',
    organization: '부산소프트웨어마이스터고등학교',
    role: '소프트웨어개발과',
    description: [
      'PECO (R2Bot) — 5인 팀 자율주행 학교 안내 로봇 프로젝트. 전체 3D 모델링·하드웨어 조립 담당 (2024.04 ~ 2024.12)',
      'BIAS — 단독 개발 기타 자동 AI 반주 임베디드 시스템. CNN+MFCC, Raspberry Pi×Arduino UART 통신 (2025.03 ~ 2025.07)',
      '2023.07 최우수상 — 실시간 교통정보에 맞춰 기상시간을 알려주는 앱',
      '2024.07 장려상 — AI를 활용한 자동 소스 공급기',
      '2024.12 장려상 — 소울가든',
      '자격증: 정보처리산업기사 (2024.07), 3D프린터운용기능사 (2025.07)',
    ],
    tags: ['Python', 'C', 'Arduino', 'STM32', 'PyTorch', 'OpenCV', 'ROS2', 'Fusion 360'],
  },
]

/**
 * ExperienceSection.vue 에서 단일 객체로 사용하기 편하도록 묶음 export 제공.
 */
export const experience = {
  work: workExperience,
  education,
}
