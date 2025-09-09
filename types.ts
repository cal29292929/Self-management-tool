
export enum View {
    Home = 'home',
    Journal = 'journal',
    Dashboard = 'dashboard',
    Analytics = 'analytics',
    Pga = 'pga'
}

export interface CustomField {
    id: number;
    name: string;
    value: string;
}

export interface CbtEntry {
    id: string;
    timestamp: string;
    situation: string;
    mood: string;
    rating: number;
    negativeThought: string;
    evidenceFor?: string;
    evidenceAgainst?: string;
    balancedThought?: string;
    customFields?: CustomField[];
    [key: string]: any; // To allow for dynamic custom fields
}

export interface ProgressEntry {
    id: string;
    timestamp: string;
    text: string;
}

export interface PgaGoal {
    id: string;
    title: string;
    description: string;
    targetDate: string;
    status: '進行中' | '達成';
    createdAt: string;
    progress: ProgressEntry[];
}

export type NewPgaGoal = Omit<PgaGoal, 'id' | 'status' | 'createdAt' | 'progress'>;
