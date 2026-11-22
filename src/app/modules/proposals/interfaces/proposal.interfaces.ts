export interface IProposal {
  name: string
  plans: IProposalPlan[]
}

export interface IProposalPlan {
  id: string;
  name: string;
  price: string;
  delivery: string;
  photoCount: number;
  stars: number;
  features: readonly string[];
  featured?: boolean;
}