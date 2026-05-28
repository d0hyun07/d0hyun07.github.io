import type { Project } from '@/types'

/**
 * 프로젝트 목록.
 *
 * 출처 매핑 (.cursor/rules/11-reference-documents.mdc 기준):
 *   id 1 BandSync       → PDF 자료/BandSync/ (BandSync_포트폴리오.pdf, 서비스 소개.md)
 *   id 2 Vazil MCP      → PDF 자료/MCP/서비스 소개.md
 *   id 3 Deep-Robotics  → PDF 자료/Research/Physical AI/Deep-Robotics 4족 보행 로봇/
 *                         (Deep-robotics 4족 보행 로봇.pdf + 강화학습 보고서 v1~v4)
 *   id 4 창원 컨벤션센터  → PDF 자료/창원 컨벤션센터 용접 전시회/창원컨벤션센터_로봇통신아키텍처.pdf
 *   id 5 PECO           → PDF 자료/기존 노션 포트폴리오/PECO.pdf
 *   id 6 BIAS           → PDF 자료/기존 노션 포트폴리오/BIAS.pdf
 *
 * 노출 정책:
 *   - 창원 컨벤션센터: OPC UA 노드 ID 전체 경로(Twin.Real.{uuid}.{joint}.rotation)는 카드 description 에 노출 금지.
 *   - isPublic: false 항목은 ProjectsSection 에서 필터링.
 *   - featured: true — BandSync, Vazil MCP, Deep-Robotics 3개 (포트폴리오 상단 노출).
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'BandSync',
    description:
      '직장인·아마추어 밴드를 위한 올인원 운영 모바일 앱. 공지·일정 투표·셋리스트·악보 저장소·멤버 관리를 한 앱에서 처리하며, 밴드 단위 PostgreSQL RLS + 초대코드 RPC + EAS TestFlight 배포 파이프라인까지 단독 구축한 사이드 프로젝트.',
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
    id: 2,
    title: 'Vazil MCP',
    description:
      'Vue 3 + Vite + n8n 기반 사내 업무 자동화 대시보드. 휴머노이드 데일리 브리핑, AI 트렌드 키워드·블로그/유튜브 스크립트 생성·공유, 회의록 멀티 업로드, 스토리보드 이미지, 조달청 입찰 조회, 하이패스 PDF 영수증 등 6개 모듈을 단일 SPA로 통합. n8n 비정형 응답·바이너리 PDF 파싱과 nginx·Docker 배포까지 담당.',
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
    id: 3,
    title: 'Deep-Robotics 4족 보행 로봇',
    description:
      'NVIDIA Isaac Sim·Isaac Lab 환경에서 Deep-Robotics 4족 보행 로봇의 강화학습 정책을 설계. v1→v4 모델을 반복 실험하며 보상 구조(goal_reached / nav_progress / stability)와 안정성·목표 도달 사이의 트레이드오프를 정성적으로 분석하고 Navigation 정책의 상한선을 검증.',
    tags: [
      'Isaac Sim',
      'Isaac Lab',
      'ROS2',
      'Python',
      'PyTorch',
      'Reinforcement Learning',
      'Physical AI',
    ],
    category: 'robotics',
    githubUrl: '',
    isPublic: true,
    featured: true,
  },
  {
    id: 4,
    title: '창원 컨벤션센터 용접 전시회 — 로봇 통신 아키텍처',
    description:
      '페어리노 로봇 3대(FR5 #1, FR3, FR5 #2)를 사설망으로 묶고, 각 로봇의 6축 관절 회전값을 OPC UA 서버 노드로 매핑해 Vridge Twin 디지털 트윈에서 실시간 시각화한 산업용 통신 아키텍처를 단독 설계·구축. 전시회 현장에서 실시간 데이터 동기화 검증 완료.',
    tags: [
      'OPC UA',
      'TCP/IP',
      'Python',
      'Vridge Twin',
      'Digital Twin',
      '페어리노 로봇',
    ],
    category: 'robotics',
    githubUrl: '',
    isPublic: true,
  },
  {
    id: 5,
    title: 'PECO (R2Bot)',
    description:
      '부산소프트웨어마이스터고 교내 안내·짐 운반용 자율주행 서비스 로봇 (5인 팀 프로젝트). 웹 인터페이스 기반 수동/자동 제어, LiDAR 데이터 수신, ROS2 Humble + Gazebo 시뮬레이션 환경 구축. 전체 3D 모델링과 하드웨어 조립·제작을 단독 담당하며 라이다 마운트 재설계 등 조립 최적화를 주도.',
    tags: [
      'Jetson Nano',
      'Raspberry Pi',
      'STM32',
      'ROS2 Humble',
      'Gazebo',
      'FastAPI',
      'MQTT',
      'Fusion 360',
      'LLAMA 3.1',
    ],
    category: 'robotics',
    githubUrl: '',
    isPublic: true,
  },
  {
    id: 6,
    title: 'BIAS — 기타 자동 AI 반주 시스템',
    description:
      '기타 연주 리프를 MFCC + CNN 딥러닝 모델로 분석해 장르를 도출하고, 그에 맞는 드럼·피아노 반주를 자동으로 재생하는 단독 개발 임베디드 AI 시스템. 데이터 부족을 데이터 증강으로 약 12,000개까지 확보하고, 제로 레이턴시 오디오 인터페이스 + 이중 경로 설계로 실시간 출력과 AI 분석을 동시에 안정화.',
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
]
