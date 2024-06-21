// src/types.ts
export interface BaseItem {
    id: number;
    name: string;
  }
  
  export interface Module extends BaseItem {
    relatedApp?: string;
  }
  
  export interface Application extends BaseItem {
  
    description: string;
  }
  
  export interface Company extends BaseItem {
    superUser: string;
  }