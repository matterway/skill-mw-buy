export interface ItemAndBudget {
  item: string;
  minBudget?: number;
  maxBudget?: number;
}

export interface Results {
  amazon: boolean;
  ebay: boolean;
  alibaba: boolean;
  temu: boolean;
}
