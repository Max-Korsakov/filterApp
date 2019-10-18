
export interface FilterElement {
    id: number;
    parent: number | null;
    enable: boolean;
    children: FilterElement[]
    choosen: boolean;
    haveChildren: boolean;
    childrenChoosen: boolean;
    isExpanded: boolean;
    connected:number;
    title: string;
}

export enum Trees {
    Departments = 'Departments',
    Employees = 'Employees'
}


