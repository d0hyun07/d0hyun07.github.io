import type { Project } from '@/types'

/**
 * 프로젝트 목록.
 *
 * 노출 순서 정책 (AI/RAG 관련성 순):
 *   Vazil MCP → 로컬 RAG 챗봇 → BandSync → 조선업 PLM(Teamcenter) → BIAS → PECO
 *   ProjectsSection 은 featured 우선 → id 오름차순으로 정렬하므로,
 *   id 를 노출 순서대로 1~6 으로 부여하고 상위 3개에 featured 를 지정해 순서를 고정.
 *   상세(모달) 콘텐츠는 src/data/projectDetails.ts 에 동일 id 로 매핑.
 *
 * 노출 정책:
 *   - isPublic: false 항목은 ProjectsSection 에서 필터링.
 *   - id 4 조선업 PLM: 2026-08 착수 예정 프로젝트. 진행 후 구체 업무/성과로 갱신.
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'Vazil MCP',
    description:
      'Vue 3 + Vite + n8n 기반 사내 업무 자동화 대시보드. 휴머노이드 데일리 브리핑, AI 트렌드 키워드·블로그/유튜브 스크립트 생성·공유, 회의록 멀티 업로드, 스토리보드 이미지, 입찰 공고 조회, PDF 영수증 자동화 등 6개 모듈을 단일 SPA로 통합. n8n 비정형 응답·바이너리 PDF 파싱과 nginx·Docker 배포까지 담당.',
    tags: [
      'Vue 3',
      'Vite 7',
      'TypeScript',
      'n8n',
      'Express 5',
      'Docker',
      'nginx',
      'html2pdf.js',
    ],
    category: 'web',
    githubUrl: '',
    isPublic: true,
    featured: true,
  },
  {
    id: 2,
    title: '로컬 RAG 챗봇',
    description:
      'ChromaDB · Ollama · Flask로 완전 로컬 환경에서 동작하는 RAG(검색 증강 생성) 개인 챗봇. 외부 클라우드 API 없이 로컬 GPU에서 텍스트 임베딩 → 벡터 DB 저장 → 유사도 검색 → 로컬 LLM 응답 생성까지 엔드투엔드 파이프라인을 단독 설계·구현. 민감 데이터를 외부로 전송하지 않는 데이터 프라이버시 중심 RAG 구조를 직접 다룬 프로젝트.',
    tags: [
      'Python',
      'Flask',
      'ChromaDB',
      'Ollama',
      'RAG',
      'Vector DB',
      'LLM',
      'Windows 11',
    ],
    category: 'web',
    githubUrl: '',
    isPublic: true,
    featured: true,
  },
  {
    id: 3,
    title: 'BandSync',
    description:
      '직장인·아마추어 밴드를 위한 올인원 운영 모바일 앱. 공지·일정 투표·셋리스트·악보 저장소·멤버 관리를 한 앱에서 처리하며, 밴드 단위 PostgreSQL RLS + 초대코드 온보딩 + EAS TestFlight 배포 파이프라인까지 단독 구축한 사이드 프로젝트.',
    tags: [
      'React Native',
      'Expo SDK 54',
      'TypeScript',
      'Supabase',
      'PostgreSQL RLS',
      'Zustand',
      'EAS Build',
      'iOS',
    ],
    category: 'web',
    // TODO: 깃허브 공개 시 URL 추가
    githubUrl: '',
    isPublic: true,
    featured: true,
  },
  {
    id: 4,
    title: '조선업 PLM 구축 (Teamcenter)',
    description:
      '2026년 8월 착수 예정. Siemens·HD현대중공업과 함께 조선업 전 공정을 하나의 프로그램에서 관리하는 Teamcenter 기반 PLM 플랫폼을 구축하는 대규모 엔터프라이즈 프로젝트. 설계·생산·자재 등 조선 프로세스를 단일 시스템으로 통합하며, ITK · SOA · BMIDE · Active Workspace 기반 서버–클라이언트 전 계층 커스터마이징을 담당할 예정.',
    tags: [
      'Teamcenter',
      'ITK',
      'SOA',
      'BMIDE',
      'Active Workspace',
      'PLM',
    ],
    category: 'web',
    githubUrl: '',
    isPublic: true,
  },
  {
    id: 5,
    title: 'BIAS — 기타 자동 AI 반주 시스템',
    description:
      '기타 연주 리프를 MFCC + CNN 딥러닝 모델로 분석해 장르를 도출하고, 그에 맞는 드럼·피아노 반주를 자동 재생하는 단독 개발 임베디드 AI 시스템. 데이터 증강으로 학습 데이터를 약 12,000개까지 확보하고, 제로 레이턴시 오디오 인터페이스 + 이중 경로 설계로 실시간 출력과 AI 분석을 동시에 안정화.',
    tags: [
      'Raspberry Pi',
      'STM32',
      'Arduino',
      'UART',
      'CNN',
      'MFCC',
      'Python',
      'PyTorch',
    ],
    category: 'embedded',
    githubUrl: '',
    isPublic: true,
  },
  {
    id: 6,
    title: 'PECO (R2Bot)',
    description:
      '자율주행 기반 교내 안내·짐 운반 서비스 로봇 (5인 팀 프로젝트). 웹 인터페이스 기반 수동/자동 제어와 LiDAR 데이터 수신, ROS2 Humble + Gazebo 시뮬레이션 환경을 구축. 전체 3D 모델링과 하드웨어 조립·제작을 단독 담당하며 라이다 마운트 재설계 등 조립 최적화를 주도.',
    tags: [
      'Jetson Nano',
      'Raspberry Pi',
      'STM32',
      'ROS2 Humble',
      'Gazebo',
      'FastAPI',
      'MQTT',
      'Fusion 360',
      'LLaMA 3.1',
    ],
    category: 'robotics',
    githubUrl: '',
    isPublic: true,
  },
]