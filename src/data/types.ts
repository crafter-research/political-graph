export interface CaseNode {
  id: string;
  label: string;
  desc?: string;
  year?: string;
  monto?: string;
}

export interface PoliticianNode {
  id: string;
  label: string;
  role?: string;
  size?: number;
  party?: string;
  tags?: string[];
}

export interface Link {
  source: string;
  target: string;
  type: string;
  detail?: string;
}
