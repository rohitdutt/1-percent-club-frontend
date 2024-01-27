export enum TASK_STATUS {
    PENDING = 'Pending',
    COMPLETED = 'Completed',
    IN_PROGRESS = 'In Progress'
}

export enum PRIORITY {
    BLOCKER = 1,
    CRITICAL = 2,
    MAJOR = 3,
    LOWER = 4
}

export const CREATE_TASK: string = 'Create new task';

export const ITEM_HEIGHT = 48;

export const COLORS = ['#F8E473', '#00CC99', 'red', '#FFFF33', '#33FFFF'];