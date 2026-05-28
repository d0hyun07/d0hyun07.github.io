import type { Skill } from '@/types'

/**
 * 스킬 목록.
 *
 * 1차 자가평가 기준:
 *   - 80~90 : 실무·프로젝트에서 단독 설계·구현이 가능한 수준
 *   - 65~79 : 실무 사용 경험 있고 문서 보면서 빠르게 작업 가능
 *   - 50~64 : 학습/일부 프로젝트 적용, 추가 학습 필요
 *
 * 출처:
 *   - PDF 자료/기존 노션 포트폴리오/SKILL ....csv (3단계 자가평가)
 *   - PDF 자료/기존 노션 포트폴리오/Kang DoHyun ...pdf (자격증 / 학습 이력)
 *   - PDF 자료/BandSync, MCP, 창원..., Deep-Robotics, PECO, BIAS 프로젝트 실사용 스택
 *
 * NOTE:
 *   - 룰 파일은 'security' 카테고리(Active Directory / Windows Server / PowerShell 등)를 요구하지만
 *     실제 PDF 자료에 보안 실무 경험이 없어, 현재는 'security' 카테고리에 항목을 두지 않음.
 *     SkillsSection 의 「Security·AD」 탭은 비어있게 되거나, 필요 시 추후 추가.
 */
export const skills: Skill[] = [
  // ──────────── Frontend ────────────
  { name: 'Vue.js (Vue 3)', category: 'frontend', level: 85 },
  { name: 'TypeScript', category: 'frontend', level: 75 },
  { name: 'JavaScript', category: 'frontend', level: 80 },
  { name: 'React Native (Expo)', category: 'frontend', level: 70 },
  { name: 'React', category: 'frontend', level: 65 },
  { name: 'Tailwind CSS', category: 'frontend', level: 75 },
  { name: 'Vite', category: 'frontend', level: 80 },

  // ──────────── Backend / AI ────────────
  { name: 'Python', category: 'backend', level: 85 },
  { name: 'Node.js', category: 'backend', level: 70 },
  { name: 'Express', category: 'backend', level: 70 },
  { name: 'FastAPI', category: 'backend', level: 65 },
  { name: 'n8n', category: 'backend', level: 85 },
  { name: 'Supabase (PostgreSQL · Auth · Storage · Realtime)', category: 'backend', level: 75 },
  { name: 'MQTT', category: 'backend', level: 60 },
  { name: 'PyTorch', category: 'backend', level: 75 },
  { name: 'TensorFlow', category: 'backend', level: 65 },
  { name: 'OpenCV', category: 'backend', level: 70 },
  { name: 'Teamcenter', category: 'backend', level: 65 },
  { name: 'SOA Client', category: 'backend', level: 65 },
  { name: 'ITK (Integration Toolkit)', category: 'backend', level: 65 },

  // ──────────── Embedded / Robotics ────────────
  { name: 'C / C++', category: 'embedded', level: 70 },
  { name: 'STM32', category: 'embedded', level: 65 },
  { name: 'UART / I2C / ADC', category: 'embedded', level: 70 },
  { name: 'ROS2 (Humble)', category: 'embedded', level: 75 },
  { name: 'Isaac Sim', category: 'embedded', level: 75 },
  { name: 'Isaac Lab', category: 'embedded', level: 75 },
  { name: 'OPC UA', category: 'embedded', level: 70 },
  { name: 'Gazebo', category: 'embedded', level: 60 },

  // ──────────── DevOps / Infra ────────────
  { name: 'Git / GitHub', category: 'devops', level: 90 },
  { name: 'Docker', category: 'devops', level: 85 },
  { name: 'nginx', category: 'devops', level: 60 },
  { name: 'GitHub Actions', category: 'devops', level: 60 },
  { name: 'AWS (S3 · CloudFront · EC2)', category: 'devops', level: 85 },
  { name: 'EAS Build / Submit', category: 'devops', level: 70 },

  // ──────────── Security / Active Directory ────────────
  // TODO: AD 운영·PowerShell 자동화·Windows Server 학습 진행 후 항목 추가.
  // 현재 PDF 자료 상에는 실무 데이터 없음.
]
