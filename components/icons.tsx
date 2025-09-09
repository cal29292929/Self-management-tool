
import React from 'react';

const createIcon = (path: React.ReactNode): React.FC<{ className?: string }> => ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        {path}
    </svg>
);

export const HomeIcon = createIcon(
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
);

export const PencilSquareIcon = createIcon(
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
);

export const BookOpenIcon = createIcon(
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM11 14a1 1 0 11-2 0 1 1 0 012 0zM11 10a1 1 0 11-2 0 1 1 0 012 0z" /><path fillRule="evenodd" d="M3.5 2A1.5 1.5 0 002 3.5v13A1.5 1.5 0 003.5 18h13a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-13zm1.25 1.5a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zm0 3a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
);

export const ChartBarIcon = createIcon(
    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
);

export const RocketLaunchIcon = createIcon(
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.75 7.065A5.003 5.003 0 004 9.5a5 5 0 005 5v-2a3 3 0 01-3-3V7.065zM10 4a5 5 0 00-2.935 9.242 5.003 5.003 0 007.87-7.87A5 5 0 0010 4z" clipRule="evenodd" />
);

export const TrashIcon = createIcon(
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
);

export const SparklesIcon = createIcon(
    <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.207 5.207a.75.75 0 011.06 0l1.061 1.061a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm3.207 3.732a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.06-1.06l1.06-1.061a.75.75 0 011.06 0zm3.553.518a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12.66 12.66a.75.75 0 011.06 0l1.061 1.061a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM17.25 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm-3.528-5.207a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06z" clipRule="evenodd" />
);

export const PlusIcon = createIcon(
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
);

export const XCircleIcon = createIcon(
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
);

export const CheckCircleIcon = createIcon(
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
);

export const ArrowPathIcon = createIcon(
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.332a.75.75 0 01-1.5 0V3.5A6.5 6.5 0 1016.5 10a1 1 0 112 0 8.5 8.5 0 11-17 0 1 1 0 112 0 6.5 6.5 0 006.5-6.5V3a1 1 0 011-1z" clipRule="evenodd" />
);

export const Cog6ToothIcon = createIcon(
    <path fillRule="evenodd" d="M11.07 2.247a1 1 0 00-2.14 0l-.363 1.25a1 1 0 01-1.32.74l-1.22-.448a1 1 0 00-1.172.63L3.5 6.495a1 1 0 00.514 1.22l1.09.627a1 1 0 010 1.316l-1.09.627a1 1 0 00-.514 1.22l1.354 1.626a1 1 0 001.172.63l1.22-.448a1 1 0 011.32.74l.363 1.25a1 1 0 002.14 0l.363-1.25a1 1 0 011.32-.74l1.22.448a1 1 0 001.172-.63l1.354-1.626a1 1 0 00-.514-1.22l-1.09-.627a1 1 0 010-1.316l1.09-.627a1 1 0 00.514-1.22L16.5 4.869a1 1 0 00-1.172-.63l-1.22.448a1 1 0 01-1.32-.74l-.363-1.25zM10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
);
