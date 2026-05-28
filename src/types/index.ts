/**
 * 포트폴리오 전역 타입 정의.
 * 모든 공용 타입은 여기에서만 정의하고 export.
 */

export interface Personal {
  name: string
  role: string[]
  bio: string
  description: string[]
  interests: string[]
  email: string
  github: string
  linkedin?: string
  profileImage?: string
}

export type ProjectCategory = 'web' | 'security' | 'embedded' | 'robotics'

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  githubUrl?: string
  demoUrl?: string
  isPublic: boolean
  featured?: boolean
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'security'
  | 'embedded'
  | 'devops'

export interface Skill {
  name: string
  category: SkillCategory
  icon?: string
  level?: number
}

export type ExperienceType = 'work' | 'education'

export interface Experience {
  id: number
  type: ExperienceType
  period: string
  organization: string
  role: string
  description: string[]
  tags?: string[]
}

export type ContactStatus = 'idle' | 'loading' | 'success' | 'error'
