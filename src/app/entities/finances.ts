export class FinanceObjectif {
    id?: string;
    name?: string;
    value?: number;
    isPrincipal?: boolean;
    isCompleted?: boolean;
    creationDate?: string;
}

export class FinanceRevenus {
    id?: string;
    userId?: string;
    userName?: string;
    value?: number;
    updateDate?: string;
    creationDate?: string;
}

export class FinanceContributor {
    id?: string;
    name?: string;
    value?: number;
    objectifId?: string;
    creationDate?: string;
}